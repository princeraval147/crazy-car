import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import SimpleImageSlider from "react-simple-image-slider";
import CircularProgress from "@mui/material/CircularProgress";

const CarInfo = () => {
  const { id } = useParams(); // Car ID from the URL
  const [car, setCar] = useState(null); // Car data
  const [rating, setRating] = useState(0); // User's rating for the car
  const [userId, setUserId] = useState(null); // User ID from JWT

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  // Fetch car data and user's existing rating for the car
  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        // Fetch car info by ID, which also includes the user's rating
        const carResponse = await fetch(`http://localhost:5000/cardata/${id}`, {
          // const carResponse = await fetch(
          //   `https://crazycar-backend.onrender.com/cardata/${id}`,
          //   {
          credentials: "include",
        });
        // const carResponse = await fetch(`https://crazycar-backend.onrender.com/cardata/${id}`, { credentials: 'include' });
        const data = await carResponse.json();
        setCar(data.car); // Set car details
        setRating(data.rating); // Set user's existing rating
        // Fetch logged-in user's info (assuming you have an endpoint that returns user details from token)
        const userResponse = await fetch("http://localhost:5000/auth/check", {
          // const userResponse = await fetch(
          //   "https://crazycar-backend.onrender.com/auth/check",
          //   {
          credentials: "include",
        });
        // const userResponse = await fetch('https://crazycar-backend.onrender.com/auth/check', { credentials: 'include' });
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
    return (
      <div className="Loading">
        <p>Please Login to View More Details</p>
        {/* <CircularProgress /> */}
      </div>
    );
  }

  const carName = car.brand + " " + car.model;

  //  Image Slider
  // const images = [
  //   {
  //     url: car.image[0],
  //   },
  //   {
  //     url: car.image[1],
  //   },
  // ];
  const images = car.image.map((url, index) => ({ url }));

  return (
    <>
      <div onClick={handleClick} className="carinfoIinks">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/" className="carInfoLink">
            Home
          </NavLink>
          <NavLink to="/car" className="carInfoLink">
            Car
          </NavLink>
          <Typography sx={{ color: "text.primary" }}>{carName}</Typography>
        </Breadcrumbs>
      </div>
      <div className="carinfoContainer">
        <div className="mainContentContainer">
          <div className="imageContainer">
            {/* <img src={car.image} alt={car.model} className="carinfoImage" /> */}
            <SimpleImageSlider
              width={500}
              height={400}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div className="carDetailsContainer">
            <h2 className="carinfoTitle">{carName}</h2>
            <p className="carinfoPrice">Price: {car.price}</p>
            <p className="carinfoDescription">{car.description}</p>

            {/* Rating system */}
            {userId && (
              <div className="ratingStars">
                <h3>Rate this Car:</h3>
                <ReactStars
                  count={5}
                  isHalf={true}
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
        <div className="additionalInfoContainer">
          <div className="infoItem">
            <strong>Fuel Type:</strong> <span>{car.fuelType}</span>
          </div>
          <div className="infoItem">
            <strong>Mileage:</strong> <span>{car.mileage}</span>
          </div>
          <div className="infoItem">
            <strong>Transmission:</strong> <span>{car.transmission}</span>
          </div>
          <div className="infoItem">
            <strong>Engine Capacity:</strong> <span>{car.engineCapacity}</span>
          </div>
          <div className="infoItem">
            <strong>Seating Capacity:</strong>{" "}
            <span>{car.seatingCapacity} people</span>
          </div>
          <div className="infoItem">
            <strong>Body Type:</strong> <span>{car.bodyType}</span>
          </div>
          <div className="infoItem">
            <strong>Safety Features:</strong>{" "}
            <span>{car.safetyFeatures.join(", ")}</span>
          </div>
          <div className="infoItem">
            <strong>Boot Space:</strong> <span>{car.bootSpace} liters</span>
          </div>
          <div className="infoItem">
            <strong>Additional Features:</strong>{" "}
            <span>{car.features.join(", ")}</span>
          </div>
          <div className="infoItem">
            <strong>Warranty:</strong> <span>{car.warranty}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInfo;
