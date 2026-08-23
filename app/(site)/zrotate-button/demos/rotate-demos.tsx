"use client";

import { RotateCw, RotateCcw, RefreshCw, RefreshCcw } from "lucide-react";

export function BasicRotate() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Refresh
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:bg-zinc-100 dark:text-zinc-900">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Reload
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCcw className="h-4 w-4 transition-transform duration-700 group-hover:-rotate-180" />
        Undo
      </button>
    </div>
  );
}

export function RotateDirections() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Clockwise
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
        Counter-clockwise
      </button>
    </div>
  );
}

export function RotateSpeeds() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        Fast (300ms)
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        Medium (500ms)
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-700 group-hover:rotate-180" />
        Slow (700ms)
      </button>
    </div>
  );
}

export function RotateIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
      </button>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:bg-zinc-100 dark:text-zinc-900">
        <RefreshCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
      </button>
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
      </button>
    </div>
  );
}

export function RotateDegrees() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
        90°
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        180°
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[270deg]" />
        270°
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 group dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <RotateCw className="h-4 w-4 transition-transform duration-700 group-hover:rotate-[360deg]" />
        360°
      </button>
    </div>
  );
}
