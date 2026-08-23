"use client";

import { List } from "lucide-react";

const ITEMS = [
  { id: 1, name: "TypeScript", score: 95 },
  { id: 2, name: "JavaScript", score: 90 },
  { id: 3, name: "Python", score: 88 },
  { id: 4, name: "Go", score: 82 },
  { id: 5, name: "Rust", score: 85 },
];

export function RankedItems() {
  const sorted = [...ITEMS].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <List className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Ranked Items</span>
      </div>
      <ol className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {sorted.map((item, index) => (
          <li key={item.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
              index === 0 ? "bg-amber-400 text-amber-900" : index === 1 ? "bg-zinc-300 text-zinc-700" : index === 2 ? "bg-orange-300 text-orange-700" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            }`}>
              {index + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">{item.score}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
