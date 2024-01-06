// PaymentSuccess.js

import React from 'react';
import './PaymentSuccess.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect to the orders page or any other desired page
    navigate('/orders');
  };

  return (
    <div className="paymentSuccess">
      <div className="paymentSuccess__container">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        
        {/* Additional success message or details if needed */}
        
        <button className="paymentSuccess__redirectButton" onClick={handleRedirect}>
          View Orders
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
