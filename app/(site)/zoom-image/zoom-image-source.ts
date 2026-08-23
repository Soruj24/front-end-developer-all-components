export const ZOOM_IMAGE_SOURCE = `"use client";

import { ZoomIn } from "lucide-react";

export function BasicZoom() {
  return (
    <div className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
            <ZoomIn className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
            <span className="text-xs font-medium">Hover to zoom</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
        2x zoom
      </div>
    </div>
  );
}`;
