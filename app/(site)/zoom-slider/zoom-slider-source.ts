export const ZOOM_SLIDER_SOURCE = `"use client";

import { useState } from "react";

export function BasicSlider() {
  const [zoom, setZoom] = useState(75);

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          <span className="text-xs font-medium">Zoom</span>
        </div>
        <span className="min-w-[3rem] rounded-full bg-zinc-100 px-2 py-0.5 text-center text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{zoom}%</span>
      </div>
      <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
    </div>
  );
}`;
