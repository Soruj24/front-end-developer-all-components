"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CartItem } from "../types/ecommerce.types";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => boolean;
  onRemovePromo?: () => void;
  className?: string;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  shippingCost,
  tax,
  discount,
  total,
  promoCode,
  onApplyPromo,
  onRemovePromo,
  className,
}: CheckoutOrderSummaryProps) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess(false);
    if (!promoInput.trim()) return;
    const result = onApplyPromo?.(promoInput.trim());
    if (result === false) {
      setPromoError("Invalid promo code");
    } else {
      setPromoSuccess(true);
      setPromoInput("");
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const savings = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className={cn("rounded-xl border border-border/50 bg-background", className)}>
      <div className="border-b border-border/50 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Order Summary</h3>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto px-5 py-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.product.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price.toFixed(2)} each
                  {item.quantity > 1 && ` x ${item.quantity}`}
                </p>
              </div>
              <p className="text-sm font-medium text-foreground">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 px-5 py-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Item Savings</span>
            <span className="font-medium">-${savings.toFixed(2)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Promo Discount</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">-${discount.toFixed(2)}</span>
              <button
                onClick={onRemovePromo}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className="border-t border-border/50 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {!promoCode && (
        <div className="border-t border-border/50 px-5 py-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Promo Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError("");
                setPromoSuccess(false);
              }}
              placeholder="Enter code"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleApplyPromo}
              disabled={!promoInput.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="mt-1.5 text-xs text-red-500">{promoError}</p>}
          {promoSuccess && (
            <p className="mt-1.5 text-xs text-green-600">Promo code applied!</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Try: SAVE10, WELCOME20, FLAT15
          </p>
        </div>
      )}

      <div className="border-t border-border/50 px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}
