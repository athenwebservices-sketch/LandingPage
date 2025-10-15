import React, { useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import './AdminOrders.css';

const AdminOrders = () => {
  const { orders, loading, error, fetchOrders } = useApp();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  console.log(orders)
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <h1>Manage Orders</h1>
      <table className="orders-table">
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
          {/* {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
