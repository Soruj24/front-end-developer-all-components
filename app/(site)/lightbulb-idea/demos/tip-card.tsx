"use client";

import { Lightbulb, Sparkles } from "lucide-react";

export function TipCardDemo() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Pro Tip</h4>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">Best Practice</span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Always write tests before implementation. Test-driven development helps
        clarify requirements and reduces bugs in production code.
      </p>
    </div>
  );
}
