"use client";

import { BarChart3 } from "lucide-react";

const PLAYERS = [
  { id: 1, name: "Alice", score: 1250 },
  { id: 2, name: "Bob", score: 980 },
  { id: 3, name: "Charlie", score: 1420 },
  { id: 4, name: "Diana", score: 1100 },
  { id: 5, name: "Eve", score: 1380 },
];

const MEDALS = ["\u{1F947}", "\u{1F948}", "\u{1F949}"];

export function Leaderboard() {
  const sorted = [...PLAYERS].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <BarChart3 className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Leaderboard</span>
      </div>
      <ol className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {sorted.map((player, index) => (
          <li key={player.id} className={`flex items-center gap-3 px-5 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 ${index === 0 ? "bg-amber-50/50 dark:bg-amber-950/10" : ""}`}>
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-lg">
              {MEDALS[index] || <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">#{index + 1}</span>}
            </span>
            <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{player.name}</span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{player.score.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
