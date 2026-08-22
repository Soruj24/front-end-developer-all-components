"use client";

import { useState } from "react";
import { Flame } from "lucide-react";

export function CalorieBurnDemo() {
  const [calories, setCalories] = useState(0);
  const goal = 500;
  const activities = [
    { name: "Running", cal: 120, icon: "\uD83C\uDFC3" },
    { name: "Cycling", cal: 85, icon: "\uD83D\uDEB4" },
    { name: "Swimming", cal: 100, icon: "\uD83C\uDFCA" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Calorie Burn</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200 dark:text-zinc-800" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-orange-500" strokeDasharray={`${(calories / goal) * 251} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{calories}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">/ {goal} cal goal</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{Math.round((calories / goal) * 100)}% complete</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {activities.map((a) => (
              <button
                key={a.name}
                onClick={() => setCalories((c) => Math.min(goal, c + a.cal))}
                className="flex w-full items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <span className="text-xl">{a.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{a.name}</p>
                </div>
                <span className="text-xs font-bold text-orange-500">+{a.cal} cal</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
