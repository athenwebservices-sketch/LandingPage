import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Custom auth context
import Navbar from '../../component/navbar/Navbar';
import LoginForm from '../../component/loginForm/LoginForm';


function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error, loginFailure, user } = useAuth(); // Access auth functions and state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
  if (isAuthenticated) {
    // You can safely access user here after the state is updated
    console.log(user); // This should print the user now
    alert(`Welcome ${user?.name || 'User'}`); // Show welcome message with the user name
    
  }
}, [isAuthenticated, user]); // Listen to changes in isAuthenticated or user

  const togglePassword = () => setShowPassword(!showPassword);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;

    // Validation
    if (!email || !password) {
      dispatch(loginFailure('Please fill in all fields.'));
      return;
    }

    try {
      await login(email, password); // Call login function from context
    } catch (err) {
      // Error is already handled in context, but if needed, you can dispatch it here too.
      console.error('Login failed', err);
    }
  };

  // Handle login with Google
  const loginWithGoogle = () => {
    if (!window.google || !window.google.accounts?.id) {
      dispatch(loginFailure('Google SDK not loaded. Please try again.'));
      return;
    }
    window.google.accounts.id.prompt();
  };

  // Navigation helpers
  const navigateToForgotPassword = () => navigate('/forgot-password');
  const navigateToRegister = () => navigate('/register');

  return (
    <>
    <Navbar></Navbar>
    <LoginForm
      loginForm={loginForm}
      loading={loading}
      errorMessage={error}
      showPassword={showPassword}
      onChange={onChange}
      togglePassword={togglePassword}
      onSubmit={onSubmit}
      loginWithGoogle={loginWithGoogle}
      navigateToForgotPassword={navigateToForgotPassword}
      navigateToRegister={navigateToRegister}
    />
    </>
    
  );
}

export default LoginContainer;
