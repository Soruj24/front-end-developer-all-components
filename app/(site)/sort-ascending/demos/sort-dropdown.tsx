"use client";

import { useState } from "react";
import { ArrowUpAZ } from "lucide-react";

const ITEMS = [
  { id: 1, name: "Widget", category: "Tools" },
  { id: 2, name: "Gadget", category: "Electronics" },
  { id: 3, name: "Doohickey", category: "Tools" },
  { id: 4, name: "Thingamajig", category: "Electronics" },
];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "category", label: "Category" },
];

export function SortDropdown() {
  const [sortBy, setSortBy] = useState("name-asc");

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <ArrowUpAZ className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Sort Dropdown</span>
      </div>
      <div className="px-5 py-3">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800">
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <ul className="divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
        {ITEMS.map((item) => (
          <li key={item.id} className="flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
            <span className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
