export const ZONE_SELECT_SOURCE = `"use client";

import { useState } from "react";

const ZONES = ["Frontend", "Backend", "DevOps", "Design"];

export function BasicSelect() {
  const [selected, setSelected] = useState<string[]>(["Frontend", "Backend"]);

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="space-y-2">
      {ZONES.map((zone) => (
        <label key={zone} className={\`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 \${selected.includes(zone) ? "border-blue-200 bg-blue-50 shadow-sm dark:border-blue-800 dark:bg-blue-950/30" : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"}\`}>
          <div className={\`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all \${selected.includes(zone) ? "border-blue-500 bg-blue-500" : "border-zinc-300 dark:border-zinc-600"}\`}>
            {selected.includes(zone) && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={selected.includes(zone)} onChange={() => toggle(zone)} />
          <span className={\`text-sm font-medium \${selected.includes(zone) ? "text-blue-900 dark:text-blue-100" : "text-zinc-700 dark:text-zinc-300"}\`}>{zone}</span>
        </label>
      ))}
    </div>
  );
}`;
