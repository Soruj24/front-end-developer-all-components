"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Qty:</span>
      <div className="flex items-center overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-10 w-10 items-center justify-center text-zinc-600 transition-all hover:bg-zinc-50 active:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:active:bg-zinc-700" aria-label="Decrease">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="flex h-10 w-14 items-center justify-center border-x border-zinc-200 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">{qty}</span>
        <button onClick={() => setQty(Math.min(10, qty + 1))} className="flex h-10 w-10 items-center justify-center text-zinc-600 transition-all hover:bg-zinc-50 active:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:active:bg-zinc-700" aria-label="Increase">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
