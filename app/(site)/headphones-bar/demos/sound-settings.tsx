"use client";

import { useState } from "react";
import { Headphones, Check } from "lucide-react";

export function SoundSettingsDemo() {
  const [settings, setSettings] = useState({
    spatial: true,
    noiseCancel: false,
    autoVolume: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sound Settings</h3>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {[
            { key: "spatial" as const, label: "Spatial Audio", desc: "3D surround sound" },
            { key: "noiseCancel" as const, label: "Noise Cancellation", desc: "Block ambient noise" },
            { key: "autoVolume" as const, label: "Auto Volume", desc: "Adjust to environment" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                settings[item.key]
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors ${
                  settings[item.key]
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "border border-zinc-300 dark:border-zinc-600"
                }`}
              >
                {settings[item.key] && <Check className="h-3 w-3" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{item.label}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
