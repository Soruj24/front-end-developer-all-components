"use client";

import { useState } from "react";
import { Headphones, Check } from "lucide-react";

export function HeadphoneSelectorDemo() {
  const [selected, setSelected] = useState("airpods");
  const devices = [
    { id: "airpods", name: "AirPods Pro", battery: 85, icon: "🎧" },
    { id: "sony", name: "Sony WH-1000", battery: 62, icon: "🎙️" },
    { id: "speaker", name: "HomePod", battery: 100, icon: "🔊" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audio Output</h3>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {devices.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                selected === d.id
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <span className="text-2xl">{d.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{d.name}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Battery: {d.battery}%</p>
              </div>
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className={`h-full rounded-full ${
                    d.battery > 50 ? "bg-emerald-500" : d.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${d.battery}%` }}
                />
              </div>
              {selected === d.id && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100">
                  <Check className="h-3 w-3 text-white dark:text-zinc-900" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
