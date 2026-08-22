"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Copy, Check } from "lucide-react";

export function FlagSelector() {
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const toggle = (f: "g" | "i" | "m" | "s") => setFlags({ ...flags, [f]: !flags[f] });

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Flags</label>
          <div className="mt-1 flex gap-1.5">
            {(["g", "i", "m", "s"] as const).map((f) => (
              <button
                key={f}
                onClick={() => toggle(f)}
                className={`h-8 w-8 rounded-lg font-mono text-xs font-bold transition-all ${
                  flags[f]
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            /pattern/{Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("") || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
