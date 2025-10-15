import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './AdminUsers.css';

const AdminUsers = () => {
  const { allUsers, loading, error, fetchAllUsers } = useApp();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
