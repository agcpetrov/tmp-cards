import {animated} from "react-spring";
import CloseIcon from '../assets/cross.png';
import ArrowRight from '../assets/arrow-right.png';
import './modal.css';

export const Modal = ({ onClose, style, text, onGetMore }) => {
    return <animated.div style={style} className="modal">
        <div className={"text"}>
            {text}
        </div>
        <div className={"buttons"}>
            <button className="modal-button more" onClick={onGetMore}>
                <span className="modal-button-text">Узнать больше</span>
                <span className="modal-button-arrow">
                    <img src={ArrowRight} alt="" />
                </span>
            </button>
        <button className="close-button" type={"button"} onClick={onClose}>
            <img src={CloseIcon} alt="close"/>
        </button>
        </div>
    </animated.div>
}
