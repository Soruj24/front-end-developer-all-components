"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { StarRating } from "./StarRating";
import type { DummyjsonProduct } from "@/features/ecommerce/types/dummyjson.types";

interface ProductCardProps {
  product: DummyjsonProduct;
  onView: () => void;
  onAdd: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export function ProductCard({ product, onView, onAdd, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const discount = Math.round(product.discountPercentage);
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const stockLabel =
    product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock";
  const stockClass =
    product.stock > 10 ? "text-success" : product.stock > 0 ? "text-warning" : "text-danger";

  return (
    <div className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-surface shadow-sm transition-colors hover:border-ring/40">
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <button
          type="button"
          onClick={onView}
          aria-label={`View ${product.title}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <Image
            src={product.thumbnail}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </button>
        {discount > 0 && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-danger px-2 py-0.5 text-[11px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={isWishlisted}
          className={cn(
            "absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            FOCUS.ring,
            isWishlisted
              ? "bg-danger text-white"
              : "bg-background/80 text-muted-foreground hover:text-danger",
          )}
        >
          <svg className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {product.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <StarRating rating={product.rating} />
        <h3 className="line-clamp-2 min-w-0 text-sm font-semibold text-foreground">{product.title}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">${originalPrice}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className={stockClass} role="status">{stockLabel}</span>
          <span className="truncate text-muted-foreground">{product.brand}</span>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={product.stock === 0}
          className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
