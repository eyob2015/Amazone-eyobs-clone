import React, { useMemo, useState } from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { Link, useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  const [promoCode, setPromoCode] = useState(""); // New state for promo code

  const total = useMemo(() => {
    // Memoize total calculation
    return getBasketTotal(basket);
  }, [basket]);

  const discountedTotal = useMemo(() => {
    // Calculate discounted total based on promo code (if any)
    if (!promoCode) return total;
    // Implement your promo code logic here to calculate the discount
    // for example, a 10% discount:
    return total * 0.9;
  }, [total, promoCode]);

  // Format the currency using Intl.NumberFormat
  const formattedTotal = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change the currency code as needed
    });
    return formatter.format(discountedTotal);
  }, [discountedTotal]);

  return (
    <div className="subtotal">
      {basket.length > 0 && (
        <>
          <p className="subtotal__title">
            Subtotal ({basket.length} items):
          </p>
          <p className="subtotal__price">
            {formattedTotal}
          </p>
        </>
      )}
      <small className="subtotal__gift">
        <input
          type="checkbox"
          aria-label="This order contains a gift"
        />
        This order contains a gift
      </small>
      {promoCode && ( // Conditional rendering for promo code input
        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      )}
      <button
        onClick={() => navigate("/payment")}
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
