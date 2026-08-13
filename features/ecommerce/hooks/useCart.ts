"use client";

import { useState, useCallback, useEffect } from "react";
import type { CartItem, Product } from "../types/ecommerce.types";

const CART_KEY = "ecommerce-cart";
const WISHLIST_KEY = "ecommerce-wishlist";
const RECENT_KEY = "ecommerce-recent";
const SAVED_KEY = "ecommerce-saved";
const GIFT_KEY = "ecommerce-gift";
const MAX_RECENT = 10;
const MAX_QUANTITY = 99;

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

let cachedInitial: {
  items: CartItem[];
  savedItems: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  giftWrap: boolean;
  giftMessage: string;
} | null = null;

function getInitialData() {
  if (cachedInitial) return cachedInitial;
  if (typeof window === "undefined") {
    return { items: [], savedItems: [], wishlist: [], recentlyViewed: [], giftWrap: false, giftMessage: "" };
  }
  const gift = loadFromStorage<{ enabled: boolean; message: string }>(GIFT_KEY);
  cachedInitial = {
    items: loadFromStorage<CartItem[]>(CART_KEY) || [],
    savedItems: loadFromStorage<CartItem[]>(SAVED_KEY) || [],
    wishlist: loadFromStorage<string[]>(WISHLIST_KEY) || [],
    recentlyViewed: loadFromStorage<string[]>(RECENT_KEY) || [],
    giftWrap: gift?.enabled ?? false,
    giftMessage: gift?.message ?? "",
  };
  return cachedInitial;
}

function initItems() { return getInitialData().items; }
function initSavedItems() { return getInitialData().savedItems; }
function initWishlist() { return getInitialData().wishlist; }
function initRecentlyViewed() { return getInitialData().recentlyViewed; }
function initGiftWrap() { return getInitialData().giftWrap; }
function initGiftMessage() { return getInitialData().giftMessage; }

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(initItems);
  const [savedItems, setSavedItems] = useState<CartItem[]>(initSavedItems);
  const [wishlist, setWishlist] = useState<string[]>(initWishlist);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(initRecentlyViewed);
  const [giftWrap, setGiftWrap] = useState(initGiftWrap);
  const [giftMessage, setGiftMessage] = useState(initGiftMessage);
  const [loaded] = useState(true);

  useEffect(() => {
    saveToStorage(CART_KEY, items);
  }, [items]);

  useEffect(() => {
    saveToStorage(SAVED_KEY, savedItems);
  }, [savedItems]);

  useEffect(() => {
    saveToStorage(WISHLIST_KEY, wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveToStorage(RECENT_KEY, recentlyViewed);
  }, [recentlyViewed]);

  useEffect(() => {
    saveToStorage(GIFT_KEY, { enabled: giftWrap, message: giftMessage });
  }, [giftWrap, giftMessage]);

  const addItem = useCallback(
    (product: Product, quantity = 1, variant?: { type: string; value: string }) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedVariant?.value === variant?.value
        );
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, MAX_QUANTITY);
          return prev.map((i) =>
            i.product.id === product.id &&
            i.selectedVariant?.value === variant?.value
              ? { ...i, quantity: newQty }
              : i
          );
        }
        return [
          ...prev,
          { product, quantity: Math.min(quantity, MAX_QUANTITY), selectedVariant: variant },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, variant?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          i.product.id !== productId ||
          (variant && i.selectedVariant?.value !== variant)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter(
          (i) =>
            i.product.id !== productId ||
            (variant && i.selectedVariant?.value !== variant)
        )
      );
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId &&
        (!variant || i.selectedVariant?.value === variant)
          ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const saveForLater = useCallback(
    (productId: string, variant?: string) => {
      const item = items.find(
        (i) =>
          i.product.id === productId &&
          (!variant || i.selectedVariant?.value === variant)
      );
      if (!item) return;
      setSavedItems((prev) => {
        const exists = prev.some(
          (i) =>
            i.product.id === item.product.id &&
            i.selectedVariant?.value === item.selectedVariant?.value
        );
        if (exists) return prev;
        return [...prev, item];
      });
      removeItem(productId, variant);
    },
    [items, removeItem]
  );

  const moveToCart = useCallback(
    (productId: string, variant?: string) => {
      const item = savedItems.find(
        (i) =>
          i.product.id === productId &&
          (!variant || i.selectedVariant?.value === variant)
      );
      if (!item) return;
      addItem(item.product, item.quantity, item.selectedVariant);
      setSavedItems((prev) =>
        prev.filter(
          (i) =>
            i.product.id !== productId ||
            (variant && i.selectedVariant?.value !== variant)
        )
      );
    },
    [savedItems, addItem]
  );

  const removeSaved = useCallback((productId: string, variant?: string) => {
    setSavedItems((prev) =>
      prev.filter(
        (i) =>
          i.product.id !== productId ||
          (variant && i.selectedVariant?.value !== variant)
      )
    );
  }, []);

  const toggleGiftWrap = useCallback(() => {
    setGiftWrap((prev) => !prev);
  }, []);

  const setGiftMessageText = useCallback((msg: string) => {
    setGiftMessage(msg);
  }, []);

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
  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const giftWrapCost = giftWrap ? 5.99 : 0;

  return {
    items,
    savedItems,
    loaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    removeSaved,
    totalItems,
    subtotal,
    totalPrice: subtotal + giftWrapCost,
    totalSavings,
    giftWrap,
    giftMessage,
    giftWrapCost,
    toggleGiftWrap,
    setGiftMessageText,
    freeShippingThreshold,
    amountToFreeShipping,
    hasFreeShipping,
    wishlist,
    toggleWishlist,
    isInWishlist,
    recentlyViewed,
    addRecentlyViewed,
  };
}
