import {useEffect, useRef, useState} from "react";
import {useSpring, animated} from "react-spring";
import ArrowDown from '../assets/arrow.png';

export const PriceItem = ({ title, price, descriptionList }) => {
    const [open, setOpen] = useState(false);
    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const calcContentMaxHeight = () => {
            ref && setContentMaxHeight(ref.current.scrollHeight + 16 + 32 + 42);
        };

        calcContentMaxHeight();

        window.addEventListener("resize", calcContentMaxHeight);

        return () => window.removeEventListener("resize", calcContentMaxHeight);
    }, [ref, contentMaxHeight]);

    const { scY, y, ...props } = useSpring({
        scY: open ? -1 : 1,
        // y: open ? 0 : -contentMaxHeight,
        opacity: open ? 1 : 0,
        maxHeight: open ? `${contentMaxHeight}px` : "0px",
        padding: open ? '16px' : '0',
        marginTop: open ? '16px' : '0',
        config: { duration: 300 }
    });

    return (
        <div className="price-item">
            <div className="price-heading" onClick={() => setOpen(!open)}>
                <h2 className="price-title">{title}</h2>
                <img className={`price-arrow ${open ? 'open' : ''}`} src={ArrowDown} alt=""/>
            </div>

            <animated.div
                ref={ref}
                style={{
                    overflow: "hidden",
                    // transform: y.interpolate(y => `translateY(${y}px)`),
                    ...props
                }}
                className="price-content"
            >
                <ul className="price-list">
                    {descriptionList.map((description, index) => <li className="price-list-item"
                                                                     key={index}>{description}</li>)}
                </ul>
                <p className="price-value">{price}&nbsp;₽</p>
            </animated.div>
        </div>
    )
}
