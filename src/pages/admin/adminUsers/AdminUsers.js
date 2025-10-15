// src/pages/Admin/AdminUsers/AdminUsers.js
import React, { useEffect, useState } from 'react';
import './AdminUsers.css';
import axios from '../../../lib/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch users with pagination
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/users?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = response.data;

      // Handle both { users: [...] } and plain array responses safely
      const newUsers = Array.isArray(data) ? data : data.users || [];

      setUsers(newUsers);
      setPagination({
        page: data.page || 1,
        limit: data.limit || 20,
        total: data.total || newUsers.length,
      });

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount or when token becomes available
  useEffect(() => {
    if (token) {
      fetchUsers(1);
    }
  }, [token]);

  // Pagination Handlers
  const handleNextPage = () => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    if (pagination.page < totalPages) {
      fetchUsers(pagination.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      fetchUsers(pagination.page - 1);
    }
  };

  // UI States
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-container">
      <h1>Manage Users</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>#{user._id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status-${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                No users found.
              </td>
            </tr>
          )}
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

export default AdminUsers;
