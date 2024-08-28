import React from 'react'
import Slidebar from './Slidebar';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <>
            <div className="adminPanel">
                <Slidebar />
                <div className="admin">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminPanel
