"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { PRODUCTS } from "@/features/ecommerce/constants/product-data";
import { useCart } from "@/features/ecommerce/hooks/useCart";
import type { Product } from "@/features/ecommerce/types/ecommerce.types";

const COMPARE_KEY = "ecommerce-compare";

function getComparedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function ComparePage() {
  const [comparedIds, setComparedIds] = useState<string[]>(() => getComparedIds());
  const cart = useCart();

  const comparedProducts = comparedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const removeFromCompare = useCallback((id: string) => {
    setComparedIds((prev) => {
      const next = prev.filter((pid) => pid !== id);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setComparedIds([]);
    localStorage.removeItem(COMPARE_KEY);
  }, []);

  if (comparedProducts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <EmptyState
          icon={
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          title="No products to compare"
          description="Add products from the shop to compare them side by side."
          action={
            <Link
              href="/e-commerce"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Browse products
            </Link>
          }
        />
      </div>
    );
  }

  const allSpecLabels = Array.from(
    new Set(comparedProducts.flatMap((p) => p.specifications?.map((s) => s.label) || []))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex min-w-0 flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Store
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Compare products</h1>
          <p role="status" aria-live="polite" className="mt-1.5 text-sm text-muted-foreground">
            {comparedProducts.length} product{comparedProducts.length !== 1 ? "s" : ""} selected
          </p>
        </div>
        <Button variant="outline" onClick={clearAll}>
          Clear all
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border/60 bg-background shadow-sm">
        <table className="w-full min-w-[640px]">
          <caption className="sr-only">
            Side-by-side comparison of {comparedProducts.length} products
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-48 p-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Feature</th>
              {comparedProducts.map((product) => (
                <th key={product.id} scope="col" className="min-w-44 p-4 text-center">
                  <div className="relative mx-auto mb-3 h-32 w-32">
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      aria-label={`Remove ${product.title} from comparison`}
                      className={cn(
                        "absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground",
                        FOCUS.ring,
                      )}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <Link
                    href={`/e-commerce/${product.slug}`}
                    className="rounded text-sm font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border/60">
              <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">Rating</th>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    <svg className="h-4 w-4 text-warning" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="sr-only">out of 5,</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{product.reviewCount} reviews</p>
                </td>
              ))}
            </tr>
            <tr className="border-t border-border/60">
              <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">Category</th>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm text-foreground">{product.category}</td>
              ))}
            </tr>
            <tr className="border-t border-border/60">
              <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">Availability</th>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <Badge variant={product.stock > 0 ? "secondary" : "error"} size="sm">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </Badge>
                </td>
              ))}
            </tr>
            <tr className="border-t border-border/60">
              <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">Shipping</th>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm">
                  {product.shipping?.freeShipping ? (
                    <span className="font-medium text-success">Free</span>
                  ) : (
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  )}
                </td>
              ))}
            </tr>
            {allSpecLabels.map((label) => (
              <tr key={label} className="border-t border-border/60">
                <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">{label}</th>
                {comparedProducts.map((product) => {
                  const spec = product.specifications?.find((s) => s.label === label);
                  return (
                    <td key={product.id} className="p-4 text-center text-sm text-foreground">
                      {spec ? spec.value : <span className="text-muted-foreground" aria-label="Not specified">—</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t border-border/60">
              <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">Action</th>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <Button
                    size="sm"
                    onClick={() => cart.addItem(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
