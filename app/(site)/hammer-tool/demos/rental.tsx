"use client";

import { useState } from "react";
import { DollarSign, Drill, Hammer, Wrench, Minus, Plus } from "lucide-react";

const rentalTools = [
  { name: "Hammer Drill", pricePerDay: 25, icon: Drill },
  { name: "Circular Saw", pricePerDay: 35, icon: Hammer },
  { name: "Sander Kit", pricePerDay: 15, icon: Wrench },
];

export function ToolRentalDemo() {
  const [days, setDays] = useState(1);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
              <DollarSign className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Tool Rental</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[13px] text-zinc-500 dark:text-zinc-400">Rental days:</span>
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-800">
              <button
                onClick={() => setDays((d) => Math.max(1, d - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                aria-label="Decrease days"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{days}</span>
              <button
                onClick={() => setDays((d) => Math.min(30, d + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                aria-label="Increase days"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            {rentalTools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3.5 py-3 dark:bg-zinc-900/50">
                <tool.icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{`$${tool.pricePerDay}`}/day</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-zinc-900 dark:text-zinc-100">{`$${tool.pricePerDay * days}`}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Total</span>
            <span className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-100">{`$${rentalTools.reduce((sum, t) => sum + t.pricePerDay * days, 0)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
