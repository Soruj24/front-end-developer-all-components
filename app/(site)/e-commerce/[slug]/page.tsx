"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { ProductCard, PRODUCTS, useCart } from "@/features/ecommerce";
import { StarRating } from "@/features/ecommerce/components/StarRating";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <Link
        href="/e-commerce"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {discount && !product.badge && (
              <Badge className="absolute left-4 top-4 bg-danger text-danger-foreground">
                -{discount}%
              </Badge>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors",
                    selectedImage === i
                      ? "border-primary"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge className="mb-3 w-fit" variant="secondary">
              {product.category}
            </Badge>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount && (
              <Badge className="bg-danger/10 text-danger">Save {discount}%</Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Availability:</span>
            {product.stock > 0 ? (
              <span className="font-medium text-success">In Stock ({product.stock} left)</span>
            ) : (
              <span className="font-medium text-danger">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              onClick={() => cart.addItem(product, quantity)}
              disabled={product.stock === 0}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-10">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Related Products
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={cart.addItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
