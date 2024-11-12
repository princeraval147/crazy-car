import React, { useEffect, useState } from 'react';

function CarRatingAnalysis() {
    const [topCars, setTopCars] = useState([]);
    const [carRatingsWithPercentages, setCarRatingsWithPercentages] = useState([]);

    useEffect(() => {
        const fetchCarRatingAnalysis = async () => {
            try {
                const response = await fetch('http://localhost:5000/car-rating-analysis');
                // const response = await fetch('https://crazycar-backend.onrender.com/car-rating-analysis');
                const data = await response.json();
                setTopCars(data.topCars);
                setCarRatingsWithPercentages(data.carRatingsWithPercentages);
            } catch (error) {
                console.error('Error fetching car rating analysis:', error);
            }
        };
        fetchCarRatingAnalysis();
    }, []);

    return (
        <div className='RatingContainer'>
            <h1 align="center" className='cra'>Car Rating Analysis</h1>

            <section className='topCarsSection'>
                <h2>Top 3 Cars</h2>
                <div className='topCarsContainer'>
                    {topCars.map((car, index) => (
                        <div key={car.carId} className='topCarItem'>
                            <h3>{index + 1}. {car.brand} {car.model}</h3>
                            <p>Average Rating: {car.averageRating.toFixed(1)} / 5</p>
                            <p>Total Ratings: {car.totalRatings}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='allCarsSection'>
                <h2>All Cars Rating in Percentage</h2>
                <table className='RatingTable' border={2}>
                    <thead>
                        <tr >
                            <th className='RatingTableHeading'>Car</th>
                            <th>Total Ratings</th>
                            <th>Rating Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carRatingsWithPercentages.map(car => (
                            <tr key={car.carId}>
                                <td>{car.brand} {car.model}</td>
                                <td>{car.totalRatings}</td>
                                <td>{car.ratingPercentage.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}


export default CarRatingAnalysis;