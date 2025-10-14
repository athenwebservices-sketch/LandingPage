// loadRazorpayButton.ts
export const loadRazorpayButton = (paymentButtonId: string) => {
  return new Promise<void>((resolve, reject) => {
    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;

    // Once the script is loaded, we will dynamically insert the Razorpay button
    script.onload = () => {
      const razorpayButton = document.createElement("script");
      razorpayButton.setAttribute("data-payment_button_id", paymentButtonId);

      // Find the form by its id and append the Razorpay button
      const razorpayForm = document.getElementById("razorpay-form");
      if (razorpayForm) {
        razorpayForm.appendChild(razorpayButton);
        resolve();
      } else {
        reject("Form not found!");
      }
    };

    // Handle error during script loading
    script.onerror = () => {
      reject("Failed to load Razorpay script.");
    };

    // Append the script to the head of the document
    document.head.appendChild(script);
  });
};
