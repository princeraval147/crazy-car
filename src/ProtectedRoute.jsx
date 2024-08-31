import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import Admin from './components/Admin/AdminPanel'

const ProtectedRoute = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('http://localhost:5000/users');
                const response = await fetch('https://crazycar-backend.onrender.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const checkLoginStatus = async () => {
        try {
            // const response = await fetch('http://localhost:5000/auth/check', {
            const response = await fetch('https://crazycar-backend.onrender.com/auth/check', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsLoggedIn(false);
        }

    };

    checkLoginStatus();
    if (isLoggedIn == false) {
        console.log("Please Login To Use Admin Panel");
        navigate('/login');
    }
    else if (isLoggedIn == true) {
        // console.log("User Is Already Login");
        const isAdmin = users.map(user => user.isadmin);
        const email = users.map(user => user.email);
        console.log("email =", email, "Admin = ", isAdmin);
    }


    const isAdmin = users.map(user => user.isadmin);
    console.log(isAdmin)
    const userIsAdmin = isAdmin.includes(true);

    return isAdmin ? <Outlet /> : <Navigate to={"/"} />
}

export default ProtectedRoute
