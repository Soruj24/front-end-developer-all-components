export const RADAR_SCAN_SOURCE = `"use client";

export function BasicRadar() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-4 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-8 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
    </div>
  );
}`;
