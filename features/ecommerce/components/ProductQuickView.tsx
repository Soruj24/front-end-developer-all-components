"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { StarRating } from "./StarRating";
import { ProductWishlistButton } from "./ProductWishlistButton";
import type { Product } from "../types/ecommerce.types";

interface ProductQuickViewProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-4 z-50 mx-auto my-auto flex max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-1 bg-muted/30 sm:max-w-md">
            <div className="relative aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      i === selectedImage ? "bg-primary" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
            {discount && (
              <Badge className="absolute left-3 top-3 bg-danger text-danger-foreground">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <Badge className="mb-2 w-fit" variant="secondary">
              {product.category}
            </Badge>
            <h2 className="text-xl font-bold text-foreground">{product.title}</h2>

            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {product.description}
            </p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-2 text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} left)</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>

            {product.shipping?.freeShipping && (
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <ProductWishlistButton
                  isWishlisted={isWishlisted}
                  onToggle={onToggleWishlist}
                  size="sm"
                />
              </div>

              <Button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="w-full"
                size="lg"
              >
                Add to Cart
              </Button>

              <Link
                href={`/e-commerce/${product.slug}`}
                onClick={onClose}
                className="text-center text-sm text-primary hover:underline"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
