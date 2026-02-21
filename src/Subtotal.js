import React, { useMemo, useState } from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { Link, useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const [promoCode, setPromoCode] = useState("");
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

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
        <p className="subtotal__line">
          Subtotal ({basket.length} item{basket.length !== 1 && "s"}):
          {" "}<strong>{formattedTotal}</strong>
        </p>
      )}

      <small className="subtotal__gift">
        <input
          type="checkbox"
          aria-label="This order contains a gift"
        />
        This order contains a gift
      </small>

      {promoCode && (
        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      )}

      <button
        className={basket.length === 0 ? "subtotal__btn subtotal__btn--disabled" : "subtotal__btn"}
        onClick={() => {
          if (basket.length === 0) {
            setShowEmptyError(true);
            setShowSignInPrompt(false);
            return;
          }
          if (!user) {
            setShowEmptyError(false);
            setShowSignInPrompt(true);
            return;
          }
          setShowEmptyError(false);
          setShowSignInPrompt(false);
          navigate("/Payment");
        }}
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      {showEmptyError && (
        <div className="subtotal__emptyError">
          <WarningAmberIcon style={{ fontSize: 16 }} />
          Your cart is empty. Please add items before checking out.
        </div>
      )}

      {showSignInPrompt && (
        <div className="subtotal__signInPrompt">
          <WarningAmberIcon style={{ fontSize: 16 }} />
          Please{" "}
          <Link to="/Login" state={{ from: { pathname: "/Payment" } }}>
            sign in
          </Link>{" "}
          to proceed to checkout.
        </div>
      )}

      <p className="subtotal__secure">
        🔒 Secure checkout
      </p>
    </div>
  );
}

export default Subtotal;
