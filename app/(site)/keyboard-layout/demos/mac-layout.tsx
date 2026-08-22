"use client";

import { KeyCap } from "./key-cap";

export function MacLayoutDemo() {
  const topRow = ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
  const mainRow = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  return (
    <div className="flex w-full max-w-2xl flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-1 flex gap-1">
        {topRow.map((k) => (
          <KeyCap key={k} label={k} size="sm" />
        ))}
      </div>
      {mainRow.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="md" />
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        <KeyCap label="fn" size="sm" />
        <KeyCap label="Ctrl" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Cmd" size="lg" highlight />
        <KeyCap label="Space" size="lg" />
        <KeyCap label="Cmd" size="lg" highlight />
        <KeyCap label="Alt" size="lg" />
      </div>
    </div>
  );
}
