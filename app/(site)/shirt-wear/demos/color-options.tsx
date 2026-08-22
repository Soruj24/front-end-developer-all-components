"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
];

export function ColorOptions() {
  const [selected, setSelected] = useState("#000000");

  return (
    <div className="w-full max-w-sm space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Select Color</p>
      <div className="flex gap-2.5">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => setSelected(color.value)}
            className={`relative h-9 w-9 rounded-full transition-all ${
              selected === color.value
                ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100"
                : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-1 dark:hover:ring-zinc-600"
            } ${color.value === "#ffffff" ? "border border-zinc-200 dark:border-zinc-700" : ""}`}
            style={{ backgroundColor: color.value }}
            aria-label={color.name}
          >
            {selected === color.value && (
              <Check className={`absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 ${color.value === "#ffffff" || color.value === "#22c55e" ? "text-zinc-900" : "text-white"}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
