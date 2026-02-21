/**
 * productsAPI.js
 * Fetches products from DummyJSON (https://dummyjson.com) — a free,
 * CDN-backed product API with real images, descriptions, and ratings.
 *
 * DummyJSON CDN images: https://cdn.dummyjson.com/products/images/...
 * API docs: https://dummyjson.com/docs/products
 */

const BASE = "https://dummyjson.com";

// ── Category mapping ─────────────────────────────────────────────────────────
// Maps DummyJSON category slugs → our app category IDs
export const DUMMYJSON_CATEGORY_MAP = {
  // Electronics
  smartphones:            "electronics",
  laptops:                "electronics",
  tablets:                "electronics",
  "mobile-accessories":   "electronics",
  "computer-accessories": "electronics",

  // Fashion
  "mens-shirts":    "fashion",
  "womens-dresses": "fashion",
  "womens-tops":    "fashion",
  tops:             "fashion",
  "mens-shoes":     "fashion",
  "womens-shoes":   "fashion",
  "mens-jackets":   "fashion",

  // Home & Kitchen
  furniture:              "home-kitchen",
  "home-decoration":      "home-kitchen",
  "kitchen-accessories":  "home-kitchen",

  // Sports
  "sports-accessories": "sports",

  // Jewelry
  "womens-jewellery": "jewelry",

  // Accessories / Everything else
  "womens-bags":    "accessories",
  "mens-watches":   "accessories",
  "womens-watches": "accessories",
  sunglasses:       "accessories",
  "mens-grooming":  "accessories",

  // Beauty
  beauty:     "beauty",
  fragrances: "beauty",
  skincare:   "beauty",
};

// ── Badge logic ───────────────────────────────────────────────────────────────
function getBadge(p) {
  if (p.rating >= 4.8)           return "Top Rated";
  if (p.discountPercentage >= 20) return "Deal";
  if (p.stock <= 5)               return "Low Stock";
  if (p.stock > 100)              return "Best Seller";
  return null;
}

// ── Map raw DummyJSON product → our app schema ───────────────────────────────
function mapProduct(p) {
  const appCategory = DUMMYJSON_CATEGORY_MAP[p.category] || "accessories";
  return {
    id:          String(p.id),
    category:    appCategory,
    title:       p.title,
    brand:       p.brand  || "",
    price:       p.price,
    rating:      Math.min(5, Math.round(p.rating)),   // 1–5 integer for star display
    reviewCount: (p.reviews?.length || 1) * 312 + Math.floor(Math.random() * 500),
    image:       p.thumbnail,
    images:      Array.isArray(p.images) && p.images.length ? p.images : [p.thumbnail],
    badge:       getBadge(p),
    description: p.description,
    features: [
      p.brand             ? `Brand: ${p.brand}`                    : null,
      p.warrantyInformation                                         || null,
      p.shippingInformation                                         || null,
      p.returnPolicy                                                || null,
      p.stock !== undefined ? `${p.stock} units in stock`          : null,
      p.sku               ? `SKU: ${p.sku}`                        : null,
    ].filter(Boolean),
    inStock: p.availabilityStatus !== "Out of Stock" && p.stock > 0,
    prime:   p.price < 100 || (p.shippingInformation || "").toLowerCase().includes("overnight"),
  };
}

// ── Cache helpers ─────────────────────────────────────────────────────────────
const CACHE_KEY = "dummyjson_v2_products";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data;
  } catch (_) {}
  return null;
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch (_) {}
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all products (up to 194) from DummyJSON, mapped to our schema.
 * Results are cached in localStorage for 1 hour.
 */
export async function fetchAllProducts() {
  const cached = readCache();
  if (cached) return cached;

  const res  = await fetch(`${BASE}/products?limit=194&select=id,title,description,category,price,rating,stock,discountPercentage,brand,thumbnail,images,sku,warrantyInformation,shippingInformation,returnPolicy,availabilityStatus,reviews,tags`);
  if (!res.ok) throw new Error(`DummyJSON error: ${res.status}`);
  const json = await res.json();
  const data = json.products.map(mapProduct);
  writeCache(data);
  return data;
}

/**
 * Fetch a single product by its DummyJSON numeric ID (or string ID).
 * Falls back to cached all-products list if available.
 */
export async function fetchProductById(id) {
  // Try cache first
  const cached = readCache();
  if (cached) {
    const found = cached.find((p) => p.id === String(id));
    if (found) return found;
  }

  const res  = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  const json = await res.json();
  return mapProduct(json);
}

/**
 * Filter cached (or fetched) products by our app category ID.
 */
export async function fetchProductsByCategory(categoryId) {
  const all = await fetchAllProducts();
  return all.filter((p) => p.category === categoryId);
}
