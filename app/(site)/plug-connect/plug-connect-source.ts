export const PLUG_CONNECT_SOURCE = `"use client";

import { Plug } from "lucide-react";

export function ConnectedService() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
          <Plug className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">GitHub</p>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Connected</p>
        </div>
      </div>
    </div>
  );
}`;
