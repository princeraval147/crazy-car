import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '/Img/Logo.png';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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

    const handlerLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
                // await fetch('https://crazycar-backend.onrender.com/logout', {
                method: 'GET',
                credentials: 'include',
            });
            navigate('/login', { replace: true });
        } catch (error) {
            console.error(error);
            navigate('/login', { replace: true });
        }
        finally {
            console.log("Click Logout");
            setIsLoggedIn(false);
            navigate('/login');
        }
    }

    return (
        <>
            <div className="header">
                <div className="section1">
                    <h1>
                        <NavLink className='logo' to='/'>
                            <img src={Logo} className='LogoImg' alt="" />
                        </NavLink>
                    </h1>
                </div>
                <div>
                    <div className="links">
                        <li>
                            <NavLink to='/' className='link'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/about' className='link'>About</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className='link'>Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to='/car' className='link'>Car</NavLink>
                        </li>
                    </div>
                </div>
                <div className="section2">
                    <ul className='links'>
                        {isLoggedIn === true ? (
                            <li>
                                <button onClick={handlerLogout} className='Btn'>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to='/login' className='Btn'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/signUp' className='Btn'>Sign Up</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div >
        </>
    )
}

export default Header
