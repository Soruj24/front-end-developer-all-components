"use client";

import { useState } from "react";
import { ShoppingCart, Tag, Check } from "lucide-react";

export function AddToCart() {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
        className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
        {added ? "Added!" : "Add to Cart"}
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.97] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
        <Tag className="h-4 w-4" />
        Apply Coupon
      </button>
    </div>
  );
}
