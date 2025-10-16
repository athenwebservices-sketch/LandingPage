'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  product: any;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  onDismiss: () => void; // New prop to handle dismiss
}

const RazorpayPayment = ({ product, onSuccess, onFailure, onDismiss }: RazorpayPaymentProps) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert('Failed to load Razorpay script. Please try again.');
          onFailure('Failed to load payment gateway');
          return;
        }

        const options = {
          key: 'rzp_test_RTn7656VqItM3e', // Hardcoded test key
          amount: product.price * 100, // Convert to paise
          currency: 'INR',
          description: product.name,
          image: '',
          prefill: {
            email: 'a@gmail.com',
            contact: 123456789,
          },
          config: {
            display: {
              blocks: {
                utib: { // Name for Axis block
                  name: 'Pay Using Axis Bank',
                  instruments: [
                    {
                      method: 'card',
                      issuers: ['UTIB'],
                    },
                    {
                      method: 'netbanking',
                      banks: ['UTIB'],
                    },
                  ],
                },
                other: { // Name for other block
                  name: 'Other Payment Methods',
                  instruments: [
                    {
                      method: 'card',
                      issuers: ['ICIC'],
                    },
                    {
                      method: 'netbanking',
                    },
                  ],
                },
              },
              hide: [
                {
                  method: 'upi',
                },
              ],
              sequence: ['block.utib', 'block.other'],
              preferences: {
                show_default_blocks: false,
              },
            },
          },
          handler: function (response: any) {
            console.log('Payment successful:', response);
            onSuccess(response);
          },
          modal: {
            ondismiss: function () {
              console.log('Checkout form dismissed by the user');
              onDismiss(); // Notify parent about dismiss
            },
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error('Payment initiation error:', error);
        onFailure('Error initiating Razorpay payment');
      }
    };

    initiatePayment();
  }, [product, onSuccess, onFailure, onDismiss]);

  return null; // This component doesn’t render anything visible, Razorpay handles the UI.
};

export default RazorpayPayment;
