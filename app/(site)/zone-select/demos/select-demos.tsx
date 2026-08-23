"use client";

import { useState } from "react";

const ZONES = ["Frontend", "Backend", "DevOps", "Design"];

export function BasicSelect() {
  const [selected, setSelected] = useState<string[]>(["Frontend", "Backend"]);

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {ZONES.map((zone) => (
        <label key={zone} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${selected.includes(zone) ? "border-blue-200 bg-blue-50 shadow-sm dark:border-blue-800 dark:bg-blue-950/30" : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"}`}>
          <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${selected.includes(zone) ? "border-blue-500 bg-blue-500" : "border-zinc-300 dark:border-zinc-600"}`}>
            {selected.includes(zone) && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={selected.includes(zone)} onChange={() => toggle(zone)} />
          <span className={`text-sm font-medium ${selected.includes(zone) ? "text-blue-900 dark:text-blue-100" : "text-zinc-700 dark:text-zinc-300"}`}>{zone}</span>
        </label>
      ))}
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{selected.length} of {ZONES.length} selected</p>
    </div>
  );
}

export function SelectWithIcons() {
  const [selected, setSelected] = useState<string[]>(["Frontend"]);

  const zones = [
    { name: "Frontend", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { name: "Backend", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
    { name: "DevOps", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { name: "Design", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  ];

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {zones.map((z) => (
        <label key={z.name} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${selected.includes(z.name) ? "border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"}`}>
          <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${selected.includes(z.name) ? "border-emerald-500 bg-emerald-500" : "border-zinc-300 dark:border-zinc-600"}`}>
            {selected.includes(z.name) && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={selected.includes(z.name)} onChange={() => toggle(z.name)} />
          <svg className={`h-4 w-4 ${selected.includes(z.name) ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={z.icon} /></svg>
          <span className={`text-sm font-medium ${selected.includes(z.name) ? "text-emerald-900 dark:text-emerald-100" : "text-zinc-700 dark:text-zinc-300"}`}>{z.name}</span>
        </label>
      ))}
    </div>
  );
}

export function SelectCompact() {
  const [selected, setSelected] = useState<string[]>(["Frontend", "Backend"]);

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="flex flex-wrap gap-1.5">
        {ZONES.map((zone) => (
          <button key={zone} onClick={() => toggle(zone)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${selected.includes(zone) ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectWithActions() {
  const [selected, setSelected] = useState<string[]>(["Frontend", "Backend", "DevOps"]);

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{selected.length} selected</span>
        <div className="flex gap-1.5">
          <button onClick={() => setSelected(ZONES)} className="rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600 transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">Select All</button>
          <button onClick={() => setSelected([])} className="rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600 transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">Clear</button>
        </div>
      </div>
      <div className="space-y-1.5">
        {ZONES.map((zone) => (
          <label key={zone} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-200 ${selected.includes(zone) ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30" : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"}`}>
            <div className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-all ${selected.includes(zone) ? "border-amber-500 bg-amber-500" : "border-zinc-300 dark:border-zinc-600"}`}>
              {selected.includes(zone) && (
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            <input type="checkbox" className="sr-only" checked={selected.includes(zone)} onChange={() => toggle(zone)} />
            <span className={`text-xs font-medium ${selected.includes(zone) ? "text-amber-900 dark:text-amber-100" : "text-zinc-700 dark:text-zinc-300"}`}>{zone}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function SelectWithDescription() {
  const [selected, setSelected] = useState<string[]>(["Frontend"]);

  const zones = [
    { name: "Frontend", desc: "React, Vue, Angular" },
    { name: "Backend", desc: "Node, Python, Go" },
    { name: "DevOps", desc: "Docker, K8s, CI/CD" },
    { name: "Design", desc: "Figma, Sketch, XD" },
  ];

  const toggle = (zone: string) => {
    setSelected((prev) => prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]);
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {zones.map((z) => (
        <label key={z.name} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${selected.includes(z.name) ? "border-violet-200 bg-violet-50 shadow-sm dark:border-violet-800 dark:bg-violet-950/30" : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"}`}>
          <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${selected.includes(z.name) ? "border-violet-500 bg-violet-500" : "border-zinc-300 dark:border-zinc-600"}`}>
            {selected.includes(z.name) && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={selected.includes(z.name)} onChange={() => toggle(z.name)} />
          <div className="flex-1">
            <span className={`text-sm font-medium ${selected.includes(z.name) ? "text-violet-900 dark:text-violet-100" : "text-zinc-700 dark:text-zinc-300"}`}>{z.name}</span>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{z.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
}
