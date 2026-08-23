"use client";

import { useState } from "react";
import { Target, TrendingUp } from "lucide-react";

export function TargetCard() {
  const [target, setTarget] = useState(1000);
  const [current, setCurrent] = useState(750);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <Target className="h-4 w-4 text-red-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Target Card</span>
      </div>
      <div className="space-y-4 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Target</span>
          <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-24 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-right text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Current</span>
          <input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="w-24 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-right text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${ (current / target) >= 1 ? "bg-emerald-500" : (current / target) >= 0.75 ? "bg-blue-500" : "bg-orange-500" }`}
            style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400 dark:text-zinc-500">{current.toLocaleString()}</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{Math.round((current / target) * 100)}%</span>
          <span className="text-zinc-400 dark:text-zinc-500">{target.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function GoalTracker() {
  const [goals, setGoals] = useState([
    { name: "Exercise", progress: 80, target: "5x/week" },
    { name: "Reading", progress: 60, target: "4 books" },
    { name: "Savings", progress: 45, target: "$10k" },
  ]);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <TrendingUp className="h-4 w-4 text-blue-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Goal Tracker</span>
      </div>
      <div className="space-y-4 px-5 py-4">
        {goals.map((goal, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{goal.name}</span>
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">{goal.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Target: {goal.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
