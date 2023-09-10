import './App.css'
import {CardList} from "./components/card-list.jsx";
import {useLayoutEffect, useState} from "react";
import BG from './assets/bg.jpg';
import CardBack from './assets/card-back.png';

export const cards = [
    'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]

const imageToPreload = [
    ...cards,
    BG,
    CardBack,
];

function preloadImage (src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function() {
            resolve(img)
        }
        img.onerror = img.onabort = function() {
            reject(src)
        }
        img.src = src
    })
}

function App() {
    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        const loadHandler = async () => {
            const imagesPromiseList = []
            for (const i of imageToPreload) {
                imagesPromiseList.push(preloadImage(i))
            }
            await Promise.all(imagesPromiseList)

            setLoaded(true);
        }

        window.addEventListener('load', loadHandler);

        return () => {
            window.removeEventListener('load', loadHandler);
        }
    }, []);


  return (
    <>
        {!loaded && <div className="loader"><div className="lds-heart"><div></div></div></div>}
        {loaded && <CardList/>}
    </>
  )
}

export default App
