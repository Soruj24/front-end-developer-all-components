"use client";

import { useState } from "react";

export function BasicMap() {
  const [selected, setSelected] = useState(4);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-700">
        {["North", "Central", "South", "West", "Core", "East", "SW", "South", "SE"].map((zone, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`flex h-16 items-center justify-center text-xs font-medium transition-all duration-200 ${selected === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
            {zone}
          </button>
        ))}
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Selected: <span className="text-zinc-900 dark:text-zinc-100">{["North", "Central", "South", "West", "Core", "East", "SW", "South", "SE"][selected]}</span></p>
      </div>
    </div>
  );
}

export function MapWithColors() {
  const [selected, setSelected] = useState(4);

  const colors = [
    { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", active: "bg-blue-600 text-white" },
    { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-400", active: "bg-violet-600 text-white" },
    { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", active: "bg-emerald-600 text-white" },
    { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", active: "bg-amber-600 text-white" },
    { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400", active: "bg-rose-600 text-white" },
  ];

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-700">
        {["North", "Central", "South", "West", "Core", "East", "SW", "South", "SE"].map((zone, i) => {
          const c = colors[i % colors.length];
          return (
            <button key={i} onClick={() => setSelected(i)} className={`flex h-16 items-center justify-center text-xs font-medium transition-all duration-200 ${selected === i ? c.active : `${c.bg} ${c.text} hover:opacity-80`}`}>
              {zone}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MapWithPins() {
  const [selected, setSelected] = useState<number | null>(null);

  const pins = [
    { name: "Server A", x: "20%", y: "30%" },
    { name: "Server B", x: "70%", y: "25%" },
    { name: "Database", x: "50%", y: "60%" },
    { name: "CDN", x: "80%", y: "70%" },
  ];

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200">
          <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
          <line x1="200" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" strokeDasharray="4 4" />
          <line x1="300" y1="0" x2="300" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" strokeDasharray="4 4" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" strokeDasharray="4 4" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" strokeDasharray="4 4" />
        </svg>
        {pins.map((pin, i) => (
          <button key={i} onClick={() => setSelected(i)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pin.x, top: pin.y }}>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${selected === i ? "bg-zinc-900 text-white scale-125 dark:bg-zinc-100 dark:text-zinc-900" : "bg-white text-zinc-600 shadow-md hover:scale-110 dark:bg-zinc-800 dark:text-zinc-400"}`}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-800/50">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pin: <span className="text-zinc-900 dark:text-zinc-100">{pins[selected].name}</span></p>
        </div>
      )}
    </div>
  );
}

export function MapCompact() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-700">
        {Array.from({ length: 8 }).map((_, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`flex h-12 items-center justify-center text-[10px] font-medium transition-all duration-200 ${selected === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-white text-zinc-500 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MapWithLegend() {
  const [selected, setSelected] = useState(4);

  const zones = [
    { name: "North", status: "active" },
    { name: "Central", status: "active" },
    { name: "South", status: "warning" },
    { name: "West", status: "active" },
    { name: "Core", status: "critical" },
    { name: "East", status: "active" },
    { name: "SW", status: "inactive" },
    { name: "South", status: "active" },
    { name: "SE", status: "warning" },
  ];

  const statusColors = {
    active: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    critical: "bg-rose-500 text-white",
    inactive: "bg-zinc-300 text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300",
  };

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-700">
          {zones.map((zone, i) => (
            <button key={i} onClick={() => setSelected(i)} className={`relative flex h-16 items-center justify-center text-xs font-medium transition-all duration-200 ${selected === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
              {zone.name}
              <span className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${statusColors[zone.status as keyof typeof statusColors]}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Active", color: "bg-emerald-500" },
          { label: "Warning", color: "bg-amber-500" },
          { label: "Critical", color: "bg-rose-500" },
          { label: "Inactive", color: "bg-zinc-300 dark:bg-zinc-600" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${l.color}`} />
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
