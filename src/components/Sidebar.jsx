import { useNavigate } from "react-router"
import {  useSelector } from "react-redux";



export default function Sidebar(){
    const navigate=useNavigate();
    

    const isMenuOpen=useSelector((state)=>state.menu.isMenuOpen);

    
    return(
        <aside className={isMenuOpen?"":"hide"}>
            <ul>
                <li onClick={()=>navigate('/employee/dashboard')}>Employee Dashboard</li>
                <li onClick={()=>navigate('/usermanagement')}>User Management</li>
                <li onClick={()=>navigate('/employeemanagement')}>Employee Management</li>
                <li onClick={()=>navigate('/templatesettings')}>Settings</li>
            </ul>
        </aside>
    )
}