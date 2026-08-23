"use client";

import { useState } from "react";
import { ThumbsUp, Heart, Laugh } from "lucide-react";

interface Reaction {
  key: string;
  Icon: typeof ThumbsUp;
  label: string;
  count: number;
}

export function ReactionBar() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { key: "like", Icon: ThumbsUp, label: "Like", count: 5 },
    { key: "love", Icon: Heart, label: "Love", count: 3 },
    { key: "laugh", Icon: Laugh, label: "Haha", count: 0 },
  ]);

  const toggle = (key: string) =>
    setReactions((r) =>
      r.map((item) =>
        item.key === key
          ? { ...item, count: item.count > 0 ? item.count - 1 : item.count + 1 }
          : item
      )
    );

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((r) => (
        <button
          key={r.key}
          onClick={() => toggle(r.key)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
            r.count > 0
              ? "border border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600"
          }`}
          aria-label={`${r.label}: ${r.count}`}
        >
          <r.Icon className="h-4 w-4" />
          <span>{r.count}</span>
        </button>
      ))}
    </div>
  );
}
