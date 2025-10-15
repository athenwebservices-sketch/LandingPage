import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../lib/axiosInstance';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'LOGIN_BLANK':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Automatically restore user session
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

  const storedUser = localStorage.getItem('user');
  console.log(storedUser)
  if (storedUser) {
  try {
    const parsedUser = JSON.parse(storedUser);  // Parse the user from localStorage
      
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: parsedUser,  // Use parsed user here
        token: state.token
      }
    });
  } catch (error) {
    // Handle JSON parsing error, e.g., if storedUser is corrupted
    console.error('Error parsing stored user:', error);
    // Optionally, dispatch an error action or handle differently
  }
} else {
  // Handle case where storedUser is undefined or null
  console.log('No user found in localStorage');
  // Optionally, dispatch a different action (e.g., LOGIN_FAILURE or a default state)
}

}, [state.token]);

  // ✅ Normal email/password login
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/auth/login', { email, password });

      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  };

  // ✅ Register new user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/auth/register', userData);

      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Registration failed'
      });
      throw error;
    }
  };

  // ✅ Google Login (NEW)
  const googleLogin = async (googleToken) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // 🔥 Send Google token to backend (port 5000)
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        token: googleToken,
      });

      const { user, token } = response.data;

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Set default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Google login error:', error.response?.data || error.message);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Google login failed'
      });
      throw error;
    }
  };

  const loginFailure = () => {
    dispatch({ type: 'LOGIN_BLANK', payload: 'LOGIN_BLANK' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        loginFailure,
        googleLogin, // ✅ Added Google login here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
