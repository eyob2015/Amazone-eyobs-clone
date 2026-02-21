import React from 'react';
import './Order.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CheckoutProduct from '../Checkout/CheckoutProduct';

function Order({ order }) {
  const formattedDate = format(new Date(order.data.created * 1000), "MMMM do yyyy, h:mma");

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="order">
      <div className="order__header">
        <div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>ORDER PLACED</p>
          <p className="order__date">{formattedDate}</p>
        </div>
        <div>
          <p className="order__total">
            {currencyFormatter.format(order.data.amount / 100)}
          </p>
          <p style={{ fontSize: 11, color: '#555', textAlign: 'right' }}>TOTAL</p>
        </div>
        <div>
          <p className="order__id">Order # {order.id}</p>
          <Link to="/checkout">
            <button style={{
              background: 'none', border: 'none',
              color: '#007185', fontSize: 12, cursor: 'pointer',
              padding: 0, textDecoration: 'underline'
            }}>View order details</button>
          </Link>
        </div>
      </div>

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
    </div>
  );
}

export default Order;

