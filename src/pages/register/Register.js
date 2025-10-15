import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';
import Navbar from '../../component/navbar/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);  // State to track if OTP was sent
  const [otp, setOtp] = useState('');  // OTP input
  const [otpError, setOtpError] = useState('');  // OTP validation error
  const { register, isAuthenticated, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Trigger OTP sending process
      await sendOtp(formData.email);  // Assuming OTP is sent to the email

      // Now show OTP input field
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otp) {
      setOtpError('Please enter the OTP');
      return;
    }

    try {
      await verifyOtp(otp);  // Assuming verifyOtp checks the OTP from the backend
      navigate('/');  // Redirect to home page after successful OTP verification
    } catch (err) {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1 className="register-title">Create Account</h1>

        {!otpSent ? (
          // Normal Registration Form
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="name">Full Name</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="email">Email Address</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="password-requirements">
                Password must be at least 6 characters long
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        ) : (
          // OTP Verification Form
          <form className="otp-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="otp">Enter OTP</label>
              <input
                className="input"
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>

            <button className="submit-button" type="submit">
              Verify OTP
            </button>
            {otpError && <div className="error-message">{otpError}</div>}
          </form>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="login-link">
          Already have an account? <Link to="/admin">Login here</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
