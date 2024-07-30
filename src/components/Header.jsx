import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '/Img/Logo.png';

const Header = () => {

    const [search, setSearch] = useState(null);
    console.log(search);

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
                <div className="search">
                    <div class="wrap-input-18">
                        <div class="search">
                            <div>
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search . . ."
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section2">

                    <ul className='links'>
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
                            <NavLink to='/login' className='link'>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/signUp' className='link'>Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    )
}

export default Header
