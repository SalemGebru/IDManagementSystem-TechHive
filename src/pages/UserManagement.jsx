import { useEffect, useState,useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useDispatch, useSelector } from "react-redux"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/header"
import Footer from "../components/Footer"
import Form from "../components/Form"

import { addUser,getUser,updateUser,deleteUser,deleteBunch } from "../features/userSlice"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus,faClose,faEye,faEdit,faTrash,faCircle,faAngleDoubleLeft,faAngleDoubleRight,faCheck } from "@fortawesome/free-solid-svg-icons"


export default function UserManagement(){
    const dispatch=useDispatch();
    const {users}=useSelector((state=>state.user));

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
    const [selectedUsers,setSelectedUsers]=useState({});
    const [startSelection,setStartSelection]=useState(false);
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:'',
        role:'',
        status:'',
        image:''||'No image available'
    })
    const [searchItem,setSearch]=useState('');
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

    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=5;

    const totalPages=Math.ceil(userdata.length/itemsPerPage);

    const lastItemIndex=currentPage*itemsPerPage;
    const firstItemIndex=lastItemIndex-itemsPerPage;
    const currentdata=userdata.slice(firstItemIndex,lastItemIndex);

    const nextPage=()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
    }

    const prevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1);
        }
    }

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

    const handleSaveUser = () => {    
        if (!formData.username || !formData.email || !formData.role || !formData.image || !formData.password) {
            alert('There are missing fields');
            return;
        } else {
            if (formData.password== confPassword) {
                dispatch(addUser(formData));
            } else {
                alert('Password mismatch');
                return;
            }
        }
    }

    const handleUpdateUser=(id)=>{
        dispatch(updateUser({ Id:id,FormData: formData }))
    }
    
    const handleDeleteUser=(id)=>{
        dispatch(deleteUser({id:id}))
    }

    //printing has errors although it essentially prints
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef, });

    const handleSelectedRows = (rowId) => {
        setSelectedUsers((prev) => {
            const updatedSelection = {
                ...prev,
                [rowId]: !prev[rowId], 
            };
        const hasSelectedRows = Object.values(updatedSelection).some((isSelected) => isSelected);

        setStartSelection(hasSelectedRows); 

        return updatedSelection;
    })};

    const handleDeleteBunch=()=>{
        console.log(selectedUsers);
        dispatch(deleteBunch(selectedUsers));
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
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Add User
                            </button>
                            <div className={isModalOpen?"modal":"hide"}>
                                <div className="overlay"></div>
                                <div className="modal-content">
                                    <div className="img-section">
                                        <img src={formData.image||""}/>
                                        <input type="file" required onChange={imageUploader}></input>
                                    </div>
                                    <div className="user-info">
                                        <h2>Add User</h2>
                                        <Form formData={formData} setFormData={setFormData} setConfPassword={setConfPassword} />
                                        <div className="btn-grp">
                                            <button icon={faClose} onClick={handleCloseModal}>Back</button>
                                            <button onClick={handleSaveUser}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-filter">
                            <input type="search" placeholder="Search for user" onChange={(e)=>setSearch(e.target.value)}></input>
                        </div>
                        <div className="pagination">
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
                            </button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button onClick={nextPage} disabled={currentPage === totalPages}>
                            <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                            </button>
                        </div>
                        <div className={startSelection?"extra-btns":"hide"}>
                            <button onClick={handleDeleteBunch}>Delete bunch</button>
                        </div>
                        <table ref={contentRef} >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(userdata)?
                                currentdata.length>0?currentdata.filter((row)=>{
                                        return searchItem.toLowerCase()===''?row:String(row.username).toLowerCase().includes(searchItem)
                                }).map((row)=>(
                                    <tr key={row.id}>
                                        <td>
                                            {!selectedUsers[row.id]?<FontAwesomeIcon icon={faCircle} className="circle-icon" onClick={()=>{handleSelectedRows(row.id)}}></FontAwesomeIcon>:
                                            <FontAwesomeIcon icon={faCheck} onClick={()=>{handleSelectedRows(row.id)}}></FontAwesomeIcon>}
                                        </td>
                                        <td>{row.id}</td>
                                        <td id="username-col"><img src={row.image} title={row.image}></img>{row.username}</td>
                                        <td>{row.email}</td>
                                        <td>{row.password}</td>
                                        <td>{row.role}</td>
                                        <td>{row.status}</td>
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
                                                            <input type="file" required  onChange={imageUploader}></input>
                                                    </div>
                                                    <div className="user-info">
                                                        <h2>Edit User Details</h2>
                                                        <Form formData={formData} setFormData={setFormData} setConfPassword={setConfPassword}
                                                         selectedUserName={selectedUser.username} selectedUserEmail={selectedUser.email} 
                                                        selectedUserRole={selectedUser.role} selectedUserPassword={selectedUser.password} 
                                                        />
                                                        <div className="btn-grp">
                                                            <button icon={faClose} onClick={()=>setIsEditModalOpen(false)}>Back</button>
                                                            <button onClick={()=>handleUpdateUser(selectedUser.id)}>Save</button>
                                                        </div>
                                                    </div>
                                               </div>
                                           </div>
                                            <FontAwesomeIcon icon={faTrash} className="table-icon" onClick={()=>{setIsDeleteModalOpen(true),setSelectedUser(row)}}></FontAwesomeIcon>
                                                <div className={isDeleteModalOpen?"modal":"hide"}>
                                                <div className="overlay"></div>
                                                    <div className="modal-content">
                                                        <p>Delete User?</p>
                                                        <div className="btn-grp">
                                                            <button onClick={()=>setIsDeleteModalOpen(false)}>Back</button>
                                                            <button onClick={()=>handleDeleteUser(selectedUser.id)}>Delete</button>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                        </td>
                                    </tr>
                                )):<tr key={0}>
                                    <td>None</td>
                                    </tr>
                                    : <tr><td colSpan="8">No users found</td></tr>
                                }
                            </tbody>
                        </table>
                        
                        <button onClick={() => reactToPrintFn()}>Print table</button>
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}