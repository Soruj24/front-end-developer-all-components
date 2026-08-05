"use client";

import { useState } from "react";
import { polls } from "../constants/social-data";

export function PollSection() {
  const [votes, setVotes] = useState<Record<number, number>>({});

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Polls</h3>
      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{poll.question}</p>
            <div className="space-y-2">
              {poll.options.map((opt, i) => {
                const pct = poll.total > 0 ? Math.round((poll.votes[i] / poll.total) * 100) : 0;
                const selected = votes[poll.id] === i;
                return (
                  <button
                    key={opt}
                    onClick={() => setVotes((v) => ({ ...v, [poll.id]: i }))}
                    className={`relative w-full overflow-hidden rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30"
                        : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="absolute inset-0 bg-blue-100 transition-all dark:bg-blue-900/20" style={{ width: `${selected ? pct : 0}%` }} />
                    <span className="relative flex items-center justify-between">
                      <span className="text-zinc-800 dark:text-zinc-200">{opt}</span>
                      <span className="text-xs font-medium text-zinc-500">{pct}%</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-zinc-400">{poll.total} votes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
