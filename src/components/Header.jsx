import { useLocation, useNavigate } from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell,faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    const location=useLocation();
    const navigate=useNavigate();
    return(
        <div id="header">
            <p>{location.pathname}</p>
            <ul>
            <li onClick={()=>navigate('/employee/notifications')}>
                    <FontAwesomeIcon icon={faBell} className="icon"></FontAwesomeIcon>
                </li>
                <li ><FontAwesomeIcon icon={faGlobe} className="icon"></FontAwesomeIcon>
                    <select onChange={(e)=>handleLanguageSwitch(e.target.value)}>
                        <option value="en">English</option>
                        <option value="am">Amharic</option>
                    </select>
                </li>
            </ul>
            
        </div>
    )
}