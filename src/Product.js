import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (e) => {
    e.preventDefault(); // prevent Link navigation when clicking button
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, image, price, rating },
    });
  };

  return (
    <Link to={`/product/${id}`} className="product__link">
      <div className="product">
        <div className="product__imageWrapper">
          <img src={image} alt={title} />
        </div>

        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{formatPrice(price).replace("$", "")}</strong>
          </p>
          <div className="product__rating">
            {Array(5)
              .fill()
              .map((_, i) =>
                i < rating ? (
                  <StarIcon key={i} className="star-filled" />
                ) : (
                  <StarBorderIcon key={i} className="star-empty" />
                )
              )}
          </div>
          <span className="product__prime">✓ FREE Prime Delivery</span>
        </div>

        <button onClick={addToBasket}>Add to Basket</button>
      </div>
    </Link>
  );
}

export default Product;
