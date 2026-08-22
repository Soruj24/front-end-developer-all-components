"use client";

import { Sparkles } from "lucide-react";

export function SuggestionAlertDemo() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
          <Sparkles className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Suggestion</h4>
          <p className="mt-1 text-sm leading-relaxed text-blue-700 dark:text-blue-300">
            Consider using a debounce hook for search inputs to reduce API calls
            and improve performance.
          </p>
        </div>
      </div>
    </div>
  );
}
