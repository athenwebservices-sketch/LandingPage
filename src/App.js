import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './component/navbar/Navbar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Payment from './pages/payment';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminOrders from './component/adminOrders/AdminOrders';
import AdminUsers from './component/adminUsers/AdminUsers';
import AdminProducts from './component/adminProducts/AdminProducts';
import { AppProvider } from './context/AppContext'; // Import your AppProvider
import Logout from './component/logout/Logout';
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <AppProvider> {/* Wrap your App with the AppProvider */}
            <Router>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </div>
            </Router>
          </AppProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
};

export default App;
  