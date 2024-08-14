import React from 'react'
import Design from './Design'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
// import img1 from '../../public/Img/Car2'
import img4 from '/Img/bgCar.jpg'
import img2 from '/Img/KIA.png'
import img3 from '/Img/CarPic.avif'

const Home = () => {

    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
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
            url: img2,
            caption: 'Slide 1'
        },
        {
            url: img3,
            caption: 'Slide 2'
        },
        {
            url: img4,
            caption: 'Slide 3'
        },
    ];

    // const images = [
    //     img1,
    //     img2,
    //     img3,
    //     img4
    // ];

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
            <Design />
        </>
    )
}

export default Home