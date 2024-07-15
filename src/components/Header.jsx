import React from 'react'
import { NavLink } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Header = () => {

    const Cars = [
        'Hyundai',
        'Toyota',
        'Suzuki',
        'Tata',
    ]
    return (
        <>
            <div className="header">
                <h1>CrazyCar</h1>
                <Autocomplete
                    disablePortal
                    id=""
                    options={Cars}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Cars" />}
                />
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
