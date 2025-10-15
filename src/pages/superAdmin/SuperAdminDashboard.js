import React, { useState } from 'react';

const SuperAdminDashboard = () => {
  const [adminName, setAdminName] = useState('SuperAdmin');
  const [status, setStatus] = useState('Active');

  const toggleStatus = () => {
    setStatus(prevStatus => (prevStatus === 'Active' ? 'Inactive' : 'Active'));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>{adminName}'s Dashboard</h1>
      <p>Status: {status}</p>
      <button onClick={toggleStatus} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Toggle Status
      </button>
    </div>
  );
};

export default SuperAdminDashboard;
