import React, { useEffect, useState } from "react";
import "../../index.css";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/users"
        // );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          // const response = await fetch(
          //   `https://crazycar-backend.onrender.com/users/${userId}`,
          //   {
          method: "DELETE",
        });
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== userId));
          alert("User deleted successfully.");
        } else {
          alert("Error deleting user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div className="userContainer">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.isadmin.toString()}</td>
                <td>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
