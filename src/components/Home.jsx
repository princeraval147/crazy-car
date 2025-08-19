import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
import img1 from '/Img/4K.jpg'
import img2 from '/Img/4k2.jpg'
import img3 from '/Img/MB.jpg'
import { NavLink } from 'react-router-dom';

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


    const [topCars, setTopCars] = useState([]);
    const fetchCarRatingAnalysis = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/car-rating-analysis"
            );
            const data = await response.json();
            setTopCars(data.topCars);
        } catch (error) {
            console.error("Error fetching car rating analysis:", error);
        }
    };
    useEffect(() => {
        fetchCarRatingAnalysis();
    }, []);


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

            {/* ------------------------------------------------------------------------- */}
            <div className="homepage-content">
                <section className="featured-cars">
                    <h2>Featured Cars This Week</h2>
                    <div className="car-grid">
                        {
                            topCars.map((car) => (
                                <div key={car.carId} className='car-card'>
                                    <h3>{car.brand} {car.model}</h3>
                                    <p>₹{car.price} - {car.year} Model</p>
                                </div>
                            ))
                        }
                        {/* <div className="car-card">
                            <h3>🚗 Tata Nexon EV</h3>
                            <p>₹14.7L – 2024 Model</p>
                        </div>
                        <div className="car-card">
                            <h3>🚙 Hyundai Creta</h3>
                            <p>₹13.2L – 2023 Model</p>
                        </div>
                        <div className="car-card">
                            <h3>🚘 Maruti Fronx</h3>
                            <p>₹9.5L – 2024 Model</p>
                        </div> */}
                    </div>
                    <NavLink to="/car" className="view-all-btn">View All Cars →</NavLink>
                </section>

            </div>



        </>
    )
}

export default Home