import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
import { CATEGORIES } from "../../utils/productsData";
import { useProduct, useProducts } from "../../hooks/useProducts";
import { useStateValue } from "../../context/StateProvider";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Product from "../../components/common/Product";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

function ProductDetail() {
  const { productId } = useParams();
  const [{ basket }, dispatch] = useStateValue();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { product, loading, error } = useProduct(productId);
  // Fetch related products from the same category (undefined until product loads)
  const { products: relatedPool } = useProducts(product?.category);

  if (loading) {
    return (
      <div className="pd__loading">
        <div className="pd__loadingSkeleton">
          <div className="pd__skeletonGallery pd__skeletonBlock" />
          <div className="pd__skeletonInfo">
            <div className="pd__skeletonBlock" style={{ height: 28, width: "70%", marginBottom: 16 }} />
            <div className="pd__skeletonBlock" style={{ height: 16, width: "40%", marginBottom: 12 }} />
            <div className="pd__skeletonBlock" style={{ height: 32, width: "30%", marginBottom: 20 }} />
            <div className="pd__skeletonBlock" style={{ height: 14, marginBottom: 8 }} />
            <div className="pd__skeletonBlock" style={{ height: 14, marginBottom: 8, width: "90%" }} />
            <div className="pd__skeletonBlock" style={{ height: 14, width: "80%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd__notFound">
        <h2>Product not found.</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === product.category);

  const addToBasket = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          rating: product.rating,
        },
      });
    }
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const renderStars = (rating) =>
    Array(5)
      .fill()
      .map((_, i) =>
        i < Math.floor(rating) ? (
          <StarIcon key={i} className="pd__star pd__star--filled" />
        ) : i < rating ? (
          <StarHalfIcon key={i} className="pd__star pd__star--filled" />
        ) : (
          <StarBorderIcon key={i} className="pd__star pd__star--empty" />
        )
      );

  // Related products (same category, exclude self)
  const related = relatedPool
    .filter((p) => String(p.id) !== String(productId))
    .slice(0, 4);

  return (
    <div className="pd">
      {/* Breadcrumb */}
      <nav className="pd__breadcrumb">
        <Link to="/">Home</Link>
        <span className="pd__sep"> › </span>
        {cat && (
          <>
            <Link to={`/category/${cat.id}`}>{cat.label}</Link>
            <span className="pd__sep"> › </span>
          </>
        )}
        <span className="pd__breadcrumbCurrent">
          {product.title.length > 60
            ? product.title.slice(0, 60) + "…"
            : product.title}
        </span>
      </nav>

      {/* Main detail card */}
      <div className="pd__main">
        {/* Left — image gallery */}
        <div className="pd__gallery">
          <div className="pd__thumbnails">
            {(product.images || [product.image]).map((img, i) => (
              <div
                key={i}
                className={`pd__thumb ${selectedImage === i ? "pd__thumb--active" : ""}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`${product.title} view ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className="pd__mainImage">
            {product.badge && (
              <span className="pd__badge">{product.badge}</span>
            )}
            <img
              src={(product.images || [product.image])[selectedImage]}
              alt={product.title}
            />
          </div>
        </div>

        {/* Middle — product info */}
        <div className="pd__info">
          <h1 className="pd__title">{product.title}</h1>

          {/* Brand / category pill */}
          {cat && (
            <Link to={`/category/${cat.id}`} className="pd__catLink">
              {cat.emoji} Visit the {cat.label} Store
            </Link>
          )}

          {/* Rating */}
          <div className="pd__ratingRow">
            <div className="pd__stars">{renderStars(product.rating)}</div>
            <a href="#reviews" className="pd__reviewLink">
              {product.reviewCount?.toLocaleString()} ratings
            </a>
          </div>

          <hr className="pd__divider" />

          {/* Price block */}
          <div className="pd__priceBlock">
            <span className="pd__priceLabel">Price:</span>
            <span className="pd__price">
              <span className="pd__priceCurrency">$</span>
              {formatPrice(product.price).replace("$", "")}
            </span>
          </div>

          {product.prime && (
            <div className="pd__primeRow">
              <span className="pd__primeBadge">prime</span>
              <span className="pd__primeFree">FREE delivery</span>
            </div>
          )}

          <hr className="pd__divider" />

          {/* Description */}
          <p className="pd__description">{product.description}</p>

          {/* Features */}
          {product.features && (
            <ul className="pd__features">
              {product.features.map((f, i) => (
                <li key={i}>
                  <CheckCircleOutlineIcon className="pd__featureIcon" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right — buy box */}
        <div className="pd__buyBox">
          <p className="pd__buyPrice">
            <span className="pd__buyCurrency">$</span>
            {formatPrice(product.price).replace("$", "")}
          </p>

          {product.prime && (
            <div className="pd__buyPrime">
              <LocalShippingIcon style={{ fontSize: 16 }} />
              FREE Prime Delivery
            </div>
          )}

          <div className="pd__stockRow">
            <span className={product.inStock ? "pd__inStock" : "pd__outStock"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Qty selector */}
          <div className="pd__qtyRow">
            <label className="pd__qtyLabel">Qty:</label>
            <select
              className="pd__qtySelect"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              disabled={!product.inStock}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            className={`pd__addToCartBtn ${addedFeedback ? "pd__addToCartBtn--success" : ""}`}
            onClick={addToBasket}
            disabled={!product.inStock}
          >
            <ShoppingCartIcon style={{ fontSize: 18 }} />
            {addedFeedback ? "Added to Cart!" : "Add to Cart"}
          </button>

          <Link to="/checkout" className="pd__buyNowBtn">
            Buy Now
          </Link>

          {/* Trust signals */}
          <div className="pd__trust">
            <div className="pd__trustItem">
              <SecurityIcon style={{ fontSize: 16, color: "#555" }} />
              Secure transaction
            </div>
            <div className="pd__trustItem">
              <VerifiedUserIcon style={{ fontSize: 16, color: "#555" }} />
              Ships from &amp; sold by Amazon
            </div>
          </div>

          <Link to="/checkout" className="pd__viewCart">
            <ShoppingCartIcon style={{ fontSize: 14 }} />
            View Cart ({basket?.length || 0})
          </Link>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="pd__related">
          <h2 className="pd__relatedTitle">
            Customers who viewed this also viewed
          </h2>
          <div className="pd__relatedGrid">
            {related.map((p) => (
              <Product
                key={p.id}
                id={p.id}
                title={p.title}
                image={p.image}
                price={p.price}
                rating={p.rating}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fake review section anchor */}
      <div id="reviews" className="pd__reviewsAnchor" />
    </div>
  );
}

export default ProductDetail;
