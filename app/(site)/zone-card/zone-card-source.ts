export const ZONE_CARD_SOURCE = `"use client";

export function BasicCard() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Production Zone</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">US East Region</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">128</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Instances</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
