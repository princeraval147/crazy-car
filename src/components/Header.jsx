import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '/Img/Logo.png';

const Header = () => {

    // const [search, setSearch] = useState(null);
    // console.log(search);

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
                        <li>
                            <NavLink to='/login' className='headerLogin'>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/signUp' className='Btn'>Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    )
}

export default Header
