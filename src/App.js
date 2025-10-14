import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Navbar from './component/navbar/Navbar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminDashboard from './pages/admin-dashboard/Admin-dashboard';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
      </Provider>
    </div>
  );
};

export default App;
