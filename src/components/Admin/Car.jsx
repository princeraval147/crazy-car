import React from 'react';
import { useNavigate } from 'react-router-dom';

function Car({ id, image, title, description, price, year, fuelType, mileage }) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/carinfo/${id}`); // Proper dynamic URL
    };

    return (
        <div style={{
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
            cursor: "pointer"
        }}>
            <img style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} src={image} alt={title} />
            <h3 style={{ margin: "16px 0 8px", fontSize: "18px" }}>{title}</h3>
            <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#555" }}>Price: {price}</p>
            <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#555" }}>Year: {year}</p>
            <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#555" }}>Fuel Type: {fuelType}</p>
            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#555" }}>Mileage: {mileage}</p>
            <p style={{
                margin: "0 0 16px",
                fontSize: "14px",
                color: "#555",
                flexGrow: 1,
                overflow: "hidden"
            }}>
                {description}
            </p>
            <button
                onClick={handleViewMore}
                style={{
                    width: "100%",
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
    );
}

export default Car;
