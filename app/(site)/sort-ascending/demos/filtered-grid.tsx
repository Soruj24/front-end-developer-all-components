"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Desk Chair", category: "Furniture", price: 299 },
  { id: 3, name: "Keyboard", category: "Electronics", price: 79 },
  { id: 4, name: "Monitor", category: "Electronics", price: 449 },
  { id: 5, name: "Standing Desk", category: "Furniture", price: 599 },
  { id: 6, name: "Headphones", category: "Electronics", price: 199 },
];

const CATEGORIES = ["all", "Electronics", "Furniture"];

export function FilteredGrid() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  const sorted = [...filtered].sort((a, b) => a.price - b.price);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <Filter className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Filtered Grid</span>
      </div>
      <div className="flex gap-1.5 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${filter === cat ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {sorted.map((product) => (
          <div key={product.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 transition-all hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{product.category}</p>
            <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
