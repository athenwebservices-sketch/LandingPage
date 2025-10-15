import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../component/navbar/Navbar';
import LoginForm from '../../component/loginForm/LoginForm';

function LoginContainer() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error, user } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const googleLoaded = useRef(false);

  // ✅ Load Google SDK dynamically
  useEffect(() => {
    if (googleLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('✅ Google SDK loaded');
      googleLoaded.current = true;
      initializeGoogleSignIn();
    };

    script.onerror = () => console.error('❌ Failed to load Google SDK');
    document.body.appendChild(script);
  }, []);

  // ✅ Initialize Google SDK after loading
  const initializeGoogleSignIn = () => {
    const clientId =
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_CLIENT_ID) ||
      process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error('❌ Google Client ID missing. Check your .env file.');
      alert('Google Client ID missing. Please check your .env file.');
      return;
    }

    if (!window.google || !window.google.accounts) {
      console.error('❌ Google SDK not ready.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleResponse,
      auto_select: false,
    });

    console.log('✅ Google initialized with Client ID:', clientId);
  };

  // ✅ Handle Google login button click
  const loginWithGoogle = () => {
    if (!googleLoaded.current || !window.google?.accounts?.id) {
      alert('Google SDK not loaded yet. Please refresh and try again.');
      return;
    }

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.warn('⚠️ Google One Tap not displayed:', notification.getNotDisplayedReason());
      }
    });
  };

  // ✅ Handle Google login response and send to backend
  const handleGoogleResponse = async (response) => {
    try {
      const token = response?.credential;
      if (!token) {
        alert('Google login failed: No token received.');
        return;
      }

      console.log('✅ Google token received:', token);

      // 🔥 Send token to your backend (localhost:5000)
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('❌ Backend Google login failed:', data);
        alert(data.message || 'Google login failed on server.');
        return;
      }

      console.log('✅ Google login success:', data);

      // You can optionally store token & user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert(`Welcome ${data.user?.name || 'User'}!`);
      navigate('/');
    } catch (err) {
      console.error('❌ Google login failed:', err);
      alert('Google login failed. Please try again.');
    }
  };

  // ✅ Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const navigateToForgotPassword = () => navigate('/forgot-password');
  const navigateToRegister = () => navigate('/register');

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-wrapper">
          <h2 className="login-title">Sign in to your account</h2>

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

          <div className="google-login-container">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="google-login-btn"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="google-icon"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginContainer;
