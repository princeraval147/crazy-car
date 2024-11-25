import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '/Img/Logo.png';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import LoginModal from './LoginModal';
import Modal from "@mui/material/Modal";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    // For Login Modal
    const [loginOpen, loginSetOpen] = React.useState(false);
    const handleOpen = () => loginSetOpen(true);
    const loginClose = () => loginSetOpen(false);

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // For Profile Drop Down
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
            // const response = await fetch('http://localhost:5000/auth/check', {
            const response = await fetch('https://crazycar-backend.onrender.com/auth/check', {
                // method: 'GET',
                method: 'POST',
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

    const checkAdminStatus = async () => {
        try {
            // const response = await fetch('http://localhost:5000/admin/check', {
            const response = await fetch('https://crazycar-backend.onrender.com/admin/check', {
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
            // await fetch('http://localhost:5000/logout', {
            await fetch('https://crazycar-backend.onrender.com/logout', {
                method: 'GET',
                credentials: 'include',
            });
            // navigate('/login', { replace: true });
            navigate('/', { replace: true }); // For Login Modal
        } catch (error) {
            console.error(error);
            // navigate('/login', { replace: true });
            navigate('/', { replace: true }); // For Login Modal
        } finally {
            console.log("Click Logout");
            setIsLoggedIn(false);
            // navigate('/login');
            navigate('/'); // For Login Modal
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
                                    <div className="profile">
                                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                            <Tooltip title="Account settings">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <Avatar sx={{ width: 40, height: 40 }}>
                                                        {
                                                            isAdmin ? "A" : "U"
                                                        }
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
                                                <Avatar />
                                                <NavLink to='#' style={{ color: "#212121" }}>
                                                    Profile
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Avatar />
                                                <NavLink to='#' style={{ color: "#212121" }}>
                                                    My account
                                                </NavLink>
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <IoPersonAdd />
                                                </ListItemIcon>
                                                <NavLink to='/signUp' style={{ color: "#212121" }}>
                                                    Add another account
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <IoMdSettings size={24} />
                                                </ListItemIcon>
                                                <NavLink to='#' style={{ color: "#212121" }}>
                                                    Settings
                                                </NavLink>
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
                                    {/* <NavLink to='/login' className='hoverEffct'>Login</NavLink> */}
                                    <span onClick={handleOpen} className='hoverEffct'>
                                        Login
                                    </span>
                                    <Modal
                                        open={loginOpen}
                                        onClose={loginClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <LoginModal loginClose={loginClose} />
                                    </Modal>
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

export default Header;
