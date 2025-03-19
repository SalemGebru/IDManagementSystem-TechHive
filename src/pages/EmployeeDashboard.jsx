import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import {useReactToPrint} from 'react-to-print'


import { getProfile } from "../features/profileSlice"
import { getUser } from "../features/userSlice"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/header"
import Footer from "../components/Footer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBarcode } from "@fortawesome/free-solid-svg-icons"



export default function EmployeeDashboard(){
    const dispatch=useDispatch();
    const [isShowingID,setIsShowingID]=useState(false);
    const [userData,setUserData]=useState({
        name:'',
        role:'',
        id:'',
        image:''||'No image available'
        
    });

    useEffect(()=>{
         dispatch(getUser())
        .then((result)=>{
            if(result.payload){
                setUserData({
                    name:result.payload.name,
                    role:result.payload.role,
                    id:result.payload.id,
                    
            })
        }
        });
    },[]);

    useEffect(()=>{
        dispatch(getProfile())
        .then((result)=>{
            if(result.payload){
                setUserData(prevData=>({
                    ...prevData,
                    image:result.payload.image
                }));
            }
        })
    },[]);




    //printing doesn't work

    const idRef = useRef();
    const badgeRef = useRef();

    const handlePrintId = useReactToPrint({
        content: () => idRef.current,
    });

    const handlePrintBadge = useReactToPrint({
        content: () => badgeRef.current,
    });



    return(
        <div className="page">
            <Navbar/>
            <div id='content'>
                <Sidebar/>  
                    <main> 
                        <Header/>
                        <h2>Your Credentials</h2>
                        <div id='toggle'>
                            <div className={isShowingID?"toggle-on":""} onClick={()=>setIsShowingID(true)}>See ID</div>
                            <div className={!isShowingID?"toggle-on":""} onClick={()=>setIsShowingID(false)}>See Badge</div>
                        </div>
                        {isShowingID?(
                                <div id='emp-id' >
                                    <div className="id" ref={idRef}>
                                        <div className="front" >
                                            <p id='company'>TechHive</p>
                                                <div className="iditems">
                                                    <div className='tags'>
                                                        <img src={userData.image} />
                                                        <p>{userData.id}</p>
                                                    </div>
                                                    <div className='info'>
                                                        <div className="field-value">
                                                            <p className='field'>Full Name: </p><p className='value'>{userData.name}</p>
                                                        </div>
                                                    
                                                        <br/>
                                                        <div className="field-value">
                                                            <p className='field'>Job Position: </p><p className='value'>{userData.role}</p>
                                                        </div>
                                                        <br/>
                                                        <div className="field-value">
                                                            <p className='field'>Valid Until: </p><p className='value'>12-12-2030</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon icon={faBarcode} className="icon barcode" ></FontAwesomeIcon>
                                        </div>
                                        <div className="back">
                                            <div className="tags">
                                                <p>TechHive</p>
                                                <p>Jomo Kenyatta Avenue</p>
                                                <p>Telephone:+251-xxx-xxx-xxxx</p>
                                            </div> 
                                        </div>
                                    </div> 
                               </div>
                        ):(
                                <div id='badges'>
                                    <div className="badge">
                                        <div className="badge-front" ref={badgeRef}>
                                            <p>TechHive</p>
                                            <img src={userData.image} />
                                            <p>{userData.name}</p>
                                            <p>{userData.role}</p>
                                        </div>
                                        <div className="badge-back">
                                            <h2>TechHive</h2>
                                            <br/>
                                            <p>Report lost or stolen badges immediately to Security at (123) 456-7890.</p>  
                                        </div>
                                    </div>
                                </div>
                        )
                        } 
                        <button onClick={isShowingID?handlePrintId:handlePrintBadge} >{isShowingID?"Print your ID":"Print your badge"}</button>
                        <Footer/> 
                    </main>
                        
                </div>
            
        </div>
    )
}