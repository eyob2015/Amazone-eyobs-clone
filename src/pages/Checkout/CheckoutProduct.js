import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from "../../context/StateProvider";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

function CheckoutProduct({ id, image, title, price, rating, quantity = 1, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => dispatch({ type: 'REMOVE_FROM_BASKET', id });
  const increment = () => dispatch({ type: 'INCREMENT_QUANTITY', id });
  const decrement = () => dispatch({ type: 'DECREMENT_QUANTITY', id });

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt={title} />

      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{formatPrice(price * quantity).replace("$", "")}</strong>
          {quantity > 1 && (
            <span className="checkoutProduct__unitPrice">
              ({formatPrice(price)} each)
            </span>
          )}
        </p>

        <div className="checkoutProduct__rating">
          {Array(5).fill().map((_, i) =>
            i < rating
              ? <StarIcon key={i} className="star-filled" />
              : <StarBorderIcon key={i} className="star-empty" />
          )}
        </div>

        <span className="checkoutProduct__prime">✓ FREE Prime Delivery</span>

        {!hideButton && (
          <div className="checkoutProduct__actions">
            {/* Quantity stepper */}
            <div className="checkoutProduct__qty">
              <button
                className="checkoutProduct__qtyBtn"
                onClick={decrement}
                aria-label="Decrease quantity"
              >
                <RemoveIcon style={{ fontSize: 14 }} />
              </button>
              <span className="checkoutProduct__qtyCount">{quantity}</span>
              <button
                className="checkoutProduct__qtyBtn"
                onClick={increment}
                aria-label="Increase quantity"
              >
                <AddIcon style={{ fontSize: 14 }} />
              </button>
            </div>

            <span className="checkoutProduct__divider">|</span>

            <button
              className="checkoutProduct__removeButton"
              onClick={removeFromBasket}
            >
              <DeleteOutlineIcon style={{ fontSize: 14 }} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;

