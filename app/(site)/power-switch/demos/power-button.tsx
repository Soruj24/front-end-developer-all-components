"use client";

import { useState } from "react";
import { Power } from "lucide-react";

export function PowerButtonStyle() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => setOn(!on)}
        className={`group relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 ${
          on
            ? "bg-emerald-500 shadow-xl shadow-emerald-500/30"
            : "bg-zinc-200 shadow-inner dark:bg-zinc-700"
        }`}
        aria-label={on ? "Power off" : "Power on"}
      >
        <div className={`absolute inset-1 rounded-full transition-all duration-500 ${
          on ? "bg-emerald-400 opacity-50" : "bg-zinc-300 opacity-0 dark:bg-zinc-600"
        }`} />
        <Power className={`relative z-10 h-8 w-8 transition-all duration-300 ${
          on ? "text-white scale-110" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
        }`} />
      </button>
    </div>
  );
}
