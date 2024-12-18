import React, { useEffect, useState } from "react";
import { FaUsers, FaCar } from "react-icons/fa";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const userResponse = await fetch(
          "http://localhost:5000/api/users/count"
        );
        // const userResponse = await fetch(
        //   "https://crazycar-backend.onrender.com/api/users/count"
        // );
        const userData = await userResponse.json();
        setUserCount(userData.totalUsers);

        // Fetch total car data
        const carResponse = await fetch("http://localhost:5000/api/cars/count");
        // const carResponse = await fetch(
        //   "https://crazycar-backend.onrender.com/api/cars/count"
        // );
        const carData = await carResponse.json();
        setCarCount(carData.totalCars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <FaUsers size={50} color="#4CAF50" />
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaCar size={50} color="#2196F3" />
          <h3>Total Car Data</h3>
          <p>{carCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
