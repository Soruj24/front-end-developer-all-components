"use client";

import { KeyCap } from "./key-cap";

export function CompactLayoutDemo() {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className="flex w-full max-w-md flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {rows.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-0.5">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="sm" />
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-0.5">
        <KeyCap label="Space" size="lg" />
      </div>
    </div>
  );
}
