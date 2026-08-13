"use client";

import { useState, useCallback, useEffect } from "react";
import type { CartItem, Product } from "../types/ecommerce.types";

const CART_KEY = "ecommerce-cart";
const WISHLIST_KEY = "ecommerce-wishlist";
const RECENT_KEY = "ecommerce-recent";
const MAX_RECENT = 10;

function loadFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage<CartItem[]>(CART_KEY) || []);
    setWishlist(loadFromStorage<string[]>(WISHLIST_KEY) || []);
    setRecentlyViewed(loadFromStorage<string[]>(RECENT_KEY) || []);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(CART_KEY, items);
  }, [items, loaded]);

  useEffect(() => {
    if (loaded) saveToStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, loaded]);

  useEffect(() => {
    if (loaded) saveToStorage(RECENT_KEY, recentlyViewed);
  }, [recentlyViewed, loaded]);

  const addItem = useCallback((product: Product, quantity = 1, variant?: { type: string; value: string }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedVariant?.value === variant?.value
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedVariant?.value === variant?.value
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const totalSavings = items.reduce(
    (sum, i) =>
      sum +
      (i.product.originalPrice
        ? (i.product.originalPrice - i.product.price) * i.quantity
        : 0),
    0
  );

  return {
    items,
    loaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    totalPrice: subtotal,
    totalSavings,
    wishlist,
    toggleWishlist,
    isInWishlist,
    recentlyViewed,
    addRecentlyViewed,
  };
}
