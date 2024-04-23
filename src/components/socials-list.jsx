import Instagram from '../assets/instagram.png';
import Telegram from '../assets/telegram.png';
import WhatsApp from '../assets/whatsapp.png';
import ym from "react-yandex-metrika";

const handleInstagramClick = () => {
    ym('reachGoal', 'instagram');
    console.log('go inst');
}

const handleWhatsAppClick = () => {
    ym('reachGoal', 'whatsapp');
}

const handleTelegramClick = () => {
    ym('reachGoal', 'telegram');
}

export const SocialsList = () => {
    return <div className="buttons">
        <a href="https://www.instagram.com/_milen_soul/" onClick={handleInstagramClick} target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={Instagram} alt="" className="social-button-icon"/>
        </a>
        <a href="https://wa.me/79196007873" onClick={handleWhatsAppClick} target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={WhatsApp} alt="" className="social-button-icon"/>
        </a>
        <a href="https://t.me/K_Linka" onClick={handleTelegramClick} target="_blank" rel="noopener noreferrer" className="social-button">
            <img src={Telegram} alt="" className="social-button-icon"/>
        </a>
    </div>
}
