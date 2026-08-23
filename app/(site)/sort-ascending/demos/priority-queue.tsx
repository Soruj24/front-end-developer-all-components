"use client";

import { BarChart3 } from "lucide-react";

const TASKS = [
  { id: 1, label: "Fix critical bug", priority: 1 },
  { id: 2, label: "Add new feature", priority: 3 },
  { id: 3, label: "Update documentation", priority: 5 },
  { id: 4, label: "Refactor utils", priority: 2 },
  { id: 5, label: "Write unit tests", priority: 4 },
];

const PRIORITY_COLORS: Record<number, { bg: string; text: string }> = {
  1: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-600 dark:text-red-400" },
  2: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-600 dark:text-orange-400" },
  3: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600 dark:text-amber-400" },
  4: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600 dark:text-blue-400" },
  5: { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-600 dark:text-zinc-400" },
};

export function PriorityQueue() {
  const sorted = [...TASKS].sort((a, b) => a.priority - b.priority);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <BarChart3 className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Priority Queue</span>
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {sorted.map((task) => {
          const colors = PRIORITY_COLORS[task.priority];
          return (
            <li key={task.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{task.label}</span>
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${colors.bg} ${colors.text}`}>P{task.priority}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
