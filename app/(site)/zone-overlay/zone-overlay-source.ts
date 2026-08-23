export const ZONE_OVERLAY_SOURCE = `"use client";

import { useState } from "react";

export function BasicOverlay() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-12 text-center dark:from-zinc-800 dark:to-zinc-900">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Base Content</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">Overlay Active</span>
      </div>
    </div>
  );
}`;
