"use client";

import { useState } from "react";

export function LabeledSwitches() {
  const [items, setItems] = useState([
    { label: "Dark Mode", on: false },
    { label: "Notifications", on: true },
    { label: "Auto-save", on: true },
    { label: "Location", on: false },
  ]);

  const toggle = (i: number) => setItems(items.map((item, idx) => (idx === i ? { ...item, on: !item.on } : item)));

  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={() => toggle(i)}
          className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
            item.on
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
              : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          }`}
        >
          <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
          <div className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
            item.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"
          }`}>
            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              item.on ? "translate-x-4" : "translate-x-0.5"
            }`} />
          </div>
        </button>
      ))}
    </div>
  );
}
