import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProfileForm from "../components/ProfileForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus,faClose,faAngleDoubleLeft,faAngleDoubleRight,faEye,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState,useEffect } from "react"

import { createProfile,getProfile,updateProfile,deleteProfile } from "../features/profileSlice"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"


export default function EmployeeManagement(){
    const dispatch=useDispatch();
    
    const {profiles}=useSelector((state=>state.profile));

    const [isCreateModalOpen,setIsCreateModalOpen]=useState(false);
    const [isEditModalOpen,setIsEditModalOpen]=useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);

    const [formData,setFormData]=useState({
        name:'',
        id:'',
        position:'',
        department:'',
        birthdate:'',
        hiredate:'',
        status:'',
        phone:'',
        address:'',
        gender:'',
        issuedate:'',
        expiredate:''
    })
    const [employeeProfile,setEmployeeProfile]=useState([]);
    const [selectedUser,setSelectedUser]=useState({});
    const [searchItem,setSearch]=useState('');

    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=5;

    const totalPages=Math.ceil(employeeProfile.length/itemsPerPage);

    const lastItemIndex=currentPage*itemsPerPage;
    const firstItemIndex=lastItemIndex-itemsPerPage;
    const currentdata=employeeProfile.slice(firstItemIndex,lastItemIndex);

    const nextPage=()=>{
        console.log(currentPage)
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
        
    }

    const prevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1);
        }
    }

   


    useEffect(() => { 
            dispatch(getProfile())
                .then((data) => {
                    const dataitem=data.payload;
                    setEmployeeProfile(dataitem)
                    console.log(employeeProfile);
                })
                .catch((error) => {
                    console.log('Error fetching data', error);
                });
        }, [dispatch,profiles]);
    
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

    const handleCreateProfile=()=>{
        dispatch(createProfile(formData));
    }

    const handleUpdateProfile=(id)=>{
        console.log(id);
        dispatch(updateProfile({Id:id,FormData:formData}));
    }

    const handleDeleteProfile=(id)=>{
        dispatch(deleteProfile({Id:id}));
    }



    return(
        <div className="page employee">
            <Navbar/>
            <div id='content'>
                <Sidebar/>
                <main>
                    <Header/>
                    <div className="management-table">
                        <div className="table-header">
                            <h1>Employee Table</h1>
                            <button onClick={()=>setIsCreateModalOpen(true)}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                Add Employee
                            </button>
                        </div>
                        <div className={isCreateModalOpen?"modal":'hide'}>
                            <div className="overlay"></div>
                            <div className="modal-content">
                                <img src={formData.image}/>
                                <input type="file" onChange={imageUploader}></input>
                                <div className="user-info">
                                    <h2>Edit Profile Details</h2>
                                    <ProfileForm formData={formData} setFormData={setFormData}/>
                                    <div className="btn-grp">
                                        <button icon={faClose} onClick={()=>setIsCreateModalOpen(false)} >Back</button>
                                        <button onClick={handleCreateProfile} >Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-filter">
                            <input type="search" placeholder="Search for employee" onChange={(e)=>setSearch(e.target.value)}></input>
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
                        
                        <table>
                            <thead>
                                <tr>
                                    <td>blank</td>
                                    <td>Company</td>
                                    <td>Employee ID</td>
                                    <td>Name</td>
                                    <td>Address</td>
                                    <td>Phone-Number</td>
                                    <td>Gender</td>
                                    <td>Birth-date</td>
                                    <td>Department</td>
                                    <td>Job Position</td>
                                    <td>Hire date</td>
                                    <td>Issue date</td>
                                    <td>Expiry date</td>
                                    <td>ID status</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentdata.length > 0 ? (
                        currentdata.filter((row)=>{
                            return searchItem.toLowerCase()===''?row: String(row.name).toLowerCase().includes(searchItem)
                        }).map((row)=>(
                                    <tr key={row.id}>
                                        <td id='username-col'><img src={row.image} title={row.image}></img></td>
                                        <td>TechHive</td>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.address}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.gender}</td>
                                        <td>{row.birthdate}</td>
                                        <td>{row.department}</td>
                                        <td>{row.position}</td>
                                        <td>{row.hiredate}</td>
                                        <td>{row.issuedate}</td>
                                        <td>{row.expiredate}</td>
                                        <td>{row.status}</td>
                                        <td className="icon-grp">
                                            <FontAwesomeIcon icon={faEye}  className="table-icon" onClick={()=>window.open(`http://localhost:5173/idmanagement?data=${row.id}`,'_blank')}></FontAwesomeIcon>
                                            <FontAwesomeIcon icon={faEdit} className="table-icon" onClick={()=>{setIsEditModalOpen(true),setSelectedUser(row)}}></FontAwesomeIcon>
                                                <div className={isEditModalOpen?"modal":'hide'}>
                                                        <div className="overlay"></div>
                                                        <div className="modal-content">
                                                        <img src={formData.image}/>
                                                        <input type="file" onChange={imageUploader}></input>
                                                            <div className="user-info">
                                                                <h2>Edit Profile Details</h2>
                                                                <ProfileForm formData={formData} setFormData={setFormData}/>
                                                                <div className="btn-grp">
                                                                    <button icon={faClose} onClick={()=>setIsEditModalOpen(false)}>Back</button>
                                                                    <button onClick={()=>handleUpdateProfile(selectedUser.id)}>Save</button>
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
                                                            <button onClick={()=>handleDeleteProfile(selectedUser.id)} >Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        </td>
                                    </tr>
                                ))):<tr>
                                    <td>No data</td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}