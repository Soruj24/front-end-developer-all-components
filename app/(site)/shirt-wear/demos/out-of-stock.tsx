"use client";

import { Shirt } from "lucide-react";

export function OutOfStock() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white opacity-75 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
        <Shirt className="h-20 w-20 text-zinc-300 dark:text-zinc-600" />
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/10 dark:bg-zinc-100/5">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Out of Stock</span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
        <p className="text-lg font-bold text-zinc-400 line-through dark:text-zinc-500">$29.99</p>
        <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-medium text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
          Sold Out
        </button>
      </div>
    </div>
  );
}
