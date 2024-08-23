import React, { useEffect, useState } from 'react';
import './user.css';


const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        // const response = await fetch('https://crazycar-backend.onrender.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-container">
      {users.map(user => (
        <div className="user-card" key={user._id}>
          <h3>User Data</h3>
          <p><strong>Name:</strong> {user.userName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isadmin.toString()}</p>        </div>
      ))}
    </div>
  );
};

export default User;
