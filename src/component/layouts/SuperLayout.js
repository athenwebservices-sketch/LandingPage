import React from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet from react-router-dom
import Navbar from '../navbar/Navbar';  // Assuming you have a Navbar component for Super User

const SuperLayout = () => {  // Remove children prop since we're using Outlet
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />  {/* Renders child routes using Outlet component */}
      </main>
    </div>
  );
};

export default SuperLayout;