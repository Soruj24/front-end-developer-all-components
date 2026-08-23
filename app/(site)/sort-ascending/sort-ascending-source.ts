export const SORT_ASCENDING_SOURCE = `"use client";

import { useState } from "react";
import { SortAsc } from "lucide-react";

const INITIAL_ITEMS = [
  { id: 1, name: "Banana", price: 2.99 },
  { id: 2, name: "Apple", price: 1.49 },
  { id: 3, name: "Cherry", price: 4.99 },
  { id: 4, name: "Date", price: 6.99 },
  { id: 5, name: "Elderberry", price: 8.99 },
];

export function AscendingList() {
  const [sortKey, setSortKey] = useState<"name" | "price">("name");
  const sorted = [...INITIAL_ITEMS].sort((a, b) =>
    a[sortKey] > b[sortKey] ? 1 : -1
  );

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <SortAsc className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Ascending Sort</span>
      </div>
      <div className="flex gap-1.5 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        {(["name", "price"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSortKey(key)}
            className={\`rounded-lg px-3.5 py-1.5 text-xs font-medium capitalize transition-all active:scale-95 \${
              sortKey === key
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
            }\`}
          >
            {key}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {sorted.map((item) => (
          <li key={item.id} className="flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">\${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`;
