"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { StarRating } from "./StarRating";
import type { Product } from "../types/ecommerce.types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background",
        "transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <Link href={`/e-commerce/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {product.badge && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}

        {discount && !product.badge && (
          <Badge className="absolute left-3 top-3 bg-danger text-danger-foreground">
            -{discount}%
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Link href={`/e-commerce/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          <Button
            onClick={() => onAddToCart(product)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
