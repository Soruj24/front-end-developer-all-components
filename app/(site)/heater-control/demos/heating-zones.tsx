"use client";

import { useState } from "react";
import { Home, Thermometer } from "lucide-react";

export function HeatingZonesDemo() {
  const [zones, setZones] = useState([
    { id: 1, name: "Ground Floor", temp: 22, active: true },
    { id: 2, name: "First Floor", temp: 20, active: true },
    { id: 3, name: "Basement", temp: 18, active: false },
  ]);

  const toggle = (id: number) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z)));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Heating Zones</h3>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => toggle(z.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                z.active
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  z.active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                <Thermometer className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{z.name}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{z.temp}°C target</p>
              </div>
              <span className={`text-[10px] font-medium ${z.active ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}`}>
                {z.active ? "ON" : "OFF"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
