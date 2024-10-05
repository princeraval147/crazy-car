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
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="user" className="hoverEffct">
              <FaUsers /> Users
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="carmanage" className="hoverEffct">
              <FaCar /> Car Management
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="addcar" className="hoverEffct">
              <FaPlus /> Add Car
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="ratingAnalysis" className="hoverEffct">
              <FaChartBar />  Rating Analysis
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidebar;
