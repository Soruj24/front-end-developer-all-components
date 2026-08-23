"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  low: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

export function ObjectiveList() {
  const [objectives, setObjectives] = useState([
    { text: "Complete project proposal", priority: "high", done: false },
    { text: "Review pull requests", priority: "medium", done: true },
    { text: "Update documentation", priority: "low", done: false },
    { text: "Fix critical bugs", priority: "high", done: false },
  ]);

  const toggleObjective = (index: number) => {
    setObjectives(objectives.map((o, i) => i === index ? { ...o, done: !o.done } : o));
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <CheckCircle2 className="h-4 w-4 text-teal-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Objective List</span>
      </div>
      <div className="space-y-1.5 px-5 py-4">
        {objectives.map((obj, i) => (
          <button key={i} onClick={() => toggleObjective(i)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all active:scale-[0.98] ${obj.done ? "bg-emerald-50 dark:bg-emerald-950/10" : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"}`}>
            {obj.done ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" /> : <Circle className="h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600" />}
            <div className="flex-1">
              <span className={`text-xs font-medium ${obj.done ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-100"}`}>{obj.text}</span>
            </div>
            <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold capitalize ${PRIORITY_COLORS[obj.priority]}`}>{obj.priority}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SuccessRate() {
  const [total, setTotal] = useState(100);
  const [success, setSuccess] = useState(87);
  const pct = Math.round((success / total) * 100);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <CheckCircle2 className="h-4 w-4 text-amber-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Success Rate</span>
      </div>
      <div className="space-y-4 px-5 py-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-amber-500">{pct}%</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Success Rate</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-center dark:border-emerald-800 dark:bg-emerald-950/20">
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{success}</p>
            <p className="text-[9px] font-semibold text-zinc-500 dark:text-zinc-400">Successful</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-center dark:border-red-800 dark:bg-red-950/20">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{total - success}</p>
            <p className="text-[9px] font-semibold text-zinc-500 dark:text-zinc-400">Failed</p>
          </div>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSuccess(Math.min(total, success + 1))} className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95">+ Success</button>
          <button onClick={() => setTotal(total + 1)} className="flex-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-red-600 active:scale-95">+ Total</button>
        </div>
      </div>
    </div>
  );
}
