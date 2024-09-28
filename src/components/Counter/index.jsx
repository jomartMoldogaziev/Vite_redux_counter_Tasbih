import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../../store/actions';
import './Counter.css';
import clickSound from '../../sounds/click-sound.mp3';
import resetSound from '../../sounds/res.mp3';
import sound33 from '../../sounds/sound33.mp3'; 
import hundredSound from '../../sounds/hundred-sound.mp3'; 


const images = [
    'https://pngimg.com/uploads/sun/small/sun_PNG13424.png',
    'https://png.pngtree.com/png-clipart/20220705/ourmid/pngtree-mercury-planet-png-image_5683897.png',
    'https://w7.pngwing.com/pngs/216/536/png-transparent-venus-earth-planet-solar-system-venus-sphere-astronomical-object-uranus-thumbnail.png',
    'https://freepngimg.com/thumb/earth/33030-2-earth-image-thumb.png',
    'https://pngicon.ru/file/uploads/luna-na-prozrachnom-fone-.png',
    'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-beautiful-planet-mars-png-image_10198379.png',
    'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-3d-jupiter-planet-illustration-png-image_9199325.png',
    'https://png.pngtree.com/png-clipart/20230927/original/pngtree-3d-saturn-planet-illustration-png-image_13004227.png',
    'https://e7.pngegg.com/pngimages/205/649/png-clipart-round-blue-logo-discovery-of-neptune-planet-solar-system-uranus-planet-miscellaneous-purple-thumbnail.png',
    'https://png.pngtree.com/png-clipart/20230927/original/pngtree-neptune-planet-illustration-png-image_13139500.png',
    'https://cdn.pixabay.com/photo/2017/04/04/14/26/pluto-2201446_640.png',
];

const initialColors = Array(11).fill('lightgray'); 

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const [isMuted, setIsMuted] = useState(false);
    const [colors, setColors] = useState(initialColors); 
    const [isLimited, setIsLimited] = useState(true); 
    const [clickCount, setClickCount] = useState(0); 

    useEffect(() => {
        const savedClickCount = localStorage.getItem('clickCount');
        const savedIsMuted = localStorage.getItem('isMuted');
        const savedIsLimited = localStorage.getItem('isLimited');
        const savedColors = JSON.parse(localStorage.getItem('colors'));

        if (savedClickCount) {
            setClickCount(Number(savedClickCount));
        }
        if (savedIsMuted !== null) {
            setIsMuted(savedIsMuted === 'true');
        }
        if (savedIsLimited !== null) {
            setIsLimited(savedIsLimited === 'true');
        }
        if (savedColors) {
            setColors(savedColors);
        }
    }, []);

    const toggleSound = () => {
        setIsMuted(!isMuted);
        localStorage.setItem('isMuted', !isMuted);
    };

    const playClickSound = () => {
        if (!isMuted) {
            const audio = new Audio(clickSound);
            audio.play();
        }
    };

    const playResetSound = () => {
        if (!isMuted) {
            const audio = new Audio(resetSound);
            audio.play();
        }
    };

    const playSpecialSound = () => {
        if (!isMuted) {
            const audio = new Audio(sound33); 
            audio.play();
        }
    };

    const playHundredSound = () => {
        if (!isMuted) {
            const audio = new Audio(hundredSound);
            audio.play();
        }
    };

    const handleIncrement = () => {
        
        if (isLimited && counter >= 100) {
            return; 
        }

       
        setColors((prevColors) => {
            const newColors = [...prevColors];
            const nextIndex = counter % newColors.length; 

            if (counter % 11 === 0) {
                newColors.fill('lightgray');
                newColors[0] = images[0]; 
            } else {
                newColors[nextIndex] = images[nextIndex];
            }
            localStorage.setItem('colors', JSON.stringify(newColors));
            return newColors;
        });

        setClickCount((prevCount) => {
            const newCount = prevCount + 1;

            if (newCount % 33 === 0) {
                playSpecialSound();
            }

            if (counter + 1 === 100) {
                playHundredSound(); 
            }
            localStorage.setItem('clickCount', newCount);
            return newCount;
        });

        dispatch(increment());
        playClickSound();
    };

    const handleReset = () => {
        dispatch(reset());
        playResetSound();
        setColors(initialColors);
        setClickCount(0); 

        localStorage.removeItem('clickCount');
        localStorage.removeItem('colors');
    };

    return (
        <div className="counter-container">
            <div>
                <input className="counter-input" type="text" value={counter} readOnly />
            </div>
            <div className="limit-toggle">
                <label>
                    Ограничить до 100
                    <input 
                        type="checkbox" 
                        checked={isLimited} 
                        onChange={() => {
                            setIsLimited(!isLimited);
                            localStorage.setItem('isLimited', !isLimited); 
                        }} 
                    />
                </label>
            </div>
            <div className="counter-buttons">
                <button className='minus' onClick={() => { dispatch(decrement()); playClickSound(); }}>-</button>
                <button className="sound-button" onClick={toggleSound}>
                    {isMuted ? (
                        <i className="fas fa-volume-mute"></i>
                    ) : (
                        <i className="fas fa-volume-up"></i>
                    )}
                </button>
                <button className='res' onClick={handleReset}>Res</button>
            </div>

            <div className="circle-arc">
                {colors.map((color, index) => {
                    const angle = (360 / colors.length) * index;
                    const x = 80 * Math.cos((angle * Math.PI) / 180);
                    const y = 80 * Math.sin((angle * Math.PI) / 180);

                    return (
                        <div
                            className="circle"
                            key={index}
                            style={{
                                backgroundImage: `url(${color})`,
                                backgroundSize: 'cover',
                                transform: `translate(${x}px, ${y}px)`, 
                            }}
                        ></div>
                    );
                })}
            </div>
            <button className="plus" onClick={handleIncrement}>Click</button>
        </div>
    );
};

export default Counter;
