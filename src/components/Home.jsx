import React, { useEffect, useState } from 'react'
import styles from "./Design.module.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
import img4 from '/Img/bgCar.jpg'
import img2 from '/Img/KIA.png'
import img3 from '/Img/CarPic.avif'

const Home = () => {

    const spanStyle = {
        padding: '20px',
        // background: '#fff',
        color: '#fff'
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '80vh'
    }

    const slideImages = [
        {
            url: img4,
            caption: 'Slide 1'
        },
        {
            url: img3,
            caption: 'Slide 2'
        },
        {
            url: img2,
            caption: 'Slide 3'
        },
    ];

    // const images = [
    //     img1,
    //     img2,
    //     img3,
    //     img4
    // ];


    const Typewriter = ({ text, delay, infinite }) => {
        const [currentText, setCurrentText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            let timeout;

            if (currentIndex <= text.length) {
                timeout = setTimeout(() => {
                    setCurrentText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, delay);

            } else if (infinite) { // ADD THIS CHECK
                setCurrentIndex(0);
                setCurrentText('');
            }

            return () => clearTimeout(timeout);
        }, [currentIndex, delay, infinite, text]);

        return <span>{currentText}</span>;
    };



    return (
        <>
            {/* SlideShow */}

            <div className="slide-container">
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                <span>
                                    <h1 style={spanStyle}>
                                        Welcome to <Typewriter text="CrazyCar Official Website" delay={200} />
                                    </h1>
                                </span>
                                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>

            {/* <-------------------------------  Animation Content ------------------------------> */}
            <div className={styles.container}>
                <div className={styles.circles}>
                    <div className={styles.mainCircle}>
                        <div className={styles.innerCircleWrapper}>
                            <div className={styles.innerCircleAnim} />
                        </div>
                        <div className={styles.firstCircle}>
                            <div className={styles.dot1}></div>
                        </div>
                        <div className={styles.secondCircle}>
                            <div className={styles.dot2}></div>
                            <div className={styles.dot3}></div>
                        </div>
                        <div className={styles.thirdCircle}>
                            <div className={styles.dot4}></div>
                        </div>

                        <div className={styles.fourthCircle}>
                            <div className={styles.anii}>
                                <p className={styles.animationText}>10+</p>
                                <p className={styles.animationContent}>Years of Excellence</p>
                            </div>
                            <div className={styles.anii}>
                                <p className={styles.animationText} style={{ color: "#02BCD2" }}>
                                    100+
                                </p>
                                <p className={styles.animationContent}>Happy Clients</p>
                            </div>
                            <div className={styles.anii}>
                                <p className={styles.animationText} style={{ color: "#7ED602" }}>
                                    25+
                                </p>
                                <p className={styles.animationContent}>CAR EXPERTS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 0 }}>
                    <div className={styles.titles}>
                        <div className={styles.mainTitle}>INNOVATION</div>
                        <div className={styles.both}>
                            <div className={styles.centerTitle}>EXPERTISE EXCELLENCE</div>
                            <div className={styles.lastTitle} style={{ marginLeft: 15 }}>
                                RESULTS
                            </div>
                        </div>
                    </div>
                    <div className={styles.mixDiv}>
                        <div className={styles.Circles}>
                            <div className={styles.mainCircle}>
                                <div className={styles.innerCircleWrapper}>
                                    <div className={styles.innerCircleAnim} />
                                </div>
                                <div className={styles.firstCircle}>
                                    <div className={styles.dot1}></div>
                                </div>
                                <div className={styles.secondCircle}>
                                    <div className={styles.dot2}></div>
                                    <div className={styles.dot3}></div>
                                </div>
                                <div className={styles.thirdCircle}>
                                    <div className={styles.dot4}></div>
                                </div>

                                <div className={styles.fourthCircle}>
                                    <div className={styles.anii}>
                                        <p className={styles.animationText}>10+</p>
                                        <p className={styles.animationContent}>Years of Excellence</p>
                                    </div>
                                    <div className={styles.anii}>
                                        <p
                                            className={styles.animationText}
                                            style={{ color: "#02BCD2" }}
                                        >
                                            100+
                                        </p>
                                        <p className={styles.animationContent}>Happy Clients</p>
                                    </div>
                                    <div className={styles.anii}>
                                        <p
                                            className={styles.animationText}
                                            style={{ color: "#7ED602" }}
                                        >
                                            25+
                                        </p>
                                        <p className={styles.animationContent}>CAR EXPERTS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.desc}>
                            <p>
                                CrazyCar brings a complete range of new cars in 2024 in India with prices. You can search cars by applying filters such as by price, by bodytype, by brand, by seating capacity & more. Also, stay updated with upcoming cars, electric cars in India, compare cars in your price range.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Design /> */}
        </>
    )
}

export default Home