export const ZONE_HEADER_SOURCE = `"use client";

import { ChevronRight, Plus, Settings, Download, Filter } from "lucide-react";

export function BasicHeader() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
          <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Home</span>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Components</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-zinc-700 dark:text-zinc-200">Zone Header</span>
        </div>
        <div className="mt-3 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Zone Header</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">A header component for zone sections.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
            <button className="rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}`;
