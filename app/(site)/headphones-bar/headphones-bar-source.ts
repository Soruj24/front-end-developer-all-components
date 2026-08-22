export const HEADPHONES_BAR_SOURCE = `"use client";

import { useState } from "react";
import { Headphones, Volume2, VolumeX } from "lucide-react";

interface HeadphonesBarProps {
  volume?: number;
  muted?: boolean;
  className?: string;
}

export function HeadphonesBar({ volume: initialVolume = 50, muted: initialMuted = false, className = "" }: HeadphonesBarProps) {
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(initialMuted);

  return (
    <div className={\`rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 \${className}\`}>
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Headphones className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Volume Control</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{muted ? "Muted" : \`\${volume}%\`}</p>
        </div>
        <button
          onClick={() => setMuted(!muted)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <VolumeX className="h-3 w-3 shrink-0 text-zinc-400 dark:text-zinc-500" />
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            if (muted) setMuted(false);
          }}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100"
        />
        <Volume2 className="h-3 w-3 shrink-0 text-zinc-400 dark:text-zinc-500" />
      </div>
      <div className="flex gap-1.5">
        {[25, 50, 75, 100].map((v) => (
          <button
            key={v}
            onClick={() => { setVolume(v); setMuted(false); }}
            className={\`flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all \${
              volume === v && !muted
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }\`}
          >
            {v}%
          </button>
        ))}
      </div>
    </div>
  );
}`;
