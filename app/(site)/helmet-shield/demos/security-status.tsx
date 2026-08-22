"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

export function SecurityStatusDemo() {
  const [level, setLevel] = useState<"protected" | "warning" | "danger">("protected");
  const levels = {
    protected: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Fully Protected" },
    warning: { icon: ShieldAlert, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "At Risk" },
    danger: { icon: ShieldX, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Vulnerable" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl border border-zinc-200 p-5 shadow-sm dark:border-zinc-800 ${levels[level].bg}`}>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-zinc-950">
            {(() => { const Icon = levels[level].icon; return <Icon className={`h-6 w-6 ${levels[level].color}`} />; })()}
          </div>
          <div>
            <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{levels[level].label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">System status</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(levels) as Array<keyof typeof levels>).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                level === l
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-white/50 text-zinc-500 hover:bg-white dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {levels[l].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
