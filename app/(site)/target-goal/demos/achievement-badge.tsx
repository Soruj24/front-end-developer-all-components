"use client";

import { useState } from "react";
import { Award, Star } from "lucide-react";

export function AchievementBadge() {
  const [earned, setEarned] = useState([true, true, false, false, false]);

  const badges = [
    { name: "Starter", icon: Star, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/30" },
    { name: "Week 1", icon: Award, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/30" },
    { name: "Month 1", icon: Award, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-950/30" },
    { name: "Quarter", icon: Award, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/30" },
    { name: "Annual", icon: Award, color: "text-red-500", bg: "bg-red-100 dark:bg-red-950/30" },
  ];

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <Award className="h-4 w-4 text-amber-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Achievement Badge</span>
      </div>
      <div className="flex justify-center gap-3 px-5 py-5">
        {badges.map((badge, i) => (
          <button
            key={i}
            onClick={() => setEarned(earned.map((e, j) => j === i ? !e : e))}
            className={`flex flex-col items-center gap-2 rounded-xl p-2.5 transition-all hover:scale-105 active:scale-95 ${earned[i] ? "opacity-100" : "opacity-30"}`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${badge.bg}`}>
              <badge.icon className={`h-6 w-6 ${earned[i] ? badge.color : "text-zinc-400"}`} />
            </div>
            <span className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">{badge.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
