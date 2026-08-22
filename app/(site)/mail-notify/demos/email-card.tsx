"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function EmailCard() {
  const [read, setRead] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mail className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Email Card</h3>
      </div>
      <div
        onClick={() => setRead(!read)}
        className={`cursor-pointer rounded-lg border p-4 transition-all ${
          read
            ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            : "border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {!read && <div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />}
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">New project assignment</p>
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">You have been assigned to the new dashboard project. Please review...</p>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">2m</span>
        </div>
      </div>
    </div>
  );
}
