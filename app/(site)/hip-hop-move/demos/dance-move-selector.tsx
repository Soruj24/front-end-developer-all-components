"use client";

import { useState } from "react";
import { Music } from "lucide-react";
import { DanceMoveRenderer } from "./dance-move-renderer";

export function DanceMoveSelectorDemo() {
  const [selected, setSelected] = useState("bounce");
  const moves = [
    { id: "bounce", name: "Bounce", desc: "Classic hip hop bounce" },
    { id: "wave", name: "Wave", desc: "Body wave motion" },
    { id: "pop", name: "Pop", desc: "Pop and lock hit" },
    { id: "lock", name: "Lock", desc: "Freeze and hold" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dance Moves</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-center">
            <DanceMoveRenderer move={selected} size={100} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {moves.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  selected === m.id
                    ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                }`}
              >
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{m.name}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
