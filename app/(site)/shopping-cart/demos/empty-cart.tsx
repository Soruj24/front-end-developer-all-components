"use client";

import { ShoppingCart } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <ShoppingCart className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
      </div>
      <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your cart is empty</p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Add some items to get started</p>
    </div>
  );
}
