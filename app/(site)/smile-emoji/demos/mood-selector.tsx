"use client";

import { useState } from "react";
import { Smile, Meh, Frown } from "lucide-react";

const MOODS = [
  { Icon: Smile, label: "Happy", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { Icon: Meh, label: "Neutral", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  { Icon: Frown, label: "Sad", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
];

export function MoodSelector() {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="flex gap-3">
      {MOODS.map((m) => (
        <button
          key={m.label}
          onClick={() => setMood(mood === m.label ? null : m.label)}
          className={`flex flex-col items-center gap-2 rounded-2xl border px-6 py-5 transition-all active:scale-95 ${
            mood === m.label
              ? "border-zinc-900 bg-zinc-900 shadow-sm dark:border-zinc-100 dark:bg-zinc-100"
              : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-600"
          }`}
          aria-label={m.label}
        >
          <m.Icon className={`h-8 w-8 ${mood === m.label ? "text-white dark:text-zinc-900" : m.color}`} />
          <span className={`text-xs font-medium ${mood === m.label ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400"}`}>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
