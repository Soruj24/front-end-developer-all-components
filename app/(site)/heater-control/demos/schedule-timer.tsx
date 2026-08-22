"use client";

import { useState } from "react";
import { Clock, Thermometer } from "lucide-react";

export function ScheduleTimerDemo() {
  const [active, setActive] = useState(true);
  const schedule = [
    { time: "06:00", temp: 21, label: "Wake Up" },
    { time: "08:30", temp: 18, label: "Leave" },
    { time: "17:00", temp: 22, label: "Return" },
    { time: "22:00", temp: 19, label: "Sleep" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Heating Schedule</h3>
            <button
              onClick={() => setActive(!active)}
              className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                active
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {active ? "Active" : "Paused"}
            </button>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {schedule.map((s) => (
            <div key={s.time} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
              <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{s.time}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{s.label}</p>
              </div>
              <div className="flex items-center gap-1">
                <Thermometer className="h-3 w-3 text-zinc-400" />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{s.temp}°</span>
              </div>
              <div className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
