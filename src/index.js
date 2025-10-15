// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

// 1. FIX: Import the AppProvider component, not the AppContext object
import { AppProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        {/* 2. FIX: Use the AppProvider component here */}
        <AppProvider>
          <Router>
            <App />
          </Router>
        </AppProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);  