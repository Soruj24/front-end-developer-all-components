"use client";

import { useState } from "react";
import { TrendingUp, CheckCircle2, Circle } from "lucide-react";

export function MilestoneMarker() {
  const [milestones, setMilestones] = useState([
    { name: "Launch", done: true },
    { name: "100 Users", done: true },
    { name: "500 Users", done: false },
    { name: "1000 Users", done: false },
    { name: "Profit", done: false },
  ]);

  const toggleMilestone = (index: number) => {
    setMilestones(milestones.map((m, i) => i === index ? { ...m, done: !m.done } : m));
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Milestone Marker</span>
      </div>
      <div className="relative px-5 py-4">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-3">
          {milestones.map((milestone, i) => (
            <button key={i} onClick={() => toggleMilestone(i)} className="relative flex items-center gap-3 w-full text-left rounded-xl p-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98]">
              <div className={`z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${ milestone.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" }`}>
                {milestone.done ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">{i + 1}</span>}
              </div>
              <div className="flex-1 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{milestone.name}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{milestone.done ? "Completed" : "Pending"}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
