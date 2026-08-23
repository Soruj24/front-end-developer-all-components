"use client";

import { ArrowDownAZ } from "lucide-react";

const SCORES = [
  { id: 1, game: "Chess", score: 2100 },
  { id: 2, game: "Checkers", score: 1800 },
  { id: 3, game: "Sudoku", score: 2450 },
  { id: 4, game: "Solitaire", score: 1650 },
];

export function HighScore() {
  const sorted = [...SCORES].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <ArrowDownAZ className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">High Scores</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {sorted.map((entry, index) => (
          <div key={entry.id} className={`rounded-xl border p-4 transition-all hover:shadow-sm ${
            index === 0
              ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
              : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
          }`}>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{entry.game}</p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{entry.score.toLocaleString()}</p>
            <p className="mt-0.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">Rank #{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
