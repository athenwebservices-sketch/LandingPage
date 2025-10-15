// src/pages/Admin/CustomerProducts/CustomerProducts.js
import React, { useEffect, useState } from 'react';
import './CustomerProducts.css';
import axios from '../../../lib/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch products with pagination
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/products?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const { products: newProducts, page: currentPage, limit, total } = response.data;
      setProducts(newProducts);
      setPagination({ page: currentPage, limit, total });

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts(1);
    }
  }, [token]);

  const handleNextPage = () => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    if (pagination.page < totalPages) {
      fetchProducts(pagination.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      fetchProducts(pagination.page - 1);
    }
  };

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
            <th>Stock</th>
            <th>Category</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>#{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price.toLocaleString()}</td>
              <td>{product.stock}</td>
              <td>{product.category || 'N/A'}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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

export default CustomerProducts;
