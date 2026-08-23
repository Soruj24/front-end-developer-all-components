"use client";

import { useState } from "react";

export function BasicRotate() {
  return (
    <div className="flex justify-center">
      <div className="h-32 w-48 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 shadow-sm transition-all duration-300 hover:-rotate-3 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:hover:shadow-zinc-900/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Hover to Rotate</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Z-axis transform</p>
      </div>
    </div>
  );
}

export function RotateAngles() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {([3, 6, 12, 45] as const).map((angle) => (
        <div key={angle} className="group h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900" style={{ transform: `rotate(0deg)` }} onMouseEnter={(e) => (e.currentTarget.style.transform = `rotate(${angle}deg)`)} onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{angle}°</p>
        </div>
      ))}
    </div>
  );
}

export function RotateDirections() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {(["rotate-6", "-rotate-6", "rotate-12", "-rotate-12"] as const).map((cls, i) => (
        <div key={i} className="h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900" onMouseEnter={(e) => (e.currentTarget.classList.add(cls))} onMouseLeave={(e) => (e.currentTarget.classList.remove(cls))}>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{["Right", "Left", "Far Right", "Far Left"][i]}</p>
        </div>
      ))}
    </div>
  );
}

export function RotateWithScale() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="h-36 w-56 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900" style={{ transform: isHovered ? "rotate(-6deg) scale(1.08)" : "rotate(0deg) scale(1)" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600" />
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Profile Card</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Hover for effect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RotateOnClick() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-32 w-48 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 shadow-sm transition-transform duration-300 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 active:scale-95" style={{ transform: `rotate(${rotation}deg)` }} onClick={() => setRotation((prev) => prev + 90)}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Click to Rotate</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{rotation}° rotation</p>
      </div>
      <button onClick={() => setRotation(0)} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
        Reset
      </button>
    </div>
  );
}

export function RotateCardVariants() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <div className="group h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-sm transition-all duration-300 hover:-rotate-3 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-blue-900/30 dark:to-blue-800/30">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Blue</p>
      </div>
      <div className="group h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-violet-50 to-violet-100 p-3 shadow-sm transition-all duration-300 hover:rotate-3 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-violet-900/30 dark:to-violet-800/30">
        <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Violet</p>
      </div>
      <div className="group h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 shadow-sm transition-all duration-300 hover:-rotate-6 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-emerald-900/30 dark:to-emerald-800/30">
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Emerald</p>
      </div>
      <div className="group h-28 w-28 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 shadow-sm transition-all duration-300 hover:rotate-6 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-amber-900/30 dark:to-amber-800/30">
        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Amber</p>
      </div>
    </div>
  );
}
