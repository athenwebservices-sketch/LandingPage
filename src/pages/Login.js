import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const backendBase = ''; // e.g., http://localhost:5000

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setLoginForm(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }

    loadGoogleScript()
      .then(() => initializeGoogleSignIn())
      .catch(err => console.warn('Failed to load Google script', err));
  }, []);

  const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts) return resolve();
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = e => reject(e);
      document.head.appendChild(script);
    });
  };

  const initializeGoogleSignIn = () => {
    if (!window.google || !window.google.accounts?.id) {
      console.warn('Google Identity Services not available');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      ux_mode: 'popup'
    });
  };

  const handleCredentialResponse = async (response) => {
    if (!response || !response.credential) {
      setErrorMessage('Google sign-in failed: no credential returned.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const res = await axios.post(`${backendBase}/api/auth/google`, {
        id_token: response.credential
      });

      if (res.data?.success) {
        if (res.data.token) localStorage.setItem('token', res.data.token);
        if (res.data.user) localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        setErrorMessage(res.data?.message || 'Google login failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Server error during Google login.');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = loginForm;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');

      const res = await axios.post(`${backendBase}/api/auth/login`, { email, password });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        setErrorMessage(res.data?.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Server error during login.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    if (!window.google || !window.google.accounts?.id) {
      setErrorMessage('Google SDK not loaded. Please try again.');
      return;
    }
    window.google.accounts.id.prompt();
  };

  const navigateToRegister = () => navigate('/register');
  const navigateToForgotPassword = () => navigate('/forgot-password');

  return (
    <div className="login-container">
      
      <div className="login-form">
        <h1>LOGIN</h1>
        <form onSubmit={onSubmit}>
          {/* Email Field */}
          <div className="input-group">
            <div className="input-field">
                <span className="icon"><FaEnvelope /></span>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={onChange}
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <div className="input-field">
                <span className="icon"><FaLock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={loginForm.password}
                onChange={onChange}
                placeholder="Password"
                required
              />
              <button type="button" className="toggle-password" onClick={togglePassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={loginForm.rememberMe}
                onChange={onChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span className="forgot-password" onClick={navigateToForgotPassword}>
              Forgot Password?
            </span>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="login-button-m" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            className="google-button"
            onClick={loginWithGoogle}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : <FaGoogle />}
            Sign in with Google
          </button>

          <div className="register-link">
            Don’t have an account?{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={navigateToRegister}>
              Register here
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
