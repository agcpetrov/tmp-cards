import { animated } from "react-spring";
import CloseIcon from "../assets/cross.png";
import {PriceItem} from "./price-item.jsx";
import './prices.css';
import {SocialsList} from "./socials-list.jsx";


const prices = [
    {
        title: "Рассклад «Пауза»",
        price: 1600,
        descriptionList: [
            'Что он понял за время расставания?',
            'О чем он молчит?',
            'Что он скрывает?',
            'Что он хочет?',
            'Чего боится?',
            'Что он намерен делать?',
        ]
    },
    {
        title: "Рассклад «Колесо года»",
        price: 2500,
        descriptionList: [
            'Подробный анализ, что ждет вас в новом году',
            'Наиболее удачные моменты',
            'Наиболее сложные моменты',
            'Поворотные точки',
        ]
    },
    {
        title: "Рассклад «Посвящение»",
        price: 2500,
        descriptionList: [
            'Выявление болезненного влияния из прошлого, которое нужно исцелить',
            'Центральная проблема',
            'От чего вы отказалисть в процессе?',
            'Урок, ставший наставлением на вашем пути',
        ]
    },
    {
        title: "Рассклад «Отношения с партнером»",
        price: 2000,
        descriptionList: [
            'Стремится ли партнер к созданию семьи и способоен ли на это?',
            'Хочет ли он детей?',
            'Какой он как отец?',
            'Способен ли он материально обеспечить семью?',
            'Его положительные качества',
            'Негативные качества',
            'Есть ли у него зависимости?'
        ]
    },
    {
        title: "Рассклад «Все о нем»",
        price: 1700,
        descriptionList: [
            'Какие мысли у партнера?',
            'Его чувства ко мне',
            'Его намерения',
            'Его страхи',
            'Что он будет делать?',
            'Совет карт'
        ]
    },
    {
        title: "Рассклад «Бывший хочет вернуться»",
        price: 1300,
        descriptionList: [
            'Как настроен к вам бывший партнер?',
            'Есть ли у него желание вернуть вас?',
            'Будет ли пытаться вернуть вас в загаданный период?',
            'Есть ли будущее с ним/ней и какое оно?'
        ]
    },
    {
        title: "Рассклад «Свободные отношения»",
        price: 1700,
        descriptionList: [
            'Чувства и мысли',
            'Действия в течении 3-х месяцев',
            'Перспективы отношений',
            'Возможны ли серьезные отношения?',
            'Совет карт'
        ]
    }
]


export const PriceModal = ({ style, onClose }) => {
    return (
        <div className="modal-container">
            <animated.div style={style} className="modal price-modal">
                <button className="close-button" type={"button"} onClick={onClose}>
                    <img src={CloseIcon} alt="close"/>
                </button>


                <div className="price-modal-content">
                    <h1 className="prices-title">Каталог</h1>

                    <div className="price-text-item">
                        1 вопрос на таро с развернутым ответом: <b>600&nbsp;₽</b>
                    </div>

                    <div className="price-text-item">
                        3 вопроса: <b>1500&nbsp;₽</b>
                    </div>

                    {prices.map((price) => <PriceItem key={price.title} {...price} />)}

                    <div className="price-outer">
                        Если у вас есть вопросы, которые не вошли в каталог, вы можете связаться со мной удобным для вас
                        способом:
                    </div>

                    <SocialsList/>
                </div>
            </animated.div>
        </div>
    )
}
