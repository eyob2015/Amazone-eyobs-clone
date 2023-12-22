import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Generate the special Stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // Handle the form submission and payment processing
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // Save the payment details to the database
      db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      });

      navigate('/orders');
    });
  };

  const handleChange = event => {
    // Listen for changes in the CardElement and enable/disable the payment button
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (
            <Link to="/checkout">{basket?.length} items</Link>
          )
        </h1>

        {/* Payment section - delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct
                key={item.id} // Add a unique key prop
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <h3>Order Total: ${getBasketTotal(basket).toFixed(2).toLocaleString()}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Display errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;