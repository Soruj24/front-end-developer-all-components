"use client";

import { useState } from "react";

export function BasicOverlay() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-12 text-center dark:from-zinc-800 dark:to-zinc-900">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Base Content</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">Overlay Active</span>
        </div>
      </div>
    </div>
  );
}

export function OverlayBackdrop() {
  const blurs = ["none", "sm", "md", "lg"];

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {blurs.map((b) => (
        <div key={b} className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-between bg-gradient-to-r from-zinc-100 to-zinc-50 p-4 dark:from-zinc-800 dark:to-zinc-900">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">blur-{b}</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Hover me</span>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100 ${b === "sm" ? "backdrop-blur-sm" : b === "md" ? "backdrop-blur-md" : b === "lg" ? "backdrop-blur-lg" : ""}`}>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">Overlay</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OverlayColors() {
  const colors = [
    { name: "Dark", overlay: "bg-black/50", text: "text-white" },
    { name: "Blue", overlay: "bg-blue-600/50", text: "text-white" },
    { name: "Purple", overlay: "bg-purple-600/50", text: "text-white" },
    { name: "Green", overlay: "bg-emerald-600/50", text: "text-white" },
  ];

  return (
    <div className="mx-auto max-w-sm grid grid-cols-2 gap-2">
      {colors.map((c) => (
        <div key={c.name} className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 dark:from-zinc-800 dark:to-zinc-900">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{c.name}</span>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center ${c.overlay} opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100`}>
            <span className={`rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold ${c.text} shadow-lg backdrop-blur-sm`}>{c.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OverlayWithContent() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 dark:from-zinc-800 dark:to-zinc-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Upload File</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">Drop to Upload</span>
        </div>
      </div>
    </div>
  );
}

export function OverlayToggle() {
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto max-w-sm space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 dark:from-zinc-800 dark:to-zinc-900">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Content behind overlay</span>
        </div>
        {show && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300">
            <div className="mx-4 w-full max-w-xs rounded-xl bg-white p-4 shadow-xl dark:bg-zinc-900">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Overlay Content</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">This is overlay content with a backdrop blur effect.</p>
              <button onClick={() => setShow(false)} className="mt-3 w-full rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Close</button>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => setShow(true)} className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Show Overlay</button>
    </div>
  );
}
