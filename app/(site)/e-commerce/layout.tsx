"use client";

import { useState, useEffect } from "react";
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <EcommerceTopBar />
      <EcommerceNavbar
        totalItems={hydrated ? cart.totalItems : 0}
        wishlistCount={hydrated ? cart.wishlist.length : 0}
        onCartClick={() => setCartOpen(true)}
      />
      <main className="flex-1">{children}</main>
      <EcommerceFooter />
      <CartDrawer
        items={cart.items}
        savedItems={cart.savedItems}
        totalItems={cart.totalItems}
        subtotal={cart.subtotal}
        totalSavings={cart.totalSavings}
        giftWrap={cart.giftWrap}
        giftMessage={cart.giftMessage}
        giftWrapCost={cart.giftWrapCost}
        hasFreeShipping={cart.hasFreeShipping}
        amountToFreeShipping={cart.amountToFreeShipping}
        freeShippingThreshold={cart.freeShippingThreshold}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onSaveForLater={cart.saveForLater}
        onMoveToCart={cart.moveToCart}
        onToggleGiftWrap={cart.toggleGiftWrap}
        onGiftMessageChange={cart.setGiftMessageText}
        onClearCart={cart.clearCart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
