import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  fetchProductById,
} from "../api/productsAPI";

/**
 * useProducts()
 * Returns all products fetched from DummyJSON.
 * Can optionally filter by our app category ID.
 *
 * @param {string} [categoryId] - optional filter by app category
 * @returns {{ products: Array, loading: boolean, error: string|null }}
 */
export function useProducts(categoryId = null) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllProducts()
      .then((all) => {
        if (cancelled) return;
        const filtered = categoryId
          ? all.filter((p) => p.category === categoryId)
          : all;
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load products");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [categoryId]);

  return { products, loading, error };
}

/**
 * useProduct(id)
 * Returns a single product by its ID.
 *
 * @param {string|number} id
 * @returns {{ product: Object|null, loading: boolean, error: string|null }}
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);

    fetchProductById(id)
      .then((data) => {
        if (!cancelled) { setProduct(data); setLoading(false); }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Product not found");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}
