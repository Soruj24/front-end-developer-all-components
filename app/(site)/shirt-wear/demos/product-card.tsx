"use client";

import { Shirt } from "lucide-react";

export function ProductCard() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950 dark:hover:shadow-zinc-900/50">
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Shirt className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">$29.99</p>
        </div>
      </div>
    </div>
  );
}
