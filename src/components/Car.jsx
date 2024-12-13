import React from "react";
import { useNavigate } from "react-router-dom";

const Car = ({
  id,
  image,
  title,
  description,
  price,
  year,
  fuelType,
  mileage,
}) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/carinfo/${id}`); // Proper dynamic URL
  };

  function truncate(description, length) {
    if (description.length > length)
      return description.substring(0, length) + "...";
    else return description;
  }

  return (
    <>
      <div
        style={{
          width: "250px",
          height: "450px",
          overflow: "hidden",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#fff",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={image[0]}
          alt={title}
        />
        <h3 style={{ margin: "16px 0 8px", fontSize: "18px" }}>{title}</h3>
        <p className="aboutCar">Price: {price}</p>
        <p className="aboutCar">Year: {year}</p>
        <p className="aboutCar">Fuel Type: {fuelType}</p>
        <p className="aboutCar">Mileage: {mileage}</p>
        <p className="carDescription">
          {/* {description} */}
          {truncate(description, 50)}
        </p>
        <button
          onClick={handleViewMore}
          style={{
            width: "50%",
            padding: "10px 0",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          View More
        </button>
      </div>
    </>
  );
};

export default Car;
