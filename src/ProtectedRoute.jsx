import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {

    const Navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/check', {
                // const response = await fetch('https://crazycar-backend.onrender.com/auth/check', {
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
    // console.log("User Login = ", isLoggedIn);


    return isLoggedIn === true ? <Outlet /> : Navigate('/login')
}

export default ProtectedRoute
