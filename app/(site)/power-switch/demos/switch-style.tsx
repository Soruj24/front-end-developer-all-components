"use client";

import { useState } from "react";

export function SwitchStyle() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-center gap-6 p-8">
      <button
        onClick={() => setOn(!on)}
        className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
          on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"
        }`}
        role="switch"
        aria-checked={on}
      >
        <div className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          on ? "translate-x-7" : "translate-x-0.5"
        }`} />
      </button>
    </div>
  );
}
