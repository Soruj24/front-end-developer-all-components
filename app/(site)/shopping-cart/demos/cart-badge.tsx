"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export function CartBadge() {
  const [count, setCount] = useState(3);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <ShoppingCart className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm">
            {count}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c + 1)} className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.97] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
          Add Item
        </button>
        <button onClick={() => setCount(Math.max(0, count - 1))} className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.97] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
          Remove
        </button>
      </div>
    </div>
  );
}
