"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CartItem as CartItemType } from "../types/ecommerce.types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onSaveForLater?: (productId: string) => void;
  className?: string;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  className,
}: CartItemProps) {
  const { product, quantity, selectedVariant } = item;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const stockWarning = product.stock <= 5;
  const maxReached = quantity >= product.stock;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border/50 bg-background p-3 transition-all hover:border-border",
        className
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted/30">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="80px"
        />
        {hasDiscount && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-foreground line-clamp-1">
              {product.title}
            </h4>
            {selectedVariant && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {selectedVariant.type}: {selectedVariant.value}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
            aria-label="Remove item"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {stockWarning && (
          <p className="mt-0.5 text-xs text-amber-600">
            {product.stock === 0
              ? "Out of stock"
              : `Only ${product.stock} left in stock`}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                quantity <= 1
                  ? "border-border/50 text-muted-foreground/50 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={maxReached}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                maxReached
                  ? "border-border/50 text-muted-foreground/50 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onSaveForLater && (
              <button
                onClick={() => onSaveForLater(product.id)}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Save for later
              </button>
            )}
            <span className="text-sm font-semibold text-foreground">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
