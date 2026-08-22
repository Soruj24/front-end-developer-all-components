"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

export function EnergyUsageDemo() {
  const [period, setPeriod] = useState("today");
  const usage = {
    today: { kwh: 12.5, cost: 2.50, peak: "6-9 PM" },
    week: { kwh: 87.5, cost: 17.50, peak: "Evenings" },
    month: { kwh: 350, cost: 70.00, peak: "Weekends" },
  };
  const data = usage[period as keyof typeof usage];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Energy Usage</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex gap-1.5">
            {["today", "week", "month"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 rounded-lg px-3 py-2 text-[10px] font-medium capitalize transition-all ${
                  period === p
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{data.kwh}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">kWh</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">${data.cost.toFixed(2)}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Cost</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
              <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100">{data.peak}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Peak</p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-900" style={{ height: 80 }}>
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 45].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-zinc-900 dark:bg-zinc-100" style={{ height: `${h}%`, opacity: 0.5 + (h / 180) }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
