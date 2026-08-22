"use client";

import { useState } from "react";
import { Shirt, Check, ShoppingCart } from "lucide-react";

const SIZES = ["S", "M", "L", "XL"] as const;
const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#3b82f6" },
];

export function ProductDetail() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#000000");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center justify-center bg-zinc-100 p-8 dark:bg-zinc-800">
        <Shirt className="h-20 w-20 text-zinc-300 dark:text-zinc-600" />
      </div>
      <div className="space-y-5 p-5">
        <div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
          <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">$29.99</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Size</p>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${size === s ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900" : "border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Color</p>
          <div className="flex gap-2.5">
            {COLORS.map((c) => (
              <button key={c.value} onClick={() => setColor(c.value)} className={`relative h-8 w-8 rounded-full transition-all ${color === c.value ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100" : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-1"} ${c.value === "#ffffff" ? "border border-zinc-200 dark:border-zinc-700" : ""}`} style={{ backgroundColor: c.value }} aria-label={c.name}>
                {color === c.value && <Check className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${c.value === "#ffffff" ? "text-zinc-900" : "text-white"}`} />}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleAdd} className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}
