"use client";

import { cn } from "@/lib/cn";

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  if (!message) return null;
  return (
    <div className="mx-4 mb-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-950/30">
      <span className="text-sm text-red-600 dark:text-red-400">{message}</span>
      <button
        onClick={onRetry}
        className={cn(
          "ml-auto rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-500",
          "transition-all hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
          "active:scale-[0.97]",
        )}
      >
        Retry
      </button>
    </div>
  );
}

export function RateLimitBanner({ visible, cooldown }: { visible: boolean; cooldown: number }) {
  if (!visible) return null;
  return (
    <div className="mx-4 mb-2 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
      <span className="text-sm text-amber-600 dark:text-amber-400">Too many requests. Try again in {cooldown}s.</span>
      <div className="ml-auto h-2 w-24 overflow-hidden rounded-full bg-amber-200 dark:bg-amber-800">
        <div className="h-full rounded-full bg-amber-500 transition-all duration-1000" style={{ width: `${(cooldown / 15) * 100}%` }} />
      </div>
    </div>
  );
}

 