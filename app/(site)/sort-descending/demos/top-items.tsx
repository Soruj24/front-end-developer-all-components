"use client";

import { ArrowUpAZ } from "lucide-react";

const ITEMS = [
  { id: 1, name: "Premium Plan", revenue: 45000, users: 1200 },
  { id: 2, name: "Basic Plan", revenue: 28000, users: 3400 },
  { id: 3, name: "Enterprise", revenue: 92000, users: 150 },
  { id: 4, name: "Starter", revenue: 12000, users: 5600 },
];

const BAR_COLORS = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-violet-500"];

export function TopItems() {
  const sorted = [...ITEMS].sort((a, b) => b.revenue - a.revenue);
  const maxRevenue = sorted[0]?.revenue ?? 1;

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <ArrowUpAZ className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Top Items by Revenue</span>
      </div>
      <div className="space-y-4 p-5">
        {sorted.map((item, index) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">#{index + 1}</span>
                {item.name}
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">${item.revenue.toLocaleString()}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className={`h-full rounded-full transition-all duration-500 ${BAR_COLORS[index % BAR_COLORS.length]}`} style={{ width: `${(item.revenue / maxRevenue) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
