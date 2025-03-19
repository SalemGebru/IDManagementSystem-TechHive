import { useNavigate } from "react-router"
import {  useSelector } from "react-redux";



export default function Sidebar(){
    const navigate=useNavigate();
    

    const isMenuOpen=useSelector((state)=>state.menu.isMenuOpen);

    
    return(
        <aside className={isMenuOpen?"":"hide"}>
            <ul>
                <li onClick={()=>navigate('/employee/dashboard')}>Dashboard</li>
                
            </ul>
        </aside>
    )
}