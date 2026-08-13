"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { StarRating } from "./StarRating";
import type { Product } from "../types/ecommerce.types";

interface RecentlyViewedProductsProps {
  products: Product[];
  className?: string;
}

export function RecentlyViewedProducts({
  products,
  className,
}: RecentlyViewedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold text-foreground">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/e-commerce/${product.slug}`}
            className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-xl border border-border/50 bg-background transition-all hover:shadow-md hover:shadow-black/5"
          >
            <div className="relative aspect-square overflow-hidden bg-muted/30">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="192px"
              />
            </div>
            <div className="p-3">
              <h4 className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary">
                {product.title}
              </h4>
              <div className="mt-1.5 flex items-center gap-1">
                <StarRating rating={product.rating} size="sm" />
                <span className="text-[10px] text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
