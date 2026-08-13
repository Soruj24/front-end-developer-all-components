"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { CartItem, ShippingOption, PromoCode } from "../types/ecommerce.types";

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  totalSavings: number;
  giftWrapCost?: number;
  className?: string;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", name: "Standard Shipping", price: 0, estimatedDays: "5-7 business days", icon: "📦" },
  { id: "express", name: "Express Shipping", price: 9.99, estimatedDays: "2-3 business days", icon: "🚚" },
  { id: "overnight", name: "Overnight Shipping", price: 19.99, estimatedDays: "Next business day", icon: "✈️" },
];

const PROMO_CODES: PromoCode[] = [
  { code: "SAVE10", discount: 10, type: "percentage", minPurchase: 50 },
  { code: "FLAT20", discount: 20, type: "fixed", minPurchase: 100 },
  { code: "WELCOME15", discount: 15, type: "percentage" },
];

export function CartSummary({
  items,
  subtotal,
  totalSavings,
  giftWrapCost = 0,
  className,
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("standard");

  const shippingCost = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.price || 0;
  const hasFreeShipping = items.some((i) => i.product.shipping?.freeShipping);
  const effectiveShipping = hasFreeShipping && selectedShipping === "standard" ? 0 : shippingCost;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      discount = (subtotal * appliedPromo.discount) / 100;
      if (appliedPromo.maxDiscount) {
        discount = Math.min(discount, appliedPromo.maxDiscount);
      }
    } else {
      discount = appliedPromo.discount;
    }
  }

  const total = subtotal - discount + effectiveShipping + giftWrapCost;

  const handleApplyPromo = () => {
    setPromoError("");
    const promo = PROMO_CODES.find(
      (p) => p.code.toLowerCase() === promoCode.toLowerCase()
    );
    if (promo) {
      if (promo.minPurchase && subtotal < promo.minPurchase) {
        setPromoError(`Minimum purchase of $${promo.minPurchase} required`);
        return;
      }
      setAppliedPromo(promo);
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className={cn("rounded-xl border border-border/50 bg-background p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Item Savings</span>
            <span className="font-medium">-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Promo ({appliedPromo?.code})</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        {giftWrapCost > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gift wrap</span>
            <span className="font-medium text-foreground">${giftWrapCost.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {effectiveShipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${effectiveShipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="border-t border-border/50 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Shipping Method</p>
          <div className="space-y-2">
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                  selectedShipping === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-border"
                )}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedShipping === option.id}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                  className="accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {option.name}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {hasFreeShipping && option.id === "standard" ? (
                        <span className="text-green-600">Free</span>
                      ) : option.price === 0 ? (
                        "Free"
                      ) : (
                        `$${option.price.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{option.estimatedDays}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Promo Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={!!appliedPromo}
            />
            {appliedPromo ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAppliedPromo(null);
                  setPromoCode("");
                }}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim()}
              >
                Apply
              </Button>
            )}
          </div>
          {promoError && (
            <p className="mt-1 text-xs text-red-500">{promoError}</p>
          )}
          {appliedPromo && (
            <p className="mt-1 text-xs text-green-600">
              {appliedPromo.type === "percentage"
                ? `${appliedPromo.discount}% discount applied`
                : `$${appliedPromo.discount} discount applied`}
            </p>
          )}
          <p className="mt-1.5 text-xs text-muted-foreground">
            Try: SAVE10, FLAT20, WELCOME15
          </p>
        </div>
      </div>

      <Button className="mt-6 w-full" size="lg">
        Proceed to Checkout
      </Button>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: "🔒", label: "Secure" },
          { icon: "🚚", label: "Fast Shipping" },
          { icon: "↩️", label: "Easy Returns" },
        ].map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 px-2 py-2.5"
          >
            <span className="text-base">{badge.icon}</span>
            <span className="text-[10px] font-medium text-muted-foreground">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
