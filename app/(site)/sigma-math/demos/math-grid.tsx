"use client";

import { Sigma, Minus, Divide, Percent, Equal, Hash } from "lucide-react";

const OPERATIONS = [
  { Icon: Sigma, label: "Summation", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { Icon: Minus, label: "Subtraction", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
  { Icon: Divide, label: "Division", color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/30" },
  { Icon: Percent, label: "Modulo", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
  { Icon: Equal, label: "Equality", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { Icon: Hash, label: "Cardinality", color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/30" },
];

export function MathGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {OPERATIONS.map((op) => (
        <div key={op.label} className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${op.bg}`}>
            <op.Icon className={`h-5 w-5 ${op.color}`} />
          </div>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{op.label}</span>
        </div>
      ))}
    </div>
  );
}
