"use client";

import { useState } from "react";
import { Music } from "lucide-react";

export function ClubNightDemo() {
  const [spots, setSpots] = useState(50);
  const features = [
    { label: "DJ Live", icon: "\uD83C\uDFA7" },
    { label: "Dance Floor", icon: "\uD83D\uDC83" },
    { label: "VIP Lounge", icon: "\uD83C\uDF7E" },
    { label: "Late Night", icon: "\uD83C\uDF19" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="relative h-32 bg-gradient-to-br from-purple-900 to-pink-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-16 w-16 text-white/20" />
          </div>
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">This Weekend</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-xl font-extrabold text-white">Hip Hop Night</p>
            <p className="text-xs text-white/70">Saturday &middot; 10 PM - 4 AM</p>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 grid grid-cols-4 gap-2">
            {features.map((f) => (
              <div key={f.label} className="text-center">
                <span className="text-xl">{f.icon}</span>
                <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{spots} spots left</p>
              <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${spots}%` }} />
              </div>
            </div>
            <button onClick={() => setSpots((s) => Math.max(0, s - 1))} className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900">
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
