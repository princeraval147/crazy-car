import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/check", {
          // const response = await fetch(
          //   "https://crazycar-backend.onrender.com/admin/check",
          //   {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isadmin);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="Loading">
        <CircularProgress />
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/error" replace />;
};

export default ProtectedRoute;
