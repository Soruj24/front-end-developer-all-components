export const ZIGZAG_DIVIDER_V2_SOURCE = `"use client";

export function BasicZigzag() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative">
        <svg className="h-6 w-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <polygon points="0,24 20,0 40,24 60,0 80,24 100,0 120,24 140,0 160,24 180,0 200,24 220,0 240,24 260,0 280,24 300,0 320,24 340,0 360,24 380,0 400,24" className="fill-zinc-900/10 dark:fill-zinc-100/10" />
        </svg>
      </div>
      <div className="flex items-center gap-2 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        Content below zigzag divider
      </div>
    </div>
  );
}`;
