"use client";

import { Activity, Heart, Zap, Flame } from "lucide-react";

export function HealthDashboardDemo() {
  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "text-red-500" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "text-blue-500" },
    { label: "SpO2", value: "98", unit: "%", icon: Zap, color: "text-emerald-500" },
    { label: "Temperature", value: "98.6", unit: "\u00B0F", icon: Flame, color: "text-orange-500" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Health Dashboard</h3>
            <span className="ml-auto text-[10px] font-medium text-emerald-600 dark:text-emerald-400">All Normal</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {vitals.map((v) => (
            <div key={v.label} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
              <div className="mb-2 flex items-center gap-2">
                <v.icon className={`h-4 w-4 ${v.color}`} />
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{v.label}</span>
              </div>
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{v.value}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{v.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
