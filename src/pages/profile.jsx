import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/header"
import Footer from "../components/Footer"

import {updateProfile,getProfile } from "../features/profileSlice"

export default function Profile(){
    const dispatch=useDispatch();

    const [isUpdating,setIsUpdating]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [formData,setFormData]=useState({
        name:'',
        gender:'',
        birthdate:'',
        cellphone:'',
        image:''||'No image available'
    });

    const profile=useSelector((state)=>state.profile.profile);
   
    useEffect(() => {
        dispatch(getProfile())
        .then((result)=>{
            if(result.payload){
                setFormData({
                    name:result.payload.name,
                    birthdate:result.payload.birthdate,
                    gender:result.payload.gender,
                    cellphone:result.payload.cellphone,
                    image:result.payload.image
                })
            }
        });
        
    }, [profile]);

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
    
        setFormData({...formData,[e.target.name]:e.target.value});
   }

   const handleEditingState=()=>{
    setIsEditing(prev=>!prev);
   }

   const handleEdit=()=>{
    dispatch(updateProfile(formData));
   }


    return(
        <div className="page profile">
            <Navbar/>
            <div id="content">
                <Sidebar/>
                <main>
                    <Header/>
                    <div id="profile-card">
                        <div id="toggle">
                            <div className={isEditing?"":"toggle-on"} onClick={()=>handleEditingState()}>Your Profile</div>
                            <div className={isEditing?"toggle-on":""} onClick={()=>handleEditingState()}>Edit Profile</div>
                        </div>
                        {!isEditing?(
                                <div id="profile-card-info">
                                    <img src={formData.image||""}/>
                                        <div className="field-value">
                                            <p>Full name</p><p>{formData.name||'N/a'}</p>
                                        </div>
                                        <div className="field-value">
                                            <p>Gender</p><p>{formData.gender||'N/a'}</p>
                                        </div>
                                        <div className="field-value">
                                            <p>Birthdate</p><p>{formData.birthdate||'N/a'}</p>
                                        </div>
                                        <div className="field-value">
                                            <p>Cellphone</p><p>{formData.cellphone||'N/a'}</p>
                                        </div>
                                </div>
                        ):
                                <div id="profile-card-info">
                                    <form>
                                        <img src={formData.image||""}/>
                                        <input type='file' onChange={imageUploader} disabled={isUpdating?false:true}/>
                                        <div className="field-value">
                                            <label>Full name</label>
                                            <input type='text' placeholder="Full Name" name="name" onChange={(e)=>handleChange(e)} disabled={isUpdating?false:true} value={formData.name||''}/>
                                        </div>
                                        <div className="field-value">
                                            <label>Gender</label>
                                            <select name="gender"  disabled={isUpdating?false:true} onChange={(e)=>handleChange(e)} value={formData.gender||''}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="field-value">
                                            <label>Birthdate</label>
                                            <input type='date' placeholder="Birthdate" name="birthdate" onChange={(e)=>handleChange(e)} disabled={isUpdating?false:true} value={formData.birthdate||''}/>
                                        </div>
                                        <div className="field-value">
                                            <label>Cellphone</label>
                                            <input type='tel' placeholder="Telephone" name="cellphone" onChange={(e)=>handleChange(e)} disabled={isUpdating?false:true} value={formData.cellphone||''}/>
                                        </div>
                                    </form>
                                    <button onClick={() => {handleEdit(),setIsUpdating(!isUpdating)}}>{isUpdating?"Save Changes":"Update Profile"}</button>
                                </div>}   
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}