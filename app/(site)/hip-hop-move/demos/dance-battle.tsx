"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { DanceMoveRenderer } from "./dance-move-renderer";

export function DanceBattleDemo() {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [round, setRound] = useState(1);

  const judge = () => {
    const p1 = Math.floor(Math.random() * 50) + 50;
    const p2 = Math.floor(Math.random() * 50) + 50;
    setScore((prev) => ({
      player1: prev.player1 + (p1 > p2 ? 1 : 0),
      player2: prev.player2 + (p2 > p1 ? 1 : 0),
    }));
    setRound((r) => r + 1);
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dance Battle</h3>
            <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">Round {round}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-center">
              <DanceMoveRenderer move="bounce" size={60} />
              <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">Player 1</p>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{score.player1}</p>
            </div>
            <div className="text-2xl font-extrabold text-zinc-300 dark:text-zinc-600">VS</div>
            <div className="text-center">
              <DanceMoveRenderer move="wave" size={60} />
              <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">Player 2</p>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{score.player2}</p>
            </div>
          </div>
          <button onClick={judge} className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Judge Round
          </button>
        </div>
      </div>
    </div>
  );
}
