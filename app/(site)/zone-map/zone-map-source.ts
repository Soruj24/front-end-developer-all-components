export const ZONE_MAP_SOURCE = `"use client";

import { useState } from "react";

export function BasicMap() {
  const [selected, setSelected] = useState(4);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-700">
        {["North", "Central", "South", "West", "Core", "East", "SW", "South", "SE"].map((zone, i) => (
          <button key={i} onClick={() => setSelected(i)} className={\`flex h-16 items-center justify-center text-xs font-medium transition-all duration-200 \${selected === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"}\`}>
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
}`;
