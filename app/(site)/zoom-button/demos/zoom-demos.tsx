"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize, Search, Eye } from "lucide-react";

export function BasicZoom() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-4 w-4" />
      </button>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomOut className="h-4 w-4" />
      </button>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <Maximize className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ZoomWithLabels() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-4 w-4" />
        Zoom In
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomOut className="h-4 w-4" />
        Zoom Out
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 dark:bg-zinc-100 dark:text-zinc-900">
        <Maximize className="h-4 w-4" />
        Fit to Screen
      </button>
    </div>
  );
}

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
      <div className="h-24 w-24 rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800" style={{ transform: `scale(${zoom / 100})` }}>
        <div className="flex h-full items-center justify-center text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{zoom}%</div>
      </div>
    </div>
  );
}

export function ZoomSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-3 w-3" />
      </button>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-4 w-4" />
      </button>
      <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-5 w-5" />
      </button>
      <button className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <ZoomIn className="h-6 w-6" />
      </button>
    </div>
  );
}

export function ZoomStates() {
  const [active, setActive] = useState<"in" | "out" | "fit">("in");

  return (
    <div className="flex flex-wrap items-center gap-3">
      {[
        { id: "in" as const, icon: ZoomIn, label: "Zoom In" },
        { id: "out" as const, icon: ZoomOut, label: "Zoom Out" },
        { id: "fit" as const, icon: Maximize, label: "Fit" },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
            active === id
              ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
