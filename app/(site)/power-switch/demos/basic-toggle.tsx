"use client";

import { useState } from "react";
import { Power } from "lucide-react";

export function BasicToggle() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-center gap-8 p-8">
      <button
        onClick={() => setOn(!on)}
        className="flex flex-col items-center gap-2 group"
      >
        <div className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
          on
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 group-hover:bg-emerald-600"
            : "bg-zinc-200 text-zinc-400 group-hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-500 dark:group-hover:bg-zinc-600"
        }`}>
          <Power className="h-6 w-6" />
        </div>
        <span className={`text-xs font-medium ${on ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}>{on ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
