"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addItem, openCart } from "@/features/ecommerce/slices/cartSlice";
import { toggleWishlist } from "@/features/ecommerce/slices/wishlistSlice";
import { addToast } from "@/features/ecommerce/slices/toastSlice";
import { StarRating } from "./StarRating";
import type { DummyjsonProduct } from "@/features/ecommerce/types/dummyjson.types";

const SPECS: Array<{ label: string; get: (p: DummyjsonProduct) => string }> = [
  { label: "Brand", get: (p) => p.brand },
  { label: "SKU", get: (p) => p.sku },
  { label: "Warranty", get: (p) => p.warrantyInformation },
  { label: "Shipping", get: (p) => p.shippingInformation },
  { label: "Return", get: (p) => p.returnPolicy },
  { label: "Min Order", get: (p) => `${p.minimumOrderQuantity} units` },
];

export function ProductDetail({ product, onClose }: { product: DummyjsonProduct; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const discount = Math.round(product.discountPercentage);
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const isWishlisted = useAppSelector((s) => s.wishlist.ids.includes(product.id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const handleAdd = useCallback(() => {
    for (let i = 0; i < qty; i++) dispatch(addItem(product));
    dispatch(addToast({ message: `${qty}x ${product.title} added to cart`, type: "success" }));
    dispatch(openCart());
  }, [dispatch, product, qty]);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-40 bg-overlay" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        className="fixed inset-x-4 top-[2vh] bottom-[2vh] z-50 mx-auto flex w-auto max-w-4xl min-w-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-background shadow-modal sm:inset-x-6"
      >
        <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[13px] text-muted-foreground">
            <Link href="/e-commerce" className="shrink-0 rounded transition-colors hover:text-foreground">
              Store
            </Link>
            <span aria-hidden="true" className="shrink-0 text-border">/</span>
            <span className="shrink-0 truncate">{product.category}</span>
            <span aria-hidden="true" className="shrink-0 text-border">/</span>
            <span aria-current="page" className="min-w-0 truncate font-medium text-foreground">
              {product.title}
            </span>
          </nav>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              FOCUS.ring,
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex min-w-0 flex-col gap-6 lg:flex-row">
            <div className="flex min-w-0 flex-col gap-3 lg:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src={product.images[activeImage] || product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-md bg-danger px-2 py-0.5 text-[11px] font-semibold text-white">
                    -{discount}%
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Product images">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-pressed={activeImage === i}
                      className={cn(
                        "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                        FOCUS.ring,
                        activeImage === i ? "border-primary" : "border-border/60",
                      )}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground">{product.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                {SPECS.map((spec) => (
                  <div key={spec.label} className="min-w-0 rounded-lg bg-muted/50 px-3 py-2">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="truncate font-medium text-foreground">{spec.get(product)}</dd>
                  </div>
                ))}
              </dl>

              {product.reviews.length > 0 && (
                <section aria-label="Reviews" className="flex min-w-0 flex-col gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Reviews ({product.reviews.length})
                  </h3>
                  <ul className="flex max-h-48 min-w-0 flex-col gap-2 overflow-y-auto">
                    {product.reviews.map((r, i) => (
                      <li key={i} className="rounded-lg border border-border/60 p-3 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-medium text-foreground">{r.reviewerName}</span>
                          <StarRating rating={r.rating} />
                        </div>
                        <p className="mt-1 text-muted-foreground">{r.comment}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {new Date(r.date).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border/60 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${(product.price * qty).toFixed(2)}</span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${(Number(originalPrice) * qty).toFixed(2)}
              </span>
            )}
            {qty > 1 && (
              <span className="hidden text-xs text-muted-foreground sm:inline">
                (${product.price.toFixed(2)} each)
              </span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(toggleWishlist(product.id))}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={isWishlisted}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-md border transition-colors",
                FOCUS.ring,
                isWishlisted
                  ? "border-danger/30 bg-danger-soft text-danger"
                  : "border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <svg className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <div className="flex items-center rounded-md border border-border/60" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-l-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-medium" role="status" aria-label={`Quantity ${qty}`}>
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
