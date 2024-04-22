import Instagram from '../assets/instagram.png';
import Telegram from '../assets/telegram.png';
import WhatsApp from '../assets/whatsapp.png';


export const SocialsList = () => {
    return <div className="buttons">
        <a href="https://www.instagram.com/_milen_soul/" target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={Instagram} alt="" className="social-button-icon"/>
        </a>
        <a href="https://wa.me/79196007873" target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={WhatsApp} alt="" className="social-button-icon"/>
        </a>
        <a href="https://t.me/K_Linka" target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={Telegram} alt="" className="social-button-icon"/>
        </a>
    </div>
}
