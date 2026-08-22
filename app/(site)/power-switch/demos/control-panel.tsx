"use client";

import { useState } from "react";
import { Power, Wifi, Bluetooth, Volume2, Bell } from "lucide-react";

export function ControlPanel() {
  const [controls, setControls] = useState([
    { id: 1, icon: Power, label: "Master Power", on: true, color: "text-emerald-500" },
    { id: 2, icon: Wifi, label: "Wi-Fi", on: true, color: "text-blue-500" },
    { id: 3, icon: Bluetooth, label: "Bluetooth", on: false, color: "text-purple-500" },
    { id: 4, icon: Volume2, label: "Sound", on: true, color: "text-amber-500" },
    { id: 5, icon: Bell, label: "Alerts", on: false, color: "text-red-500" },
  ]);

  const toggle = (id: number) => setControls(controls.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-2">
        {controls.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.id} className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${c.on ? c.color : "text-zinc-300 dark:text-zinc-600"}`} />
                <span className={`text-sm font-medium ${c.on ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}`}>{c.label}</span>
              </div>
              <button
                onClick={() => toggle(c.id)}
                className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                  c.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
                role="switch"
                aria-checked={c.on}
              >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  c.on ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
