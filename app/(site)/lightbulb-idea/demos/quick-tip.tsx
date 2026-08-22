"use client";

import { Zap } from "lucide-react";

export function QuickTipDemo() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 dark:border-yellow-800 dark:bg-yellow-950/30">
      <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
        Quick Tip: Use CSS Grid for complex layouts.
      </span>
    </div>
  );
}
