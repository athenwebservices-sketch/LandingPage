import React, { useEffect, useState } from 'react';

export default function Payment() {
  console.log("In payment page ")
  const [orderData, setOrderData] = useState(null);
  const [verifyData, setVerifyData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('#razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    async function initPayment() {
      try {
        const ok = await loadRazorpayScript();
        if (!ok) throw new Error('Failed to load Razorpay SDK');

        // Step 1: Create Razorpay order from backend
        const res = await fetch('http://localhost:5000/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 19900 }), // ₹199.00
        });

        if (!res.ok) throw new Error('Failed to create order');
        const order = await res.json();
        setOrderData(order);

        // Step 2: Razorpay popup
        const options = {
          key: order.key,
          amount: order.amount,
          currency: order.currency,
          name: 'My Demo Store',
          description: 'Test Transaction',
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await fetch('http://localhost:5000/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response),
              });
              const verifyJson = await verifyRes.json();
              setVerifyData(verifyJson);
            } catch (err) {
              setVerifyData({ error: err.message });
            }
          },
          theme: { color: '#2563eb' },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    initPayment();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="p-6 rounded-2xl shadow-lg bg-white w-full max-w-2xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Razorpay Payment</h1>

        {loading && <p className="text-gray-600">Initializing payment...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {orderData && (
          <div className="bg-gray-100 p-4 rounded-lg text-left my-4">
            <h2 className="text-lg font-medium mb-2">🧾 Order Created</h2>
            <pre className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg overflow-auto">
{JSON.stringify(orderData, null, 2)}
            </pre>
          </div>
        )}

        {verifyData && (
          <div className="bg-green-100 p-4 rounded-lg text-left my-4">
            <h2 className="text-lg font-medium mb-2">✅ Payment Verification Result</h2>
            <pre className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg overflow-auto">
{JSON.stringify(verifyData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
