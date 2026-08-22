"use client";

import { useState } from "react";

const SIZES = ["S", "M", "L", "XL"] as const;

export function SizeSelector() {
  const [selected, setSelected] = useState("M");

  return (
    <div className="w-full max-w-sm space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Select Size</p>
      <div className="flex gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`h-11 w-11 rounded-xl text-sm font-medium transition-all ${
              selected === size
                ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            }`}
            aria-label={`Size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
