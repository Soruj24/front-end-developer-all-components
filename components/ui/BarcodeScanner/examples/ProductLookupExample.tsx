"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import { cn } from "@/lib/cn";

const PRODUCTS: Record<string, { name: string; price: string; stock: number }> = {
  "4006381333931": { name: "Organic Milk 1L", price: "$3.99", stock: 24 },
  "9780201379624": { name: "Design Patterns", price: "$49.99", stock: 8 },
  "0012345678905": { name: "Cereal Box 500g", price: "$5.49", stock: 42 },
  "9781234567897": { name: "TypeScript in Depth", price: "$39.99", stock: 15 },
};

export function ProductLookupExample() {
  const [product, setProduct] = useState<{ code: string; info: typeof PRODUCTS[string] } | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <BarcodeScanner
        onScan={(code) => {
          const info = PRODUCTS[code];
          if (info) {
            setProduct({ code, info });
            setNotFound(null);
          } else {
            setNotFound(code);
            setProduct(null);
          }
        }}
      />
      {product && (
        <div className="w-full max-w-sm rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Product Found</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{product.info.name}</p>
          <div className="mt-2 flex items-center gap-4">
            <span className="text-lg font-bold text-foreground">{product.info.price}</span>
            <span className={cn("text-xs font-medium", product.info.stock > 10 ? "text-emerald-600" : "text-amber-600")}>
              {product.info.stock} in stock
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">{product.code}</p>
        </div>
      )}
      {notFound && (
        <div className="w-full max-w-sm rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-xs text-destructive font-medium">Product not found</p>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">{notFound}</p>
        </div>
      )}
    </div>
  );
}
