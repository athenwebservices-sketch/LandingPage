'use client';

import { useState, useRef, useEffect } from 'react';

export default function Tickets() {
  const [showRazorpay, setShowRazorpay] = useState(false);
  const razorpayFormRef = useRef(null);

  // Handle Razorpay script loading
  useEffect(() => {
    if (showRazorpay && razorpayFormRef.current) {
      // Clear any existing content
      razorpayFormRef.current.innerHTML = '';
      
      // Create a container div for the button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'razorpay-button-container';
      
      // Create the script element
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute('data-payment_button_id', 'pl_RT6DPFm2Zyh9RZ');
      script.async = true;
      
      // Append the script to the container
      buttonContainer.appendChild(script);
      
      // Append the container to the form
      razorpayFormRef.current.appendChild(buttonContainer);
      
      // Add a fallback in case the script doesn't load
      const timeout = setTimeout(() => {
        if (!razorpayFormRef.current?.querySelector('.razorpay-payment-button')) {
          // If the button doesn't appear after 3 seconds, show a fallback
          buttonContainer.innerHTML = `
            <div class="text-center">
              <p class="text-red-500 mb-4">Payment button loading failed. Please try again.</p>
              <button 
                onclick="window.location.href='https://rzp.io/l/creatorsstreet'" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Pay with Razorpay
              </button>
            </div>
          `;
        }
      }, 3000);
      
      return () => {
        clearTimeout(timeout);
        // Clean up when modal closes
        if (razorpayFormRef.current) {
          razorpayFormRef.current.innerHTML = '';
        }
      };
    }
  }, [showRazorpay]);

  return (
    <>
      <section id="tickets" className="relative bg-[#3c0052] pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 items-center justify-center text-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Limited Time Offer
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Join the Ultimate Pop-Culture Experience at Creators Street 2025
              </h2>

              <div className="space-y-4 text-gray-300 text-lg">
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Get exclusive access to all <strong>4 experience zones: Animation, VFX, Film, and OTT</strong></span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Meet top <strong>creators, artists, and industry leaders</strong> from across India</span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Participate in <strong>gaming tournaments, cosplay shows,</strong> and workshops</span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Experience <strong>masterclasses, live performances,</strong> and panel sessions</span>
                </p>
              </div>

              <p className="text-yellow-400 font-semibold text-lg">
                Early Bird Offer — Limited Seats Only!
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowRazorpay(true)}
                  className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="text-2xl">🎟️</span>
                    <span>Buy Tickets</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Razorpay Payment Modal */}
      {showRazorpay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowRazorpay(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Purchase</h3>
            
            <div className="razorpay-payment-container">
              <form ref={razorpayFormRef}>
                {/* The Razorpay button will be dynamically inserted here */}
              </form>
            </div>
            
            {/* Fallback button */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Or pay directly with Razorpay</p>
              <a 
                href="https://rzp.io/l/creatorsstreet" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Pay Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}