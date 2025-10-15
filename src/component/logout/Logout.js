// /src/containers/LogoutSuccess.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3 seconds delay

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Logout Successful</h1>
      <p>You have been logged out successfully. Redirecting to the login page...</p>
    </div>
  );
}

export default LogoutSuccess;
