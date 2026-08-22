"use client";

import { useState } from "react";
import { Hammer, Wrench, Drill, Settings } from "lucide-react";

const tools = [
  { id: "hammer", name: "Hammer", icon: Hammer, count: 3, status: "available" as const },
  { id: "wrench", name: "Wrench Set", icon: Wrench, count: 2, status: "available" as const },
  { id: "drill", name: "Power Drill", icon: Drill, count: 1, status: "in-use" as const },
  { id: "screwdriver", name: "Screwdrivers", icon: Settings, count: 5, status: "available" as const },
];

const STATUS_COLORS: Record<string, string> = {
  available: "bg-emerald-50 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  "in-use": "bg-amber-50 text-amber-600 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  maintenance: "bg-red-50 text-red-600 ring-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
};

export function ToolInventoryDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <Hammer className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Tool Inventory</h3>
            </div>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{tools.length} items</span>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelected(selected === tool.id ? null : tool.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                selected === tool.id
                  ? "bg-zinc-900/5 ring-1 ring-inset ring-zinc-900/10 dark:bg-white/5 dark:ring-white/10"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 ${
                selected === tool.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700"
              }`}>
                <tool.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500">Qty: {tool.count}</p>
              </div>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${STATUS_COLORS[tool.status]}`}>
                {tool.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
