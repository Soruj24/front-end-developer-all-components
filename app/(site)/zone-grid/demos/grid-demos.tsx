"use client";

import { useState } from "react";

export function BasicGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {["A", "B", "C", "D", "E", "F"].map((label, i) => (
        <div key={label} className={`flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ minHeight: i === 0 ? 120 : 60 }}>
          {label}
        </div>
      ))}
    </div>
  );
}

export function GridWithLabels() {
  const zones = [
    { label: "Header", col: "col-span-3", minH: 48 },
    { label: "Sidebar", col: "col-span-1", minH: 80 },
    { label: "Main Content", col: "col-span-1 row-span-2", minH: 168 },
    { label: "Secondary", col: "col-span-1", minH: 80 },
    { label: "Footer", col: "col-span-3", minH: 40 },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {zones.map((z) => (
        <div key={z.label} className={`flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 ${z.col}`} style={{ minHeight: z.minH }}>
          {z.label}
        </div>
      ))}
    </div>
  );
}

export function GridColorZones() {
  const zones = [
    { label: "Primary", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200 dark:border-blue-800", text: "text-blue-600 dark:text-blue-400" },
    { label: "Secondary", bg: "bg-violet-50 dark:bg-violet-950/40", border: "border-violet-200 dark:border-violet-800", text: "text-violet-600 dark:text-violet-400" },
    { label: "Accent", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-600 dark:text-emerald-400" },
    { label: "Warning", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-800", text: "text-amber-600 dark:text-amber-400" },
    { label: "Danger", bg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200 dark:border-rose-800", text: "text-rose-600 dark:text-rose-400" },
    { label: "Neutral", bg: "bg-zinc-50 dark:bg-zinc-900", border: "border-zinc-200 dark:border-zinc-700", text: "text-zinc-600 dark:text-zinc-400" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {zones.map((z) => (
        <div key={z.label} className={`flex items-center justify-center rounded-xl border ${z.bg} ${z.border} ${z.text} text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md`} style={{ minHeight: 60 }}>
          {z.label}
        </div>
      ))}
    </div>
  );
}

export function GridSpanVariants() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-4 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ minHeight: 48 }}>col-span-4</div>
      <div className="col-span-2 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ minHeight: 60 }}>col-span-2</div>
      <div className="col-span-2 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ minHeight: 60 }}>col-span-2</div>
      <div className="col-span-1 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ minHeight: 60 }}>col-span-1</div>
      <div className="col-span-3 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ minHeight: 60 }}>col-span-3</div>
    </div>
  );
}

export function GridResponsive() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600" style={{ minHeight: 60 }}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}
