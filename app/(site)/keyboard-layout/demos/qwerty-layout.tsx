"use client";

import { KeyCap } from "./key-cap";

export function QWERTYLayoutDemo() {
  const rows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  return (
    <div className="flex w-full max-w-2xl flex-col gap-1.5 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="md" />
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        <KeyCap label="Ctrl" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Space" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Ctrl" size="lg" />
      </div>
    </div>
  );
}
