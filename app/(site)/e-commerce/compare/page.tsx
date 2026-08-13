"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
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
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-muted/30">
          <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">No Products to Compare</h1>
        <p className="mb-6 text-muted-foreground">Add products from the shop to compare them side by side.</p>
        <Link
          href="/e-commerce"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const allSpecLabels = Array.from(
    new Set(comparedProducts.flatMap((p) => p.specifications?.map((s) => s.label) || []))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compare Products</h1>
          <p className="text-sm text-muted-foreground">{comparedProducts.length} products selected</p>
        </div>
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr>
              <th className="w-48 p-4 text-left text-sm font-medium text-muted-foreground">Feature</th>
              {comparedProducts.map((product) => (
                <th key={product.id} className="p-4 text-center">
                  <div className="relative mx-auto mb-3 h-32 w-32">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive hover:text-white"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <Link href={`/e-commerce/${product.slug}`} className="text-sm font-medium text-foreground hover:underline">
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
            <tr className="border-t border-border/50">
              <td className="p-4 text-sm font-medium text-muted-foreground">Rating</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-medium">{product.rating}</span>
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{product.reviewCount} reviews</p>
                </td>
              ))}
            </tr>
            <tr className="border-t border-border/50">
              <td className="p-4 text-sm font-medium text-muted-foreground">Category</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm">{product.category}</td>
              ))}
            </tr>
            <tr className="border-t border-border/50">
              <td className="p-4 text-sm font-medium text-muted-foreground">Availability</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <Badge variant={product.stock > 0 ? "secondary" : "danger"}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </Badge>
                </td>
              ))}
            </tr>
            <tr className="border-t border-border/50">
              <td className="p-4 text-sm font-medium text-muted-foreground">Shipping</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm">
                  {product.shipping?.freeShipping ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  )}
                </td>
              ))}
            </tr>
            {allSpecLabels.map((label) => (
              <tr key={label} className="border-t border-border/50">
                <td className="p-4 text-sm font-medium text-muted-foreground">{label}</td>
                {comparedProducts.map((product) => {
                  const spec = product.specifications?.find((s) => s.label === label);
                  return (
                    <td key={product.id} className="p-4 text-center text-sm">
                      {spec ? spec.value : <span className="text-muted-foreground">—</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t border-border/50">
              <td className="p-4 text-sm font-medium text-muted-foreground">Action</td>
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
