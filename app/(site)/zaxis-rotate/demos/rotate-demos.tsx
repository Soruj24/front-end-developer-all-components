"use client";

import { useState } from "react";

export function BasicRotate() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 3s linear infinite" }}>Z</div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 2s linear infinite reverse" }}>Z</div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 4s linear infinite" }}>Z</div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export function RotateSpeeds() {
  const speeds = [
    { label: "Slow", duration: "4s", color: "from-blue-500 to-violet-500" },
    { label: "Normal", duration: "2s", color: "from-emerald-500 to-teal-500" },
    { label: "Fast", duration: "1s", color: "from-amber-500 to-orange-500" },
    { label: "Very Fast", duration: "0.5s", color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center gap-4 py-4">
          {speeds.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} font-mono text-sm font-bold text-white shadow-lg`} style={{ animation: `spin ${s.duration} linear infinite` }}>Z</div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{s.label}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export function RotateDirections() {
  const dirs = [
    { label: "Clockwise", reverse: false, color: "from-blue-500 to-violet-500" },
    { label: "Counter-clockwise", reverse: true, color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center gap-8 py-4">
          {dirs.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2">
              <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${d.color} font-mono text-sm font-bold text-white shadow-lg`} style={{ animation: `spin 2s linear infinite ${d.reverse ? "reverse" : ""}` }}>Z</div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{d.label}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export function RotateEasing() {
  const easings = [
    { label: "Linear", timing: "linear", color: "from-blue-500 to-violet-500" },
    { label: "Ease", timing: "ease", color: "from-emerald-500 to-teal-500" },
    { label: "Ease-in", timing: "ease-in", color: "from-amber-500 to-orange-500" },
    { label: "Ease-out", timing: "ease-out", color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center gap-4 py-4">
          {easings.map((e) => (
            <div key={e.label} className="flex flex-col items-center gap-2">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${e.color} font-mono text-sm font-bold text-white shadow-lg`} style={{ animation: `spin 2s ${e.timing} infinite` }}>Z</div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{e.label}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export function RotateWithControls() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center py-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-mono text-lg font-bold text-white shadow-lg transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }}>Z</div>
        </div>
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => setRotation(rotation - 90)} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">-90</button>
        <button onClick={() => setRotation(0)} className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Reset</button>
        <button onClick={() => setRotation(rotation + 90)} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">+90</button>
      </div>
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">Current: {rotation}°</p>
    </div>
  );
}

export function RotateOnHover() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 font-mono text-sm font-bold text-white shadow-lg transition-transform duration-500 group-hover:rotate-180">Z</div>
          <div className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 font-mono text-sm font-bold text-white shadow-lg transition-transform duration-500 group-hover:-rotate-180">Z</div>
          <div className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-mono text-sm font-bold text-white shadow-lg transition-transform duration-500 group-hover:rotate-[720deg]">Z</div>
        </div>
        <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-400">Hover to rotate</p>
      </div>
    </div>
  );
}
