import React, { useEffect } from 'react';
import { Routes, Route, useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate

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
import Payments from './pages/payment';
import AdminProducts from './pages/admin/adminProducts/AdminProducts';

const App = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 2. GET THE CURRENT LOCATION

  useEffect(() => {
    // 3. DEFINE WHICH PATHS ARE PUBLIC
    const publicPaths = ['/', '/login', '/register', '/payments'];
    const isPublicPath = publicPaths.includes(location.pathname);

    // 4. ONLY REDIRECT IF THE USER IS AUTHENTICATED AND IS ON A PUBLIC PATH
    if (isAuthenticated && isPublicPath) {
      console.log(user, "in App - Redirecting from public path");
      // After login, navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'customer') {
        navigate('/customer-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate, location]); // 5. ADD location TO DEPENDENCIES

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
        <Route path="/admin/products" element={<AdminProducts />} />
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