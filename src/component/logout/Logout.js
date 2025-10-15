// /src/containers/LogoutContainer.js

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Custom auth context

function LogoutContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout, logoutFailure } = useAuth(); // Access auth functions and state

  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log('logout successfull')
        await logout(); // Call logout function from context
        navigate('/login'); // Redirect to login page after successful logout
      } catch (err) {
        dispatch(logoutFailure('Logout failed. Please try again.'));
        console.error('Logout failed', err);
      }
    };

    performLogout(); // Automatically call logout when component is rendered
  }, [dispatch, navigate, logout, logoutFailure]);

  return null; // No UI is rendered, only logout action is triggered
}

export default LogoutContainer;
