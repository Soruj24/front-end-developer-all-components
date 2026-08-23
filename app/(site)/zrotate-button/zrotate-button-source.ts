export const ZROTATE_BUTTON_SOURCE = `"use client";

import { RotateCw, RotateCcw } from "lucide-react";

export function BasicRotate() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Refresh
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:bg-zinc-100 dark:text-zinc-900">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Reload
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCcw className="h-4 w-4 transition-transform duration-700 group-hover:-rotate-180" />
        Undo
      </button>
    </div>
  );
}`;
