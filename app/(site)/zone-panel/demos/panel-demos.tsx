"use client";

import { useState } from "react";

export function BasicPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex-1 p-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content area</p>
      </div>
      <div className={`border-l border-zinc-200 bg-zinc-50 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 ${open ? "w-48" : "w-0"}`}>
        <div className="flex h-full flex-col p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Zone Panel</span>
            <button onClick={() => setOpen(!open)} className="rounded-md p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PanelPositions() {
  const [position, setPosition] = useState<"right" | "left">("right");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        {(["left", "right"] as const).map((pos) => (
          <button key={pos} onClick={() => setPosition(pos)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${position === pos ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {pos}
          </button>
        ))}
      </div>
      <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className={`border-zinc-200 bg-zinc-50 p-3 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 ${position === "left" ? "w-48 border-r" : "w-0 border-0"} overflow-hidden`}>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Panel</span>
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
        </div>
        <div className={`border-zinc-200 bg-zinc-50 p-3 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 ${position === "right" ? "w-48 border-l" : "w-0 border-0"} overflow-hidden`}>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Panel</span>
        </div>
      </div>
    </div>
  );
}

export function PanelWidths() {
  const [width, setWidth] = useState(192);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Width</label>
        <input type="range" min="128" max="320" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <span className="min-w-[3rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{width}px</span>
      </div>
      <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
        </div>
        <div className="border-l border-zinc-200 bg-zinc-50 p-3 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800" style={{ width }}>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{width}px</span>
        </div>
      </div>
    </div>
  );
}

export function PanelVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
        </div>
        <div className="w-48 border-l border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Default</span>
        </div>
      </div>
      <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
        </div>
        <div className="w-48 border-l-2 border-zinc-900 bg-zinc-50 p-3 dark:border-zinc-100 dark:bg-zinc-800">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Bordered</span>
        </div>
      </div>
      <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
        </div>
        <div className="w-48 bg-zinc-900 p-3 dark:bg-zinc-100">
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">Inverted</span>
        </div>
      </div>
    </div>
  );
}

export function PanelWithContent() {
  return (
    <div className="flex h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex-1 p-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Main content</p>
      </div>
      <div className="w-56 border-l border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Settings</h4>
        <div className="mt-3 flex flex-col gap-2">
          {["Profile", "Notifications", "Security", "Appearance"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm dark:bg-zinc-900">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{item}</span>
              <div className="h-3 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
