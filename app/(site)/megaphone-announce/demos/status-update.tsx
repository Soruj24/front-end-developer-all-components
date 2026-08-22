"use client";

import { useState } from "react";
import { Info } from "lucide-react";

export function StatusUpdate() {
  const [status, setStatus] = useState<"online" | "away" | "busy" | "offline">("online");
  const statuses = [
    { value: "online" as const, label: "Online", color: "bg-emerald-500" },
    { value: "away" as const, label: "Away", color: "bg-amber-500" },
    { value: "busy" as const, label: "Busy", color: "bg-red-500" },
    { value: "offline" as const, label: "Offline", color: "bg-zinc-400" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Info className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Status Update</h3>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <span className="text-lg font-bold text-zinc-700 dark:text-zinc-300">JD</span>
          </div>
          <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-950 ${statuses.find((s) => s.value === status)?.color}`} />
        </div>
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">John Doe</p>
          <p className="flex items-center gap-1.5 text-xs capitalize text-zinc-500 dark:text-zinc-400">
            <span className={`h-2 w-2 rounded-full ${statuses.find((s) => s.value === status)?.color}`} />
            {status}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {statuses.map((s) => (
          <button key={s.value} onClick={() => setStatus(s.value)} className={`rounded-lg p-2 text-xs font-medium capitalize transition-all ${status === s.value ? "border border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800" : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
            <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${s.color}`} />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
