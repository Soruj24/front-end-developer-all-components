import { useState, useCallback } from "react";
import type { CartItem } from "../types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((id: number, name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, name, price, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      return prev.filter((c) => c.id !== id);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const deliveryFee = cartTotal > 30 ? 0 : 4.99;
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  return { cart, addToCart, removeFromCart, clearCart, cartTotal, deliveryFee, itemCount };
}
