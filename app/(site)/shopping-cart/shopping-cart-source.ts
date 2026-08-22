export const SHOPPING_CART_SOURCE = `"use client";

import { useState } from "react";
import { Package, Minus, Plus, Trash2 } from "lucide-react";

export function CartItem() {
  const [qty, setQty] = useState(2);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Package className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">Wireless Headphones</p>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">$79.99</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800" aria-label="Decrease quantity">
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800" aria-label="Increase quantity">
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <p className="w-20 text-right text-sm font-bold text-zinc-900 dark:text-zinc-100">\${(79.99 * qty).toFixed(2)}</p>
        <button className="rounded-lg p-2 text-zinc-400 transition-all hover:bg-red-50 hover:text-red-500 active:scale-95 dark:text-zinc-500 dark:hover:bg-red-950/30 dark:hover:text-red-400" aria-label="Remove item">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;
