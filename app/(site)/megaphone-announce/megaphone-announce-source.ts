export const MEGAPHONE_ANNOUNCE_SOURCE = `"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <button onClick={() => setDismissed(false)} className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
          Show banner again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-r from-zinc-50 to-white p-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Feature Released!</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">We just launched dark mode.</p>
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="rounded-md p-1 text-zinc-400 hover:text-zinc-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Learn More</button>
          <button onClick={() => setDismissed(true)} className="rounded-lg border border-zinc-200 px-4 py-1.5 text-xs font-medium dark:border-zinc-700">Dismiss</button>
        </div>
      </div>
    </div>
  );
}`;
