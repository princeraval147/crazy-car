import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

function CarRatingAnalysis() {
  const [topCars, setTopCars] = useState([]);
  const [carRatingsWithPercentages, setCarRatingsWithPercentages] = useState(
    []
  );

  useEffect(() => {
    const fetchCarRatingAnalysis = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/car-rating-analysis"
        );
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/car-rating-analysis"
        // );
        const data = await response.json();
        setTopCars(data.topCars);
        setCarRatingsWithPercentages(data.carRatingsWithPercentages);
      } catch (error) {
        console.error("Error fetching car rating analysis:", error);
      }
    };
    fetchCarRatingAnalysis();
  }, []);

  //  Chart
  const data01 = [
    { name: "Car A", value: 400 },
    { name: "Car B", value: 300 },
    { name: "Car C", value: 300 },
  ];
  const formattedTopCars = topCars.map((car) => ({
    name: `${car.brand} ${car.model}`,
    value: car.totalRatings,
  }));

  return (
    <div className="RatingContainer">
      <h1 align="center" className="cra">
        Car Rating Analysis
      </h1>
      <h2 align="center">Top 3 Cars</h2>
      <div className="topCars">
        <PieChart width={350} height={400} className="PieChart">
          <Pie
            dataKey="value"
            isAnimationActive={false}
            // data={data01}
            data={formattedTopCars}
            // cx={200}
            // cy={200}
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <section className="topCarsSection">
          <div className="topCarsContainer">
            {topCars.map((car, index) => (
              <div key={car.carId} className="topCarItem">
                <h3>
                  {index + 1}. {car.brand} {car.model}
                </h3>
                <p>Average Rating: {car.averageRating.toFixed(1)} / 5</p>
                <p>Total Ratings: {car.totalRatings}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="allCarsSection">
        <h2>All Cars Rating in Percentage</h2>
        <br />
        <table className="RatingTable" border={2}>
          <thead>
            <tr>
              <th className="ratingTblHeading">Car</th>
              <th className="ratingTblHeading">Total Ratings</th>
              <th className="ratingTblHeading">Rating Percentage</th>
            </tr>
          </thead>
          <tbody>
            {carRatingsWithPercentages.map((car) => (
              <tr key={car.carId}>
                <td>
                  {car.brand} {car.model}
                </td>
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
