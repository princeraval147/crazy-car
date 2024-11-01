import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '/Img/Logo.png';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import MuiProfile from './MuiProfile'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/check', {
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
            // console.error('Error checking login status:', error);
            setIsLoggedIn(false);
        }
    };

    checkLoginStatus();

    const checkAdminStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/check', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setIsAdmin(data.isadmin);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            setIsAdmin(false);
        }
    };
    checkAdminStatus();

    const handlerLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
                method: 'GET',
                credentials: 'include',
            });
            navigate('/login', { replace: true });
        } catch (error) {
            console.error(error);
            navigate('/login', { replace: true });
        } finally {
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
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to='/admin/dashboard' className='link'>Dashboard</NavLink> {/* New Dashboard button */}
                                </li>
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
                <div className="section2">
                    <ul className='links'>
                        {isLoggedIn ? (
                            <>
                                {/* <li>
                                    <button onClick={handlerLogout} className='Btn'>Logout</button>
                                </li> */}
                                <div>
                                    {/* <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Dashboard
                                    </Button> */}

                                    {/* <div className="profileSide">
                                        <CgProfile
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            className='profileIcon'
                                        />
                                        <span className='me'>
                                            Me<FaAngleDown />
                                        </span>
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handlerLogout}>Logout</MenuItem>
                                    </Menu> */}


                                    {/* <MuiProfile /> */}


                                    <div className="profile">

                                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                            {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                                            <Tooltip title="Account settings">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <Avatar sx={{ width: 32, height: 32 }}>
                                                        P
                                                    </Avatar>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&::before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Avatar /> Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Avatar /> My account
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <IoPersonAdd />
                                                </ListItemIcon>
                                                Add another account
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <IoMdSettings size={24} />
                                                </ListItemIcon>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handlerLogout}>
                                                <ListItemIcon>
                                                    <MdLogout size={24} />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>

                                </div>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to='/login' className='hoverEffct'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/signUp' className='Btn'>Sign Up</NavLink>
                                </li>
                            </>
                        )}


                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;
