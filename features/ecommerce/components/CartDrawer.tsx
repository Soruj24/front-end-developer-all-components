"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { CartItem } from "./CartItem";
import type { CartItem as CartItemType } from "../types/ecommerce.types";

interface CartDrawerProps {
  items: CartItemType[];
  savedItems: CartItemType[];
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  giftWrap: boolean;
  giftMessage: string;
  giftWrapCost: number;
  hasFreeShipping: boolean;
  amountToFreeShipping: number;
  freeShippingThreshold: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onSaveForLater: (productId: string) => void;
  onMoveToCart: (productId: string) => void;
  onToggleGiftWrap: () => void;
  onGiftMessageChange: (msg: string) => void;
  onClearCart: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function FreeShippingBar({
  hasFreeShipping,
  amountToFreeShipping,
  threshold,
}: {
  hasFreeShipping: boolean;
  amountToFreeShipping: number;
  threshold: number;
}) {
  const progress = hasFreeShipping ? 100 : ((threshold - amountToFreeShipping) / threshold) * 100;

  return (
    <div className="rounded-lg bg-muted/50 px-4 py-3">
      {hasFreeShipping ? (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">You qualify for free shipping!</span>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Add <span className="font-semibold text-foreground">${amountToFreeShipping.toFixed(2)}</span> more for free shipping
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function CartDrawer({
  items,
  savedItems,
  totalItems,
  subtotal,
  totalSavings,
  giftWrap,
  giftMessage,
  giftWrapCost,
  hasFreeShipping,
  amountToFreeShipping,
  freeShippingThreshold,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  onMoveToCart,
  onToggleGiftWrap,
  onGiftMessageChange,
  onClearCart,
  isOpen,
  onClose,
}: CartDrawerProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const total = subtotal + giftWrapCost;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Cart</h2>
            <Badge variant="secondary">{totalItems}</Badge>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="mb-4 h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="mb-2 text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/70">
                Add items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <FreeShippingBar
                hasFreeShipping={hasFreeShipping}
                amountToFreeShipping={amountToFreeShipping}
                threshold={freeShippingThreshold}
              />

              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedVariant?.value || ""}`}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                  onSaveForLater={onSaveForLater}
                />
              ))}

              {totalSavings > 0 && (
                <div className="rounded-lg bg-green-500/10 px-3 py-2 text-center text-sm text-green-600">
                  You&apos;re saving <span className="font-semibold">${totalSavings.toFixed(2)}</span> on this order!
                </div>
              )}

              <div className="rounded-lg border border-border/50 p-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={onToggleGiftWrap}
                    className="accent-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">Gift wrap this order</span>
                    <span className="ml-1 text-xs text-muted-foreground">(+${giftWrapCost.toFixed(2)})</span>
                  </div>
                </label>
                {giftWrap && (
                  <input
                    type="text"
                    value={giftMessage}
                    onChange={(e) => onGiftMessageChange(e.target.value)}
                    placeholder="Add a gift message..."
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                    maxLength={200}
                  />
                )}
              </div>

              {savedItems.length > 0 && (
                <div className="rounded-lg border border-border/50 p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Saved for later ({savedItems.length})
                  </p>
                  <div className="space-y-2">
                    {savedItems.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="flex items-center gap-2">
                        <span className="flex-1 truncate text-xs text-foreground">
                          {item.product.title}
                        </span>
                        <button
                          onClick={() => onMoveToCart(item.product.id)}
                          className="shrink-0 text-xs font-medium text-primary hover:underline"
                        >
                          Move to cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 px-6 py-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              {giftWrap && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gift wrap</span>
                  <span className="font-medium text-foreground">${giftWrapCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border/50 pt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/e-commerce/checkout");
              }}
            >
              Checkout - ${total.toFixed(2)}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure checkout with SSL encryption</span>
            </div>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-red-500"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
