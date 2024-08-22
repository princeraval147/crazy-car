import React from 'react';
import { Outlet } from 'react-router-dom';
import Slidebar from './Slidebar';

const Admin = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Slidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
