import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import Product from "./Product";
import { Link } from "react-router-dom";
import { CATEGORIES } from "./productsData";
import { useProducts } from "./hooks/useProducts";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ── Hero carousel slides ───────────────────────────────────────────────────────
const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=85",
    title: "Shop Today's Best Deals",
    subtitle: "Hundreds of limited-time offers across every category",
    cta: "See All Deals",
    ctaLink: "/category/electronics",
    overlay: "rgba(10,20,40,0.52)",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&auto=format&fit=crop&q=85",
    title: "Electronics & Gadgets",
    subtitle: "The latest smartphones, laptops, and smart devices",
    cta: "Explore Electronics",
    ctaLink: "/category/electronics",
    overlay: "rgba(0,10,30,0.50)",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85",
    title: "Fashion Favourites",
    subtitle: "Curated styles for every occasion — men's, women's & more",
    cta: "Browse Fashion",
    ctaLink: "/category/fashion",
    overlay: "rgba(20,5,5,0.48)",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop&q=85",
    title: "Home & Kitchen",
    subtitle: "Transform your space with top-rated home essentials",
    cta: "Shop Home",
    ctaLink: "/category/home-kitchen",
    overlay: "rgba(0,15,20,0.45)",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=85",
    title: "Beauty & Skincare",
    subtitle: "Premium beauty products loved by millions",
    cta: "Shop Beauty",
    ctaLink: "/category/beauty",
    overlay: "rgba(30,0,20,0.45)",
  },
];

// Group products by section for home page rows
// (Now derived from live API data inside the Home component)

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (idx) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((idx + SLIDES.length) % SLIDES.length);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = SLIDES[current];

  return (
    <div className="hero">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero__slide ${i === current ? "hero__slide--active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(${
              s.overlay
            }, ${s.overlay}), url('${s.image}')`,
          }}
        />
      ))}

      {/* Overlay text */}
      <div className="hero__content">
        <div className="hero__text">
          <h2 className="hero__title">{slide.title}</h2>
          <p className="hero__subtitle">{slide.subtitle}</p>
          <Link to={slide.ctaLink} className="hero__cta">
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        className="hero__arrow hero__arrow--left"
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon style={{ fontSize: 36 }} />
      </button>
      <button
        className="hero__arrow hero__arrow--right"
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
      >
        <ChevronRightIcon style={{ fontSize: 36 }} />
      </button>

      {/* Dot indicators */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hero__progress" key={current} />
    </div>
  );
}

function ProductRow({ products, loading }) {
  if (loading) {
    return (
      <div className="home__row">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="product product--skeleton">
            <div className="skeleton skeleton--image" />
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--price" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="home__row">
      {products.map((p) => (
        <Product key={p.id} id={p.id} title={p.title} price={p.price} rating={p.rating} image={p.image} />
      ))}
    </div>
  );
}

function Home() {
  const { products, loading, error } = useProducts();

  const topPicks   = products.filter((p) => p.category === "electronics").slice(0, 4);
  const fashion    = products.filter((p) => p.category === "fashion").slice(0, 4);
  const beauty     = products.filter((p) => p.category === "beauty").slice(0, 4);
  const homeKitch  = products.filter((p) => p.category === "home-kitchen").slice(0, 4);
  const deals      = products.filter((p) => p.badge === "Deal" || p.badge === "Top Rated").slice(0, 4);
  const sports     = products.filter((p) => p.category === "sports").slice(0, 4);

  return (
    <div className="home">
      {/* ── Animated Hero Carousel ── */}
      <HeroCarousel />

      <div className="home__section">
        {error && (
          <p style={{ color: "red", padding: "16px" }}>
            Could not load products: {error}
          </p>
        )}

        {/* ── Shop by Category ── */}
        <h2 className="home__sectionTitle">Shop by Category</h2>
        <div className="home__categories">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="home__catCard"
              style={{ borderTopColor: cat.color }}
            >
              <span className="home__catEmoji">{cat.emoji}</span>
              <span className="home__catLabel">{cat.label}</span>
              <span className="home__catShop" style={{ color: cat.color }}>
                Shop now &rsaquo;
              </span>
            </Link>
          ))}
        </div>

        {/* ── Electronics ── */}
        <h2 className="home__sectionTitle">Electronics &amp; Gadgets</h2>
        <ProductRow products={topPicks} loading={loading} />

        {/* ── Fashion ── */}
        <h2 className="home__sectionTitle">Fashion Favourites</h2>
        <ProductRow products={fashion} loading={loading} />

        {/* ── Beauty ── */}
        <h2 className="home__sectionTitle">Beauty &amp; Skincare</h2>
        <ProductRow products={beauty} loading={loading} />

        {/* ── Deals ── */}
        <h2 className="home__sectionTitle">Today's Best Deals</h2>
        <ProductRow products={deals} loading={loading} />

        {/* ── Home & Kitchen ── */}
        <h2 className="home__sectionTitle">Home &amp; Kitchen</h2>
        <ProductRow products={homeKitch} loading={loading} />

        {/* ── Sports ── */}
        <h2 className="home__sectionTitle">Sports &amp; Fitness</h2>
        <ProductRow products={sports} loading={loading} />
      </div>
    </div>
  );
}

export default Home;
