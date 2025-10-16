// components/RazorpayPayment.tsx (Updated)
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/lib/api';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment = ({ 
  product, 
  onSuccess, 
  onFailure 
}: { 
  product: any; 
  onSuccess: (response: any) => void; 
  onFailure: (error: any) => void;
}) => {
  const { user } = useAuth();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      // Create an order on your backend first
      let orderData;
      try {
        orderData = await apiService.post('/api/orders/create', {
          productId: product._id,
          quantity: 1,
          totalAmount: product.price
        });
      } catch (error) {
        console.error('Error creating order:', error);
        // Continue with mock order if backend fails
        orderData = { order_id: `order_${Date.now()}` };
      }

      // Extract user's name or use email as fallback
      const userName = user?.name || user?.email || 'Customer';

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_1234567890', // Your Razorpay key
        amount: product.price * 100, // Amount in paise
        currency: 'INR',
        name: 'Creators Street',
        description: `Payment for ${product.name}`,
        image: '/Logo1.png',
        order_id: orderData.order_id,
        handler: function (response: any) {
          // Handle successful payment
          // Verify payment on your backend
          verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
          onSuccess(response);
        },
        prefill: {
          name: userName,
          email: user?.email || 'customer@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Creators Street, Hyderabad'
        },
        theme: {
          color: '#3c0052', // Your theme color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      onFailure(error);
    }
  };

  const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
    try {
      // Verify payment on your backend
      await apiService.post('/api/payments/verify', {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });
      console.log('Payment verified successfully');
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  return { handlePayment };
};

export default RazorpayPayment;