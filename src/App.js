import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate

import { useAuth } from './context/AuthContext'; // Import the useAuth hook

// Importing Layouts
import AdminLayout from './component/layouts/AdminLayout';
import CustomerLayout from './component/layouts/CustomerLayout';
import SuperLayout from './component/layouts/SuperLayout';

// Importing Pages
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import SuperAdminDashboard from './pages/superAdmin/SuperAdminDashboard';
import AdminOrders from './pages/admin/adminOrders/AdminOrders';
import CustomerOrders from './pages/customer/customerOrders/CustomerOrders';
import AdminUsers from './pages/admin/adminUsers/AdminUsers';
import Logout from './pages/logout/Logout';
import Payments from './pages/payment'

const App = () => {
  const { user, isAuthenticated } = useAuth(); // Get user and authentication state
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user,"in App")
      // After login, navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'customer') {
        navigate('/customer-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]); // Trigger when isAuthenticated or user changes

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payments" element={<Payments/>}/>
      {/* Admin Routes - Wrapped in AdminLayout */}
      <Route element={<AdminLayout />}>
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/admin/orders" element={<AdminOrders />} />
  <Route path="/admin/users" element={<AdminUsers />} />
</Route>


      {/* Customer Routes - Wrapped in CustomerLayout */}
      <Route element={<CustomerLayout />}>
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
      </Route>

      {/* Super Routes - Wrapped in SuperLayout */}
      <Route element={<SuperLayout />}>
        <Route path="/super-dashboard" element={<SuperAdminDashboard />} />
      </Route>

      {/* Logout Route */}
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default App;
