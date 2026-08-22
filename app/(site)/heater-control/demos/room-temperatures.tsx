"use client";

import { useState } from "react";
import { Home } from "lucide-react";

export function RoomTemperaturesDemo() {
  const [selected, setSelected] = useState("living");
  const rooms = [
    { id: "living", name: "Living Room", temp: 22, target: 22, icon: "\uD83D\uDECB\uFE0F" },
    { id: "bedroom", name: "Bedroom", temp: 20, target: 21, icon: "\uD83D\uDECF\uFE0F" },
    { id: "kitchen", name: "Kitchen", temp: 24, target: 23, icon: "\uD83C\uDF73" },
    { id: "bathroom", name: "Bathroom", temp: 25, target: 24, icon: "\uD83D\uDEBF" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Room Temperatures</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`rounded-lg border p-3 text-left transition-all ${
                selected === r.id
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <span className="text-xl">{r.icon}</span>
              <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{r.name}</p>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{r.temp}°</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Target: {r.target}°</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
