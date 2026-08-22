"use client";

import { useState } from "react";
import { Mic } from "lucide-react";

export function TranscriptionView() {
  const [segments] = useState([
    { id: 1, speaker: "Alice", text: "Let's discuss the new feature.", time: "0:00" },
    { id: 2, speaker: "Bob", text: "Sure, I have some ideas.", time: "0:05" },
    { id: 3, speaker: "Alice", text: "Great, let me share my screen.", time: "0:12" },
    { id: 4, speaker: "Bob", text: "Looks good, let's proceed.", time: "0:18" },
  ]);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mic className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Transcription View</h3>
      </div>
      <div className="max-h-64 space-y-1.5 overflow-y-auto">
        {segments.map((seg) => (
          <div
            key={seg.id}
            onClick={() => setHighlighted(seg.id === highlighted ? null : seg.id)}
            className={`cursor-pointer rounded-xl p-3 transition-all ${
              highlighted === seg.id
                ? "border border-zinc-300 bg-zinc-100 shadow-sm dark:border-zinc-600 dark:bg-zinc-800"
                : "border border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">{seg.speaker}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{seg.time}</span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">{seg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
