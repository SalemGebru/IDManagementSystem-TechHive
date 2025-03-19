import { faFacebook,faYoutube,faInstagram,faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function Footer(){
    return(
        <div id="footer">
            <div className="socials">
                <a><FontAwesomeIcon icon={faFacebook} className="icon"></FontAwesomeIcon></a>
                <a><FontAwesomeIcon icon={faInstagram} className="icon"></FontAwesomeIcon></a>
                <a><FontAwesomeIcon icon={faYoutube} className="icon"></FontAwesomeIcon></a>
                <a><FontAwesomeIcon icon={faTwitter} className="icon"></FontAwesomeIcon></a>
            </div>
            <p>{String.fromCharCode(169)} 2025, TechHive</p>
        </div>
    )
}