import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaCar, FaTachometerAlt, FaPlus } from 'react-icons/fa';
import '../../index.css';

const Slidebar = () => {
  return (
    <div className='sidebar'>
      <h3>Admin Panel</h3>
      <nav>
        <ul className='navList'>
          <li className='navItem'>
            <NavLink to="dashboard" className='sidebarName'>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li className='navItem'>
            <NavLink to="user" className='sidebarName'>
              <FaUsers /> Users
            </NavLink>
          </li>
          <li className='navItem'>
            <NavLink to="caradmin" className='sidebarName'>
              <FaCar /> Car Management
            </NavLink>
          </li>
          <li className='navItem'>
            <NavLink to="addcar" className='hoverEffct'>
              <FaPlus /> Add Carp
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidebar;
