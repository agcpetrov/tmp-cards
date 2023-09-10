import {animated} from "react-spring";
import './modal.css';

export const Modal = ({ onClose, style, text }) => {
    return <animated.div style={style} className="modal">
        <div className={"text"}>
            {text}
        </div>
        <div className={"buttons"}>
            <a className="modal-button more" href={"https://www.instagram.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                Узнать больше
            </a>
        <button className="modal-button close" type={"button"} onClick={onClose}>
            Закрыть
        </button>
        </div>
    </animated.div>
}
