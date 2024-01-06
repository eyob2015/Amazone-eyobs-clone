import React from 'react';
import './Order.css';
import { format } from 'date-fns'; // Import date-fns for date formatting
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
  const formattedDate = format(new Date(order.data.created * 1000), "MMMM do yyyy, h:mma");

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="order">
      <h2>Your Order</h2>
      <p className="order__date">{formattedDate}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <h3 className="order__total">
        Order Total: {currencyFormatter.format(order.data.amount / 100)}
      </h3>
      <Link to="/checkout">
        <button className="order__checkoutButton">Go to Checkout</button>
      </Link>
    </div>
  );
}

export default Order;
