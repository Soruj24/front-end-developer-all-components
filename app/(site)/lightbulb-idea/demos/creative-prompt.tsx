"use client";

import { MessageCircle } from "lucide-react";

export function CreativePromptDemo() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/30">
          <MessageCircle className="h-4 w-4 text-purple-500" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Creative Prompt</h4>
      </div>
      <div className="mb-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
        <p className="text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-400">
          &ldquo;Design a dashboard widget that displays real-time system metrics with
          animated sparkline charts and configurable alert thresholds.&rdquo;
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Dashboard", "Charts", "Real-time", "Animation"].map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
