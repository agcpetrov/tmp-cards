import {animated} from "react-spring";
import Master from '../assets/master.jpeg';
import './final-modal.css';
import CloseIcon from "../assets/cross.png";
import {SocialsList} from "./socials-list.jsx";

export const FinalModal = ({ style, onClose }) => {
    return (
        <div className="modal-container">
        <animated.div style={style} className="modal final-modal">
            <button className="close-button" type={"button"} onClick={onClose}>
                <img src={CloseIcon} alt="close"/>
            </button>
            <div className="final-modal-container">
                <div className="image">
                    <img src={Master} alt=""/>
                </div>
                <div className={"text"}>
                    <p> 🔮 Привет! Меня зовут Милена и я Мастер Таро</p>

                    <p> <b> С ЧЕМ Я МОГУ ПОМОЧЬ: </b> </p>

                    <p> ❤️ Если речь о делах сердечных, то вы сможете получить совет и взгяд со стороны. Как правило мы видим далеко не всю картину и таро здесь выступит независимым экспертом. </p>

                    <p> 💼 Личностный, профессиональный рост, самореализация. Возможно, вы планируете новое дело, или впали в стагнацию. Задайте свои вопросы и ответы не заставят себя ждать. </p>

                    <p> 🤕 Многие сейчас находятся не в лучшем психологическом состоянии. Если у вас есть какие-то внутрненние недопонимания, обиды, переживания, карты дадут совет и станет намного легче. Даже простое общение может стать хорошей поддержкой. </p>

                    <p> 🙌 Какой бы сферы жизни не касался ваш вопрос. Будьте уверены, что вы получите все мое участие, понимание и заботу. </p>

                    <p> 🙏 В дополнение к частным консультациям, мой аккаунт в Instagram также является центром ценной информации и вдохновения, с регулярными публикациями о саморазвитии, отношениях и любви к себе. </p>

                    <p> <b>Свяжитесь со мной удобным для вас способом:</b> </p>

                    <SocialsList />
                </div>
            </div>
        </animated.div>
        </div>
    )
}
