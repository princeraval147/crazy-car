import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaCar, FaTachometerAlt, FaPlus } from 'react-icons/fa';

const Slidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Panel</h3>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink to="dashboard" style={styles.navLink}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="user" style={styles.navLink}>
              <FaUsers /> Users
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="caradmin" style={styles.navLink}>
              <FaCar /> Car Management
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="addcar" style={styles.navLink}>
              <FaPlus /> Add Car
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#dadada',
    color: 'black',
    padding: '20px',
    minHeight: '100vh', 
    display: 'flex',
    flexDirection: 'column',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    overflowY: 'auto',  
  },
  navItem: {
    margin: '20px 0',
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
  },
};

export default Slidebar;
