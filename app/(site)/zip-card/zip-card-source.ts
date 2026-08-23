export const ZIP_CARD_SOURCE = `"use client";

export function BasicCard() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
          <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">release-v2.1.0.zip</h3>
          <div className="mt-1.5 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>24 files</span>
            <span>·</span>
            <span>1.8 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}`;
