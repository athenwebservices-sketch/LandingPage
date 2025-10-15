import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import axios from '../../../lib/axiosInstance';
import { useAuth } from '../../../context/AuthContext';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // Function to fetch orders from API, now accepts a page number
    const fetchOrders = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/orders?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Axios automatically parses JSON and throws for error statuses
            const { orders: newOrders, page: currentPage, limit, total } = response.data;

            setOrders(newOrders);
            setPagination({ page: currentPage, limit, total });

        } catch (err) {
            // Use a more descriptive error message if available
            setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    // Fetch the first page of orders when the component mounts or token changes
    useEffect(() => {
        if (token) {
            fetchOrders(1);
        }
    }, [token]); // Dependency on token ensures we refetch if it becomes available

    // Handlers for pagination buttons
    const handleNextPage = () => {
        const totalPages = Math.ceil(pagination.total / pagination.limit);
        if (pagination.page < totalPages) {
            fetchOrders(pagination.page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pagination.page > 1) {
            fetchOrders(pagination.page - 1);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="orders-container">
            <h1>Manage Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>#{order._id}</td>
                            {/* In a real app, you'd fetch user details to display the name.
                                For now, we display the user ID. */}
                            <td>{order.user}</td>
                            <td>${order.total.toLocaleString()}</td>
                            <td><span className={`status-${order.status}`}>{order.status}</span></td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={pagination.page === 1}>
                    Previous
                </button>
                <span>
                    Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit) || 1}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminOrders;