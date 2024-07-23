import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '/Img/Logo.png';

const Header = () => {
    return (
        <>
            <div className="header">
                <h1>
                    <NavLink className='logo' to='/'>
                        <img src={Logo} className='LogoImg' alt="" />
                    </NavLink>
                </h1>
                <ul className='links'>
                    <li>
                        <NavLink to='/' className='link'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className='link'>Contact Us</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' className='link'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/signUp' className='link'>Sign Up</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header
