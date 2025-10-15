// AppContext.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../lib/axiosInstance';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

// Create a context for the app
const AppContext = createContext();

// Reducer to handle app-related actions
const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS_SUCCESS':
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ALL_USERS_FAILURE':
      return {
        ...state,
        allUsers: [],
        loading: false,
        error: action.payload,
      };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ORDERS_FAILURE':
      return {
        ...state,
        orders: [],
        loading: false,
        error: action.payload,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
        productsFetched: true,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
        productsFetched: true,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_PRODUCTS_FETCHED':
      return {
        ...state,
        productsFetched: action.payload,
      };
    default:
      return state;
  }
};

// Initial state for the app context
const initialState = {
  allUsers: [],
  orders: [],
  products: [],
  loading: false,
  error: null,
  productsFetched: false,
};

// AppProvider component to wrap around the app and manage context state
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { token } = useAuth(); // Get token from useAuth hook
  
  // Set axios default authorization header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch functions that can be called independently
  const fetchAllUsers = async () => {
    if (state.loading) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/users');
      dispatch({
        type: 'FETCH_ALL_USERS_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'FETCH_ALL_USERS_FAILURE',
        payload: error.response?.data?.message || 'Failed to fetch users',
      });
      throw error;
    }
  };

  const fetchOrders = async () => {
    if (state.loading) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/orders');
      dispatch({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'FETCH_ORDERS_FAILURE',
        payload: error.response?.data?.message || 'Failed to fetch orders',
      });
      throw error;
    }
  };

  const fetchProducts = async () => {
    if (state.loading) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/products');
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: error.response?.data?.message || 'Failed to fetch products',
      });
      throw error;
    }
  };

  const createProduct = async (productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: error.response?.data?.message || 'Failed to create product',
      });
      throw error;
    }
  };

  const createOrder = async (orderData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'FETCH_ORDERS_FAILURE',
        payload: error.response?.data?.message || 'Failed to create order',
      });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchAllUsers,
        fetchOrders,
        fetchProducts,
        createProduct,
        createOrder,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// // Export the fetch functions for independent use
// export const fetchAllUsers = async (token) => {
//   try {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     const response = await axios.get('/api/users');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to fetch users';
//   }
// };

// export const fetchOrders = async (token) => {
//   try {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     const response = await axios.get('/api/orders');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to fetch orders';
//   }
// };

// export const fetchProducts = async () => {
//   try {
//     const response = await axios.get('/api/products');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to fetch products';
//   }
// };

// export const createProduct = async (productData, token) => {
//   try {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     const response = await axios.post('/api/products', productData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to create product';
//   }
// };

// export const createOrder = async (orderData, token) => {
//   try {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     const response = await axios.post('/api/orders', orderData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Failed to create order';
//   }
// };

// export default AppContext;