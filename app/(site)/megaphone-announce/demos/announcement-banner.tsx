"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Megaphone className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Announcement Banner</h3>
        </div>
        <div className="flex h-32 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900">
          <button onClick={() => setDismissed(false)} className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
            Show banner again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Megaphone className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Announcement Banner</h3>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-r from-zinc-50 to-white p-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Feature Released!</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">We just launched dark mode. Try it out in settings.</p>
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Learn More
          </button>
          <button onClick={() => setDismissed(true)} className="rounded-lg border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
