"use client";

import { useState } from "react";

export function CalculatorWidget() {
  const [display, setDisplay] = useState("0");

  const handleNum = (n: string) => setDisplay((d) => (d === "0" ? n : d + n));
  const handleClear = () => setDisplay("0");

  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="bg-zinc-100 px-4 py-4 text-right font-mono text-2xl font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{display}</div>
      <div className="grid grid-cols-4 gap-1.5 p-3">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") {
                try { setDisplay(String(eval(display))); } catch { setDisplay("Error"); }
              } else handleNum(btn);
            }}
            className={`flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-all active:scale-95 ${
              btn === "="
                ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {btn}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-4 flex h-11 items-center justify-center rounded-xl bg-red-50 text-sm font-medium text-red-600 transition-all hover:bg-red-100 active:scale-[0.98] dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50">C</button>
      </div>
    </div>
  );
}
