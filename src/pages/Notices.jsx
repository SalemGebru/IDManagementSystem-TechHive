import { useEffect } from "react";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import { useTranslation } from "react-i18next"
import i18n from "../i18n";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function Notices(){
    const { t } = useTranslation();

    

    return(
        

        <div className="page notices">
            <Navbar/>
            <div id="content">
                <Sidebar/>
                <main>
                    <Header/>
                        <h1>Notifications</h1>
                        <div className="messages">
                        <   div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                            <div>Your id has been approved</div>
                        </div>
                   <Footer/> 
                   
                </main>
                
            </div>
            
            
        </div>
    )
}