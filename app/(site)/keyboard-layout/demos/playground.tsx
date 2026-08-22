"use client";

import { useState } from "react";
import { KeyCap } from "./key-cap";

export function PlaygroundDemo() {
  const [highlightKeys, setHighlightKeys] = useState<string[]>(["W", "A", "S", "D"]);
  const [layout, setLayout] = useState<"qwerty" | "compact" | "mac">("qwerty");

  const toggleKey = (key: string) => {
    setHighlightKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const qwertyRows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  const compactRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const rows = layout === "compact" ? compactRows : qwertyRows;

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Layout</p>
          <div className="flex gap-1">
            {(["qwerty", "compact", "mac"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`rounded-lg px-2 py-1 text-[10px] font-medium capitalize transition-all ${
                  layout === l
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {rows.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1">
              {row.map((key) => (
                <button key={key} onClick={() => toggleKey(key)}>
                  <KeyCap label={key} size={layout === "compact" ? "sm" : "md"} highlight={highlightKeys.includes(key)} />
                </button>
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-1">
            <KeyCap label="Space" size="lg" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="mb-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">Highlighted Keys</p>
        <div className="flex flex-wrap gap-1.5">
          {highlightKeys.length === 0 ? (
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Click keys on the keyboard to highlight them</span>
          ) : (
            highlightKeys.map((k) => (
              <kbd key={k} className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-200 bg-blue-50 font-mono text-[10px] font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {k}
              </kbd>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
