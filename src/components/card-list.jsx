import './card.css';
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSprings, animated, to as interpolate, useTransition, useSpring} from "react-spring";
import {useDrag} from "react-use-gesture";
import CardBack from '../assets/card-back.png';
import {Modal} from "./modal.jsx";
import {FinalModal} from "./final-modal.jsx";
import {SocialsList} from "./socials-list.jsx";
import {PriceModal} from "./price-modal.jsx";
import {preloadImage} from "../App.jsx";
import Master from '../assets/master.jpeg';


const titles = [
    'Откройте дверь в мир тайн и загадок, в мир Таро.',
    'Осознание вашего пути',
    'Каждая карта — это откровение.',
    'Ваши вопросы находят ответы, а таинственное становится понятным',
    'Следуйте за картами. Таро на вашей стороне.',
    'Поговорим о вашем будущем?'
]

const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
    rotateY: 180,
})
const from = (_i) => ({x: 0, rot: 0, scale: 1.5, y: -1000, rotateY: 180})

const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const CardList = ({ cards }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [props, api] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i),

        onRest: () => {
            setTimeout(() => {
                setIsMounted(true);
            }, 1000);
        },
    }));

    useLayoutEffect(() => {
        preloadImage(Master);
    }, []);

    const lastOffsetMemo = useRef([]);
    const [zIndexes, setZIndexes] = useState([1, 1, 1, 1, 1]);
    const [modalOpened, setModalOpened] = useState([]);
    const [isModalOpening, setModalOpening] = useState(false);
    const [modalText, setModalText] = useState(cards[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showSocials, setShowSocials] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowSocials(true);
        }, 1000);
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const transitions = useTransition([modalVisible], {
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0}
    });

    const [finalModalVisible, setFinalModalVisible] = useState(false);
    const finalModalTransitions = useTransition([finalModalVisible], {
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0}
    });

    const [priceModalVisible, setPriceModalVisible] = useState(false);
    const priceModalTransitions = useTransition([priceModalVisible], {
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0}
    })

    const openFinalModal = () => {
        setFinalModalVisible(true);
        setModalVisible(false);
    }

    const closeInfoModal = () => {
        setModalVisible(false);
        if (activeIndex === cards.length) {
            setFinalModalVisible(true)
        }
    }

    const openPriceModal = () => {
        setPriceModalVisible(true);
        setFinalModalVisible(false);
        setModalVisible(false);
    }

    const closePriceModal = () => {
        setPriceModalVisible(false);
    }

    const [fadeIn, setFadeIn] = useSpring(() => ({y: -200, opacity: 0, config: {duration: 500}}));
    const [fadeOut, setFadeOut] = useSpring(() => ({y: 200, opacity: 1, config: {duration: 500}}));

    useEffect(() => {
        setFadeIn({y: 0, opacity: 1, from: {y: -200, opacity: 0}, config: {duration: 600}});
        setFadeOut({y: 200, opacity: 0, from: {y: 0, opacity: 1}, config: {duration: 600}});
        setActiveIndex(modalOpened.length)
    }, [modalOpened, setFadeIn, setFadeOut]);

    const bind = useDrag(({
                              args: [index, initialX],
                              movement: [x, y],
                              offset: [mx, my],
                              direction: [xDir],
                              velocity,
                              first,
                              last
                          }) => {
        api.start(i => {
            if (index !== i || isModalOpening) return;
            setZIndexes(prev => {
                return prev.map((elem, i) => {
                    if (i === index) {
                        return Math.max(...prev) + 1;
                    }
                    return elem;
                });
            });
            if (first) {
                if (lastOffsetMemo.current[i]) {
                    return {
                        x: lastOffsetMemo.current[0],
                        y: lastOffsetMemo.current[1],
                        rotateY: 0,
                        rot: 0,
                    }
                }
                lastOffsetMemo.current[i] = [0, 0];
                return {
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    rot: 0,
                }
            }

            if (last) {
                const xc = x + lastOffsetMemo.current[i][0];
                const yc = y + lastOffsetMemo.current[i][1];
                lastOffsetMemo.current[i] = [xc, yc];
                if (!modalOpened.includes(i)) {
                    setModalOpening(true);
                    setModalText(cards[i]);
                    setTimeout(() => {
                        setModalVisible(true);
                        setModalOpening(false);
                    }, 1500);
                    setModalOpened(prev => [...prev, i]);
                }
                return {
                    x: lastOffsetMemo.current[i][0],
                    y: lastOffsetMemo.current[i][1],
                    rotateY: 0,
                    rot: 0,
                }
            }

            return {
                x: x + lastOffsetMemo.current[i][0],
                y: y + lastOffsetMemo.current[i][1],
                rotateY: 0,
                rot: 0,
            }
        });
    });

    return <>
        <div className="container">
            <div className="title-wrapper">
                <animated.h1 className="title" style={fadeIn}>{titles[activeIndex] || titles[0]}</animated.h1>
                {!!titles[activeIndex - 1] &&
                    <animated.h1 className="title" style={fadeOut}>{titles[activeIndex - 1]}</animated.h1>}
            </div>

            <div className="table">
                {props.map(({x, y, rot, scale, rotateY}, i) => {
                    return (
                        <animated.div onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}
                                      key={i}
                                      className={`deck`}
                                      style={{x, y, zIndex: zIndexes[i]}}>
                            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                                <animated.div
                                    style={{
                                        transform: interpolate([rot, scale], trans),
                                        position: 'relative',
                                        backfaceVisibility: 'hidden',
                                        perspective: '1000px',
                                    }}
                                    className={`${(i === props.length - 1 && activeIndex === 0 && !isDragging && isMounted) ? 'last-card-animated' : ''}`}
                                >
                                    <animated.div className={"inner"}
                                                  style={{rotateY}}                   {...bind(i, x)}>
                                        <div className="front">
                                            <img src={cards[i].image} alt="" draggable={"false"}/>
                                        </div>
                                        <div className="back">
                                            <img src={CardBack} alt={""} draggable={"false"}/>
                                        </div>
                                    </animated.div>
                                </animated.div>
                        </animated.div>

                )
                })}
            </div>
        </div>
        {transitions(
            (style, item) => {
                return item &&
                    <Modal text={modalText} onClose={closeInfoModal} onGetMore={openFinalModal} style={style}/>
            }
        )}

        {finalModalTransitions(
            (style, item) => {
                return item && <FinalModal style={style} onClose={() => setFinalModalVisible(false)}/>
            }
        )}

        {priceModalTransitions(
            (style, item) => {
                return item && <PriceModal style={style} onClose={closePriceModal}/>
            }
        )}

        <div className={`deck-socials ${showSocials && 'deck-socials-visible'}`}>
            <button className="deck-catalog-btn" onClick={openPriceModal}>
                Каталог
            </button>
            <div className="deck-socials-inner">
                <SocialsList/>
            </div>
        </div>
    </>
}
