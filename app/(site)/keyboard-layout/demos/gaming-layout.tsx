"use client";

import { KeyCap } from "./key-cap";

export function GamingLayoutDemo() {
  const movementKeys = [
    { label: "W", action: "Forward" },
    { label: "A", action: "Left" },
    { label: "S", action: "Back" },
    { label: "D", action: "Right" },
  ];

  return (
    <div className="flex w-full max-w-sm items-center gap-8">
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <div className="w-10" />
          <KeyCap label="W" highlight />
        </div>
        <div className="flex gap-1">
          <KeyCap label="A" highlight />
          <KeyCap label="S" highlight />
          <KeyCap label="D" highlight />
        </div>
      </div>
      <div className="space-y-2">
        {movementKeys.map((k) => (
          <div key={k.label} className="flex items-center gap-2">
            <kbd className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-blue-500 bg-blue-50 font-mono text-sm font-bold text-blue-700 shadow-sm dark:bg-blue-950 dark:text-blue-300 dark:shadow-blue-900/50">
              {k.label}
            </kbd>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{k.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
