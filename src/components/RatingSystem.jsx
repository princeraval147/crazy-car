import React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const RatingSystem = () => {
  const { id } = useParams(); // Car ID from the URL
  const [car, setCar] = useState(null); // Car data
  const [rating, setRating] = useState(0); // User's rating for the car
  const [userId, setUserId] = useState(null); // User ID from JWT

  // Fetch car data and user's existing rating for the car
  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        // Fetch car info by ID, which also includes the user's rating
        const carResponse = await fetch(`http://localhost:5000/cardata/${id}`, {
          credentials: "include",
        });
        // const carResponse = await fetch(
        //   `https://crazycar-backend.onrender.com/cardata/${id}`,
        //   { credentials: "include" }
        // );
        const data = await carResponse.json();
        setCar(data.car); // Set car details
        setRating(data.rating); // Set user's existing rating

        // Fetch logged-in user's info (assuming you have an endpoint that returns user details from token)
        // const userResponse = await fetch("http://localhost:5000/auth/check", {
        //   credentials: "include",
        // });
        const userResponse = await fetch(
          "https://crazycar-backend.onrender.com/auth/check",
          { credentials: "include" }
        );
        const userData = await userResponse.json();

        if (userData && userData.isLoggedIn) {
          setUserId(userData.userId); // Set user ID from the response
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCarInfo();
  }, [id]);

  // Handle star rating click
  const onStarClick = async (newRating) => {
    setRating(newRating); // Set the selected rating immediately

    try {
      const response = await fetch("http://localhost:5000/rate", {
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/rate",
        //   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId: id, userId, rating: newRating }),
        credentials: "include", // Ensure cookies (JWT token) are included
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message);
      } else {
        alert("Rating submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // If the car data is not yet loaded, show a loading message
  if (!car) {
    return <div>Loading car details...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContentContainer}>
        <div style={styles.imageContainer}>
          <img src={car.image} alt={car.model} style={styles.image} />
        </div>
        <div style={styles.carDetailsContainer}>
          <h2 style={styles.title}>
            {car.brand} {car.model}
          </h2>
          <p style={styles.price}>Price: {car.price}</p>
          <p style={styles.description}>{car.description}</p>

          {/* Rating system */}
          {userId && (
            <div style={styles.ratingContainer}>
              <h3>Rate this Car:</h3>
              <ReactStars
                count={5}
                value={rating} // Display the existing rating
                onChange={onStarClick} // Allow user to change the rating
                size={40}
                activeColor="#ffd700"
              />
            </div>
          )}
          {!userId && <p>Please log in to rate this car.</p>}
        </div>
      </div>

      {/* Additional car info */}
      <div style={styles.additionalInfoContainer}>
        <div style={styles.infoItem}>
          <strong>Fuel Type:</strong> <span>{car.fuelType}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Mileage:</strong> <span>{car.mileage}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Transmission:</strong> <span>{car.transmission}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Engine Capacity:</strong> <span>{car.engineCapacity}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Seating Capacity:</strong>{" "}
          <span>{car.seatingCapacity} people</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Body Type:</strong> <span>{car.bodyType}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Safety Features:</strong>{" "}
          <span>{car.safetyFeatures.join(", ")}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Boot Space:</strong> <span>{car.bootSpace} liters</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Additional Features:</strong>{" "}
          <span>{car.features.join(", ")}</span>
        </div>
        <div style={styles.infoItem}>
          <strong>Warranty:</strong> <span>{car.warranty}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "3px solid grey",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "40px auto",
    width: "85%",
    maxWidth: "1200px",
    boxSizing: "border-box",
    minHeight: "600px",
  },
  mainContentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    maxWidth: "500px",
    maxHeight: "500px",
    borderRadius: "8px",
  },
  carDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginBottom: "30px",
  },
  additionalInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "40px",
    width: "100%",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#f1f1f1",
    padding: "15px",
    borderRadius: "4px",
    width: "80%",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
};

export default RatingSystem;
