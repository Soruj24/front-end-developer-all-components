"use client";

import { BarChart3 } from "lucide-react";

const PLAYERS = [
  { id: 1, name: "Alice", score: 1250 },
  { id: 2, name: "Bob", score: 980 },
  { id: 3, name: "Charlie", score: 1420 },
  { id: 4, name: "Diana", score: 1100 },
];

const BAR_COLORS = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-violet-500"];

export function ScoreBoard() {
  const sorted = [...PLAYERS].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0]?.score ?? 1;

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <BarChart3 className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Score Board</span>
      </div>
      <div className="space-y-4 p-5">
        {sorted.map((player, index) => (
          <div key={player.id} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">#{index + 1}</span>
                {player.name}
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{player.score.toLocaleString()}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className={`h-full rounded-full transition-all duration-500 ${BAR_COLORS[index % BAR_COLORS.length]}`} style={{ width: `${(player.score / maxScore) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
