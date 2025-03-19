import { useDispatch, useSelector } from "react-redux"
import {  useNavigate } from "react-router";
import { useState } from "react";

import i18next  from "i18next";

import {  toggleMenu } from "../features/menuSlice";

import logo from "../images/logo.png"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars,faUser} from '@fortawesome/free-solid-svg-icons'






export default function Navbar(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    

    const isMenuOpened=useSelector((state)=>state.menu.isMenuOpen);
    const [isProfileMenuOpened,setIsProfileMenuOpened]=useState(false);

   

    const handleMenu = () => {
        dispatch(toggleMenu());
    };
    

    const name = useSelector((state) => state.profile.profile.name);


    //language setting doesn't work
    const handleLanguageSwitch=(lng)=>{
        
            i18next.changeLanguage(lng);
        
    }


    return(
        <nav>
            <div className="logo">         
                <FontAwesomeIcon icon={faBars} onClick={handleMenu} className="icon"></FontAwesomeIcon> 
                <img src={logo}/>
            </div>
            <h2>ID Management System</h2>
            <div className="bar">
                    <h3 >Welcome <FontAwesomeIcon icon={faUser} onClick={()=>setIsProfileMenuOpened(!isProfileMenuOpened)} className="icon"></FontAwesomeIcon></h3>
                    <div className={isProfileMenuOpened?"dropdown":"hide"}>
                        <ul className="profileSettings">
                            <li onClick={()=>navigate('/employee/profile')}>Profile</li>
                            <li onClick={()=>navigate('/')}>Logout</li>
                        </ul>
                    </div>
                    <br/>
            </div>
        </nav>
    )
}
