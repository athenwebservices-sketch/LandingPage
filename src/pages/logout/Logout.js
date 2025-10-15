import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming the AuthContext is in the correct path

function LogoutSuccess() {
  const { logout } = useAuth(); // Use logout function from context
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout and clear all data only once
    logout(); // This will clear token and user from localStorage and axios headers

    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3 seconds delay

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Logout Successful</h1>
      <p>You have been logged out successfully. Redirecting to the login page...</p>
    </div>
  );
}

export default LogoutSuccess;
