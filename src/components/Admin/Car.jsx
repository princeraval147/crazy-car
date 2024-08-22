import React from 'react';

function Car({ image, title, description,price }) {
    return (
        <div style={{
            width: "250px",
            height: "350px",
            overflow: "hidden",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            textAlign: "center",
            cursor: "pointer"
        }}
        >
            <img style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px"}} src={image} alt={title} />
            <h3 style={{ margin: "16px 0 8px", fontSize: "18px" }}>{title}</h3>
            <p style={{ margin: "16px 0 8px",fontSize: "14px", color: "#555" }}>{price}</p>

            <p style={{ margin: "16px 0 8px",fontSize: "14px", color: "#555" }}>{description}</p>
        </div>
    );
}

export default Car;
