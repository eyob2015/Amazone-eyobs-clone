import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { getBasketItemCount } from "./reducer";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      {/* Left Column */}
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Amazon promo"
        />

        {basket?.length === 0 ? (
          <div className="checkout__empty">
            <h3>Your Amazon Cart is empty</h3>
            <p>
              <Link to="/">Continue shopping</Link>
            </p>
          </div>
        ) : (
          <div>
            <p className="checkout__greeting">Hello, {user?.email}</p>
            <h2 className="checkout__title">
              Shopping Basket ({getBasketItemCount(basket)} item{getBasketItemCount(basket) !== 1 && "s"})
            </h2>

            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity || 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

