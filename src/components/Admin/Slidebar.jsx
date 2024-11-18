import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaCar, FaTachometerAlt, FaPlus, FaChartBar } from 'react-icons/fa';

const Slidebar = () => {
  return (
    <div className="sidebar">
      <h3 align='center'>Admin Panel</h3>
      <hr />
      <nav>
        <ul className="navList">
          <li className="navItem">
            <NavLink to="dashboard" className="hoverEffct">
              <FaTachometerAlt /> <span className='slidebarItemName'> Dashboard </span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="user" className="hoverEffct">
              <FaUsers /> <span className='slidebarItemName'> Users </span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="addcar" className="hoverEffct">
              <FaPlus /> <span className='slidebarItemName'> Add Car </span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="carmanage" className="hoverEffct">
              <FaCar /> <span className='slidebarItemName'> Car Management </span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="ratingAnalysis" className="hoverEffct">
              <FaChartBar />  <span className='slidebarItemName'> Rating Analysis </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidebar;
