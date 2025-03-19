//Still in work

import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/header"
import Footer from "../components/Footer"

import { addUser,getUser } from "../features/userSlice"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus,faClose,faEye,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

export default function UserManagement(){
    const dispatch=useDispatch();
    const {users}=useSelector((state=>state.user));
    console.log('State',users);
    console.log('Users',users);

    const [isModalOpen,setIsModalOpen]=useState(false);
    const [isShowModalOpen,setIsShowModalOpen]=useState(false);
    const [isEditModalOpen,setIsEditModalOpen]=useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);
    const [selectedUser,setSelectedUser]=useState({
        username:'',
        email:'',
        password:'',
        role:'',
        image:''||'No image available'
    });
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:'',
        role:'',
        image:''||'No image available'
    })
    const [confPassword,setConfPassword]=useState('');
    const [userdata,setUserData]=useState([]);
    

      useEffect(() => { 
        dispatch(getUser())
            .then((data) => {
                const dataitem=data.payload;
                setUserData(dataitem)
            })
            .catch((error) => {
                console.log('Error fetching data', error);
            });
    }, [dispatch,users]);

    const handleOpenModal=()=>{
        setIsModalOpen(true);
    }

    const handleCloseModal=()=>{
        setIsModalOpen(false);
    }

    const imageUploader=(e)=>{
        const file=e.target.files[0];
        if(file){
            const reader=new FileReader();
            reader.onloadend=()=>{
                setFormData({...formData,image:reader.result});
            }
            reader.readAsDataURL(file);
        }

    }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:[e.target.value]});
        console.log(formData);

    }

    const handleSaveUser = () => {
        console.log("Password:", formData.password);
        console.log("Confirm Password:", confPassword);
    
        // Check if any field is empty or undefined/null
        if (!formData.username || !formData.email || !formData.role || !formData.image || !formData.password) {
            alert('There are missing fields');
            return;
        } else {
            // Check if passwords match
            if (formData.password.trim() === confPassword.trim()) {
                dispatch(addUser(formData));
            } else {
                alert('Password mismatch');
                return;
            }
        }
    }
    


    return(
        <div className="page user">
            <Navbar/>
            <div id='content'>
                <Sidebar/>
                <main>
                    <Header/>
                    <div className="user-management">
                        <div className="table-header">
                            <h1>Users Table</h1>
                            <button onClick={handleOpenModal}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                Add User</button>
                                <div className={isModalOpen?"modal":"hide"}>
                                    <div className="overlay"></div>
                                    <div className="modal-content">
                                        <div className="img-section">
                                                <img src={formData.image}/>
                                                <input type="file" required onClick={imageUploader}></input>
                                        </div>
                                        <div className="user-info">
                                            <h2>Add User</h2>
                                            <fieldset>
                                                <legend>User Details</legend>
                                                <form>
                                                    <div className="field-value">
                                                        <label className="field">Username</label>
                                                        <input type="text" className="value" name="username" onChange={(e)=>handleChange(e)} required></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Email</label>
                                                    <   input type="email" className="value" name="email" onChange={(e)=>handleChange(e)} required></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Role</label>
                                                        <select name="role" onChange={(e)=>handleChange(e)}>
                                                            <option value="HR">HR</option>
                                                            <option value="Employee">Employee</option>
                                                            <option value="IT Assistant">IT Assistant</option>
                                                        </select>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value" onChange={(e)=>handleChange(e)}>
                                                        <label className="field">Password</label>
                                                        <input type="password" className="value" name="password" required></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Confirm Password</label>
                                                        <input type="password" name="confPassword" className="value" onChange={(e)=>setConfPassword(e.target.value)}></input>
                                                    </div>
                                                    
                                                </form>
                                                <div className="btn-grp">
                                                    <button icon={faClose} onClick={handleCloseModal}>Back</button>
                                                    <button onClick={handleSaveUser}>Save</button>
                                                </div>
                                            </fieldset>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                        </div>
                        <div className="table-filter">
                            <input type="search" placeholder="Search for user"></input>
                            <div >Filter</div>
                        </div>
                        <table border={1} >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Profile Picture</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(userdata)?
                                    userdata.map((row)=>(
                                        <tr key={row.id}>
                                            <td></td>
                                            <td>{row.id}</td>
                                            <td>{row.username}</td>
                                            <td>{row.email}</td>
                                            <td>{row.password}</td>
                                            <td>
                                                <img src={row.image} title={row.image}></img>
                                            </td>
                                            <td>{row.role}</td>
                                            <td>Active</td>
                                            <td className="icon-grp">
                                                <FontAwesomeIcon icon={faEye} className="table-icon" onClick={()=>{setIsShowModalOpen(true),setSelectedUser(row)}} ></FontAwesomeIcon>
                                                <div className={isShowModalOpen?"modal":"hide"}>
                                                    <div className="overlay"></div>
                                                    <div className="modal-content">
                                                    <div className="img-section">
                                                        <img src={selectedUser.image}/>
                                                    </div>
                                                    <div className="user-info">
                                                    <h2>Edit Details</h2>
                                            
                                                <legend>User Details</legend>
                                               
                                                    <div className="field-value">
                                                        <label className="field">Username</label>
                                                        <p >{selectedUser.username}</p>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Email</label>
                                                    <   p >{selectedUser.email}</p>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Role</label>
                                                        <p>{selectedUser.role}</p>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value" >
                                                        <label className="field">Password</label>
                                                        <p >{selectedUser.password}</p>
                                                    </div>
                                                    <br/>
                                                    
                                                    
                                                
                                                <div className="btn-grp">
                                                    <button icon={faClose} onClick={()=>setIsShowModalOpen(false)}>Back</button>
                                                    <button onClick={handleSaveUser}>Save</button>
                                                </div>
                                        </div>
                                                    </div>   
                                                </div>

                                                <FontAwesomeIcon icon={faEdit} className="table-icon" onClick={()=>{setIsEditModalOpen(true),setSelectedUser(row)}}></FontAwesomeIcon>
                                                <div className={isEditModalOpen?"modal":"hide"}>
                                    <div className="overlay"></div>
                                    <div className="modal-content">
                                        <div className="img-section">
                                                <img src={selectedUser.image}/>
                                                <input type="file" required onClick={imageUploader}></input>
                                        </div>
                                        <div className="user-info">
                                            <h2>Edit User Details</h2>
                                            <fieldset>
                                                <legend>User Details</legend>
                                                <form>
                                                    <div className="field-value">
                                                        <label className="field">Username</label>
                                                        <input type="text" className="value" name="username"
                                                         onChange={(e)=>handleChange(e)} value={selectedUser.username} required></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Email</label>
                                                    <   input type="email" className="value" name="email" onChange={(e)=>handleChange(e)} value={selectedUser.email} required></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Role</label>
                                                        <select name="role" onChange={(e)=>handleChange(e)} value={selectedUser.role} >
                                                            <option value="HR">HR</option>
                                                            <option value="Employee">Employee</option>
                                                            <option value="IT Assistant">IT Assistant</option>
                                                        </select>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value" >
                                                        <label className="field">Password</label>
                                                        <input type="password" className="value" name="password" onChange={(e)=>handleChange(e)} required value={selectedUser.password} ></input>
                                                    </div>
                                                    <br/>
                                                    <div className="field-value">
                                                        <label className="field">Confirm Password</label>
                                                        <input type="password" name="confPassword" className="value" onChange={(e)=>setConfPassword(e.target.value)} value={selectedUser.password}></input>
                                                    </div>
                                                    
                                                </form>
                                                <div className="btn-grp">
                                                    <button icon={faClose} onClick={()=>setIsEditModalOpen(false)}>Back</button>
                                                    <button onClick={handleSaveUser}>Save</button>
                                                </div>
                                            </fieldset>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                                <FontAwesomeIcon icon={faTrash} className="table-icon" onClick={()=>setIsDeleteModalOpen(true)}></FontAwesomeIcon>
                                                <div className={isDeleteModalOpen?"modal":"hide"}>
                                                    <div className="overlay"></div>
                                                    <div className="modal-content">
                                                        <p>Delete User?</p>
                                                        <button onClick={()=>setIsDeleteModalOpen(false)}>Back</button>
                                                        <button>Delete</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )):<tr key={0}>
                                        <td>None</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}