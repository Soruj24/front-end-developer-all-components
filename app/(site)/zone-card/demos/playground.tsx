"use client";

import { useState } from "react";
import { BasicCard, CardStatuses, CardWithActions, CardCompact, CardWithProgress, CardGrid } from "./card-demos";

const VARIANTS = ["basic", "statuses", "actions", "compact", "progress", "grid"] as const;
type Variant = (typeof VARIANTS)[number];

export function PlaygroundDemo() {
  const [variant, setVariant] = useState<Variant>("basic");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap gap-1.5">
        {VARIANTS.map((v) => (
          <button key={v} onClick={() => setVariant(v)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${variant === v ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {v}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {variant === "basic" && <BasicCard />}
        {variant === "statuses" && <CardStatuses />}
        {variant === "actions" && <CardWithActions />}
        {variant === "compact" && <CardCompact />}
        {variant === "progress" && <CardWithProgress />}
        {variant === "grid" && <CardGrid />}
      </div>
    </div>
  );
}
