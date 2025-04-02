import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { signin } from "../features/userSlice";

import logo from "../images/logo.png";


export default function Signin(){
    const logged=useSelector((state)=>state.user.logged);
    const role=useSelector((state)=>state.user.role);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        email:'',
        password:''
    });

    useEffect(() => {
        if (logged && role) {  
            const lowerRole = String(role).toLowerCase();


            if (lowerRole === "employee") {
                navigate("/employee/dashboard");
            } else if (lowerRole === "it assistant") {
                navigate("/usermanagement");
            } else if (lowerRole === "hr") {
                navigate("/employeemanagement");
            }
        }
    }, [logged, role, navigate]); 

    const handleSignin = (e) => {
        e.preventDefault();
        dispatch(signin(formData)); 
    };

    return(
        <div id="sign-in">
            <div id='sign-in-section'>
                <div id='brand'>
                    <img src={logo}/>
                </div>
                <div id='card'>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignin}>
                        <div className="field-value">
                            <label>Email: </label>
                            <input type="email" placeholder="Email Address" onChange={(e)=>setFormData({...formData,email:e.target.value})} />
                        </div>
                        <br/>
                        <div className="field-value">
                        <label>Password: </label>
                        <input type="password" placeholder="Password" onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
                        </div>
                        <button type="submit" >Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}