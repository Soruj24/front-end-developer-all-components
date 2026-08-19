export const CHARTS_SOURCE = `"use client";

import { useState } from "react";

const barData = [
  { label: "Mon", value: 60 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 55 },
  { label: "Sat", value: 70 },
  { label: "Sun", value: 85 },
];

export function BarChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...barData.map((d) => d.value));

  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Bar Chart</h2>
      <div className="flex h-40 w-full items-end gap-2">
        {barData.map((d, i) => (
          <div
            key={d.label}
            className="group relative flex-1"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-full rounded-t transition-all group-hover:opacity-80"
              style={{ height: (d.value / max) * 100 + "%", background: "linear-gradient(to top, #6366f1, #a78bfa)" }}
            />
            {hovered === i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white dark:bg-muted dark:text-black">
                {d.label}: {d.value}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        {barData.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}`;