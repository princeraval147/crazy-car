import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
import img1 from '/Img/4K.jpg'
import img2 from '/Img/4k2.jpg'
import img3 from '/Img/MB.jpg'

const Home = () => {

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: "center",
        height: '80vh'
    }

    const slideImages = [
        {
            url: img1,
            caption: 'Slide 1'
        },
        {
            url: img2,
            caption: 'Slide 2'
        },
        {
            url: img3,
            caption: 'Slide 3'
        },
    ];

    return (
        <>
            {/* SlideShow */}

            <div className="slide-container">
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>

            {/* <---------------------------  Animation Content ------------------------------> */}

            <div className="animationContainer">
                <div className="circles">
                    <div className="mainCircle">
                        <div className="innerCircleWrapper">
                            <div className="innerCircleAnim" />
                        </div>
                        <div className="firstCircle">
                            <div className="dot1"></div>
                        </div>
                        <div className="secondCircle">
                            <div className="dot2"></div>
                            <div className="dot3"></div>
                        </div>
                        <div className="thirdCircle">
                            <div className="dot4"></div>
                        </div>

                        <div className="fourthCircle">
                            <div className="anii">
                                <p className="animationText">10+</p>
                                <p className="animationContent">Years of Excellence</p>
                            </div>
                            <div className="anii">
                                <p className="animationText" style={{ color: "#02BCD2" }}>
                                    100+
                                </p>
                                <p className="animationContent">Happy Clients</p>
                            </div>
                            <div className="anii">
                                <p className="animationText" style={{ color: "#7ED602" }}>
                                    25+
                                </p>
                                <p className="animationContent">CAR EXPERTS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 0 }}>
                    <div className="titles">
                        <div className="mainTitle">INNOVATION</div>
                        <div className="both">
                            <div className="centerTitle">EXPERTISE EXCELLENCE</div>
                            <div className="lastTitle" style={{ marginLeft: 15 }}>
                                RESULTS
                            </div>
                        </div>
                    </div>
                    <div className="mixDiv">
                        <div className="Circles">
                            <div className="mainCircle">
                                <div className="innerCircleWrapper">
                                    <div className="innerCircleAnim" />
                                </div>
                                <div className="firstCircle">
                                    <div className="dot1"></div>
                                </div>
                                <div className="secondCircle">
                                    <div className="dot2"></div>
                                    <div className="dot3"></div>
                                </div>
                                <div className="thirdCircle">
                                    <div className="dot4"></div>
                                </div>

                                <div className="fourthCircle">
                                    <div className="anii">
                                        <p className="animationText">10+</p>
                                        <p className="animationContent">Years of Excellence</p>
                                    </div>
                                    <div className="anii">
                                        <p
                                            className="animationText"
                                            style={{ color: "#02BCD2" }}
                                        >
                                            100+
                                        </p>
                                        <p className="animationContent">Happy Clients</p>
                                    </div>
                                    <div className="anii">
                                        <p
                                            className="animationText"
                                            style={{ color: "#7ED602" }}
                                        >
                                            25+
                                        </p>
                                        <p className="animationContent">CAR EXPERTS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="desc">
                            <p>
                                CrazyCar brings a complete range of new cars in 2024 in India with prices. You can search cars by applying filters such as by price, by bodytype, by brand, by seating capacity & more. Also, stay updated with upcoming cars, electric cars in India, compare cars in your price range.
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home