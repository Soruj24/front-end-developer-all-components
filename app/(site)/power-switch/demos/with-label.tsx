"use client";

import { useState } from "react";

export function WithLabel() {
  const [items, setItems] = useState([
    { label: "Power", on: true },
    { label: "Wi-Fi", on: true },
    { label: "Bluetooth", on: false },
  ]);

  const toggle = (i: number) => setItems(items.map((item, idx) => (idx === i ? { ...item, on: !item.on } : item)));

  return (
    <div className="w-full max-w-sm space-y-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
          <button
            onClick={() => toggle(i)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
              item.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
            role="switch"
            aria-checked={item.on}
          >
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
              item.on ? "translate-x-5" : "translate-x-0.5"
            }`} />
          </button>
        </div>
      ))}
    </div>
  );
}
