import React from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.css";
import { CATEGORIES } from "./productsData";
import { useProducts } from "./hooks/useProducts";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useStateValue } from "./StateProvider";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

function CategoryPage() {
  const { categoryId } = useParams();
  const [{ basket }, dispatch] = useStateValue();

  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const { products, loading, error } = useProducts(categoryId);

  const addToBasket = (product) => {
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
  };

  const renderStars = (rating) =>
    Array(5)
      .fill()
      .map((_, i) =>
        i < Math.floor(rating) ? (
          <StarIcon key={i} className="cp__star cp__star--filled" />
        ) : i < rating ? (
          <StarHalfIcon key={i} className="cp__star cp__star--filled" />
        ) : (
          <StarBorderIcon key={i} className="cp__star cp__star--empty" />
        )
      );

  if (!cat) {
    return (
      <div className="cp__notFound">
        <h2>Category not found.</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="cp">
      {/* Breadcrumb */}
      <nav className="cp__breadcrumb">
        <Link to="/">Home</Link>
        <span className="cp__breadcrumbSep"> › </span>
        <span>{cat.label}</span>
      </nav>

      {/* Page header */}
      <div className="cp__header" style={{ borderLeftColor: cat.color }}>
        <span className="cp__headerEmoji">{cat.emoji}</span>
        <div>
          <h1 className="cp__headerTitle">{cat.label}</h1>
          <p className="cp__headerSub">
            {loading ? "Loading…" : `${products.length} result${products.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Sort / filter bar */}
      <div className="cp__toolbar">
        <span className="cp__toolbarLabel">Sort by:</span>
        <select className="cp__sortSelect">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Avg. Customer Review</option>
          <option>Newest Arrivals</option>
        </select>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="cp__grid">
          {Array(8).fill(null).map((_, i) => (
            <div key={i} className="cp__card cp__card--skeleton">
              <div className="cp__skeleton cp__skeleton--image" />
              <div className="cp__info">
                <div className="cp__skeleton cp__skeleton--title" />
                <div className="cp__skeleton cp__skeleton--title" style={{ width: "60%" }} />
                <div className="cp__skeleton cp__skeleton--price" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="cp__error">
          <p>⚠️ {error}</p>
          <Link to="/">Back to Home</Link>
        </div>
      )}

      {/* Product grid */}
      {!loading && !error && (
      <div className="cp__grid">
        {products.map((product) => (
          <div key={product.id} className="cp__card">
            {product.badge && (
              <span className="cp__badge">{product.badge}</span>
            )}

            <Link to={`/product/${product.id}`} className="cp__imageLink">
              <div className="cp__imageWrapper">
                <img src={product.image} alt={product.title} className="cp__image" />
              </div>
            </Link>

            <div className="cp__info">
              <Link to={`/product/${product.id}`} className="cp__titleLink">
                <h3 className="cp__title">{product.title}</h3>
              </Link>

              <div className="cp__ratingRow">
                <div className="cp__stars">{renderStars(product.rating)}</div>
                <span className="cp__reviewCount">
                  ({product.reviewCount?.toLocaleString()})
                </span>
              </div>

              <p className="cp__price">
                <small>$</small>
                <strong>{formatPrice(product.price).replace("$", "")}</strong>
              </p>

              {product.prime && (
                <span className="cp__prime">✓ FREE Prime Delivery</span>
              )}
            </div>

            <div className="cp__actions">
              <button
                className="cp__addBtn"
                onClick={() => addToBasket(product)}
              >
                Add to Basket
              </button>
              <Link to={`/product/${product.id}`} className="cp__detailBtn">
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="cp__empty">
          <p>No products found in this category yet.</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
