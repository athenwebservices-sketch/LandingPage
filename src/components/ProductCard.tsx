// components/ProductCard.tsx (Updated)
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RazorpayPayment from './RazorpayPayment';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  description?: string;
  image?: string;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const { handlePayment } = RazorpayPayment({
    product,
    onSuccess: (response) => {
      console.log('Payment successful:', response);
      setIsProcessing(false);
      setShowPaymentSuccess(true);
      
      // In a real app, you would:
      // 1. Save the order to your backend
      // 2. Update product stock
      // 3. Send confirmation email
      
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 5000);
    },
    onFailure: (error) => {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  });

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert('Please login to continue with your purchase.');
      return;
    }

    setIsProcessing(true);
    handlePayment();
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Out of Stock', color: 'text-red-400' };
    if (product.stock < 5) return { text: `Only ${product.stock} left`, color: 'text-yellow-400' };
    return { text: 'In Stock', color: 'text-green-400' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      {/* Product Image */}
      <div className="aspect-square w-full overflow-hidden bg-white/5">
        <img
          src={product.image || '/placeholder-product.png'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
          <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
            {product.category || 'General'}
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description || 'No description available for this product.'}
        </p>

        <div className="flex justify-between items-center mb-3">
          <div className="text-2xl font-bold text-white">
            ₹{product.price.toLocaleString()}
          </div>
          <div className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          // disabled={product.stock === -1 || isProcessing}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            product.stock === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-yellow-400 text-black hover:bg-yellow-300'
          } ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Buy Now'
          )}
        </button>

        {/* Payment Success Message */}
        {showPaymentSuccess && (
          <div className="mt-3 p-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
            Payment successful! Your order has been placed.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;