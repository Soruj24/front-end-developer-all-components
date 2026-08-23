export const ZONE_PANEL_SOURCE = `"use client";

import { useState } from "react";

export function BasicPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex-1 p-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content area</p>
      </div>
      <div className={\`border-l border-zinc-200 bg-zinc-50 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 \${open ? "w-48" : "w-0"}\`}>
        <div className="flex h-full flex-col p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Zone Panel</span>
            <button onClick={() => setOpen(!open)} className="rounded-md p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`;
