export const ZOOM_BUTTON_SOURCE = `"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

export function ZoomControls() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">{zoom}%</span>
        <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>
      <div className="h-24 w-24 rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800" style={{ transform: \`scale(\${zoom / 100})\` }}>
        <div className="flex h-full items-center justify-center text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{zoom}%</div>
      </div>
    </div>
  );
}`;
