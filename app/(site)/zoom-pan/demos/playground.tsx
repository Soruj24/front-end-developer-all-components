"use client";

import { useState } from "react";
import { BasicPan, PanBounds, PanWithGrid, PanMinimap, PanWithControls } from "./pan-demos";

const VARIANTS = ["basic", "bounds", "grid", "minimap", "controls"] as const;
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
        {variant === "basic" && <BasicPan />}
        {variant === "bounds" && <PanBounds />}
        {variant === "grid" && <PanWithGrid />}
        {variant === "minimap" && <PanMinimap />}
        {variant === "controls" && <PanWithControls />}
      </div>
    </div>
  );
}
