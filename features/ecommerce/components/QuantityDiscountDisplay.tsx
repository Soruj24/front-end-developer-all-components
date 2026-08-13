"use client";

import { cn } from "@/lib/cn";
import type { QuantityDiscount } from "../types/ecommerce.types";

interface QuantityDiscountDisplayProps {
  discounts: QuantityDiscount[];
  currentQuantity?: number;
  className?: string;
}

export function QuantityDiscountDisplay({
  discounts,
  currentQuantity = 1,
  className,
}: QuantityDiscountDisplayProps) {
  if (!discounts || discounts.length === 0) return null;

  return (
    <div className={cn("rounded-xl border border-green-200 bg-green-50 p-4", className)}>
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <p className="text-sm font-semibold text-green-800">Bulk Discounts Available</p>
      </div>
      <div className="space-y-2">
        {discounts.map((discount) => {
          const isActive = currentQuantity >= discount.minQuantity;
          return (
            <div
              key={discount.minQuantity}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                isActive ? "bg-green-100 text-green-800" : "bg-white text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {isActive ? (
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
                <span className={cn(isActive && "font-medium")}>{discount.label}</span>
              </div>
              <span className={cn("font-semibold", isActive ? "text-green-600" : "text-muted-foreground")}>
                {discount.discountPercent}% off
              </span>
            </div>
          );
        })}
      </div>
      {currentQuantity > 1 && (
        <p className="mt-2 text-xs text-green-700">
          Your quantity: {currentQuantity} — {discounts.some((d) => currentQuantity >= d.minQuantity) ? "Discount applied!" : `Add ${discounts[0].minQuantity - currentQuantity} more to save`}
        </p>
      )}
    </div>
  );
}
