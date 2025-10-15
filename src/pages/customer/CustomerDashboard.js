// src/pages/Admin/CustomerDashboard/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import axios from '../../lib/axiosInstance';
import { useApp } from '../../context/AppContext';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  padding-top: calc(80px + 2rem);
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DashboardTitle = styled.h1`
  color: #2c3e50;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const RecentOrders = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  &.pending {
    background: #fff3cd;
    color: #856404;
  }
  
  &.completed {
    background: #d4edda;
    color: #155724;
  }
  
  &.cancelled {
    background: #f8d7da;
    color: #721c24;
  }
`;

// MAIN COMPONENT
const CustomerDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      setLoading(true);

      try {
        // Fetch all data in parallel for performance
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axios.get('/api/products', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Extract arrays safely
        const products = productsRes.data?.products || productsRes.data || [];
        const users = usersRes.data?.users || usersRes.data || [];
        const orders = ordersRes.data?.orders || ordersRes.data || [];

        // ✅ Calculate total revenue from orders
        const totalRevenue = Array.isArray(orders)
          ? orders.reduce((sum, order) => {
              const total =
                Number(order.totalAmount) ||
                Number(order.total) ||
                0;
              return sum + total;
            }, 0)
          : 0;

        // ✅ Get 5 most recent orders
        const recent = Array.isArray(orders)
          ? orders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
          : [];

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalUsers: users.length,
          totalProducts: products.length,
        });

        setRecentOrders(recent);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (!user || loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Customer Dashboard</DashboardTitle>
        <ActionButtons>
          <ActionButton to="/customer/products">Products</ActionButton>
          <ActionButton to="/customer/orders">My Orders</ActionButton>
        </ActionButtons>
      </DashboardHeader>

      {/* ✅ Dynamic Stats */}
      <StatsGrid>
        <StatCard>
          <StatIcon>📦</StatIcon>
          <StatValue>{stats.totalOrders}</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>💰</StatIcon>
          <StatValue>${stats.totalRevenue.toLocaleString()}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatValue>{stats.totalUsers}</StatValue>
          <StatLabel>Total Users</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>🛍️</StatIcon>
          <StatValue>{stats.totalProducts}</StatValue>
          <StatLabel>Total Products</StatLabel>
        </StatCard>
      </StatsGrid>

      {/* ✅ Recent Orders */}
      <RecentOrders>
        <SectionTitle>Recent Orders</SectionTitle>
        <OrderTable>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order._id || order.id}>
                  <td>#{order._id || order.id}</td>
                  <td>{order.user?.name || order.customer || 'N/A'}</td>
                  <td>${(order.totalAmount || order.total || 0).toLocaleString()}</td>
                  <td>
                    <StatusBadge className={order.status || 'pending'}>
                      {order.status || 'pending'}
                    </StatusBadge>
                  </td>
                  <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </OrderTable>
      </RecentOrders>
    </DashboardContainer>
  );
};

export default CustomerDashboard;
