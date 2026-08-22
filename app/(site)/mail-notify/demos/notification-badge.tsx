"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export function NotificationBadge() {
  const [count, setCount] = useState(5);
  const [muted, setMuted] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Bell className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notification Badge</h3>
      </div>
      <div className="flex h-32 items-center justify-center gap-8 rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <div className="relative">
          <Bell className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCount(Math.max(0, count - 1))}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Dismiss
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
              muted
                ? "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {muted ? "Muted" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
}
