import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="header">
                <h1>
                    <NavLink className='logo' to='/'>CrazyCar</NavLink>
                </h1>
                <ul className='links'>
                    <li>
                        <NavLink to='/' className='link'>Home</NavLink>
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
