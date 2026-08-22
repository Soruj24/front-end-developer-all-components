"use client";

import { TrendingUp } from "lucide-react";

const hours = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  temp: 20 + Math.sin(i * 0.3) * 3 + Math.random() * 2,
}));

export function ClimateHistoryDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Climate History</h3>
            <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">Last 24h</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex h-24 items-end gap-0.5">
            {hours.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className="w-full rounded-t bg-zinc-900 dark:bg-zinc-100"
                  style={{ height: `${((h.temp - 15) / 15) * 100}%`, opacity: 0.4 + (h.temp / 30) * 0.6 }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-zinc-500 dark:text-zinc-400">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
