"use client";

import { useState } from "react";
import { EcommerceNavbar } from "@/features/ecommerce/components/EcommerceNavbar";
import { EcommerceTopBar } from "@/features/ecommerce/components/EcommerceTopBar";
import { EcommerceFooter } from "@/features/ecommerce/components/EcommerceFooter";
import { CartDrawer, useCart } from "@/features/ecommerce";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <EcommerceTopBar />
      <EcommerceNavbar
        totalItems={cart.totalItems}
        wishlistCount={cart.wishlist.length}
        onCartClick={() => setCartOpen(true)}
      />
      <main className="flex-1">{children}</main>
      <EcommerceFooter />
      <CartDrawer
        items={cart.items}
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onClearCart={cart.clearCart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
