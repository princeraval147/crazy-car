import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className="errorPage">
                <h1>404 Page Not Found...!!</h1>
                <p>Go to <NavLink className='link' to='/' >Home Page</NavLink></p>
            </div>
        </>
    )
}

export default Error