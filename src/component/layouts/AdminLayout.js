// AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-content">
        <main>
          {/* This is where child routes will be rendered */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;