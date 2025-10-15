import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import './AdminProducts.css';

const AdminProducts = () => {
  const { products, loading, error, fetchProducts, productsFetched } = useApp();
  const hasFetchedRef = useRef(false); // Track if fetch has been attempted only once
  
  useEffect(() => {
    // Check if products haven't been fetched and ensure this effect only runs once
    if (!productsFetched && !hasFetchedRef.current) {
      hasFetchedRef.current = true;  // Mark that we have attempted to fetch
      fetchProducts();  // Trigger the fetch
    }
  }, [fetchProducts, productsFetched]);  // Only run when productsFetched changes

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <h1>Manage Products</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.status}</td>
              <td>{product.category}</td>
            </tr>
          )) : <tr><td colSpan="5">No products available</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
