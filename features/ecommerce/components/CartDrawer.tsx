"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { CartItem } from "./CartItem";
import { CartFreeShippingBar } from "./CartFreeShippingBar";
import { CartGiftOptions } from "./CartGiftOptions";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = subtotal + giftWrapCost;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-overlay transition-opacity"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Shopping cart, ${totalItems} items`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md min-w-0 flex-col bg-background shadow-modal animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <h2 className="text-base font-semibold text-foreground">Cart</h2>
            <Badge variant="secondary" size="sm" aria-label={`${totalItems} items`}>
              {totalItems}
            </Badge>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              FOCUS.ring,
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <EmptyState
              icon={
                <svg
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              }
              title="Your cart is empty"
              description="Add items to get started."
              action={
                <Link
                  href="/e-commerce"
                  onClick={onClose}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Continue shopping
                </Link>
              }
            />
          ) : (
            <div className="flex min-w-0 flex-col gap-3">
              <CartFreeShippingBar
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
                <p role="status" className="rounded-lg bg-success-soft px-3 py-2 text-center text-sm text-success">
                  You&apos;re saving <span className="font-semibold">${totalSavings.toFixed(2)}</span> on this order!
                </p>
              )}

              <CartGiftOptions
                giftWrap={giftWrap}
                giftMessage={giftMessage}
                giftWrapCost={giftWrapCost}
                onToggleGiftWrap={onToggleGiftWrap}
                onGiftMessageChange={onGiftMessageChange}
              />

              {savedItems.length > 0 && (
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Saved for later ({savedItems.length})
                  </p>
                  <ul className="flex flex-col gap-2">
                    {savedItems.slice(0, 3).map((item) => (
                      <li key={item.product.id} className="flex min-w-0 items-center gap-2">
                        <span className="min-w-0 flex-1 truncate text-xs text-foreground">
                          {item.product.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => onMoveToCart(item.product.id)}
                          className="shrink-0 rounded text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Move to cart
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-4 sm:px-6">
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">${subtotal.toFixed(2)}</dd>
              </div>
              {giftWrap && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Gift wrap</dt>
                  <dd className="font-medium text-foreground">${giftWrapCost.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border/60 pt-2">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="text-lg font-bold text-foreground">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/e-commerce/checkout");
              }}
            >
              Checkout · ${total.toFixed(2)}
            </Button>

            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure checkout with SSL encryption</span>
            </p>

            <button
              type="button"
              onClick={onClearCart}
              className="w-full rounded py-1 text-center text-xs text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
