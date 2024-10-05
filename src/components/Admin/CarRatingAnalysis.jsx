import React, { useEffect, useState } from 'react';

function CarRatingAnalysis() {
    const [topCars, setTopCars] = useState([]);
    const [carRatingsWithPercentages, setCarRatingsWithPercentages] = useState([]);

    useEffect(() => {
        const fetchCarRatingAnalysis = async () => {
            try {
                const response = await fetch('http://localhost:5000/car-rating-analysis');
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
        <div style={styles.container}>
            <h1 align="center" style={styles.cra}>Car Rating Analysis</h1>

            <section style={styles.topCarsSection}>
                <h2>Top 3 Cars</h2>
                <div style={styles.topCarsContainer}>
                    {topCars.map((car, index) => (
                        <div key={car.carId} style={styles.topCarItem}>
                            <h3>{index + 1}. {car.brand} {car.model}</h3>
                            <p>Average Rating: {car.averageRating.toFixed(1)} / 5</p>
                            <p>Total Ratings: {car.totalRatings}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={styles.allCarsSection}>
                <h2>All Cars Rating in Percentage</h2>
                <table style={styles.table} border={2}>
                    <thead>
                        <tr >
                            <th style={styles.tableHeading}>Car</th>
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

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    cra: {
        borderBottom: "2px solid gray",
        marginBottom: "30px"
    },
    topCarsSection: {
        marginBottom: '50px',
    },
    topCarsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    topCarItem: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f4f4f4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '250px',
    },
    allCarsSection: {
        marginTop: '40px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableHeading: {
        padding: "15px",
    },
    tableCell: {
        padding: '10px',
        textAlign: 'left',
    }
};

export default CarRatingAnalysis;