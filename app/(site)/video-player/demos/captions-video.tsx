"use client";

import { useState } from "react";
import { Play, Pause, Volume2, SkipBack, SkipForward } from "lucide-react";

const SUBTITLES = [
  { time: 0, text: "Welcome to this video tutorial" },
  { time: 3, text: "We'll be covering design systems" },
  { time: 6, text: "Let's get started with the basics" },
  { time: 9, text: "First, let's talk about tokens" },
  { time: 12, text: "Tokens are the foundation of design" },
];

export function CaptionsVideo() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);

  const currentSubtitle = SUBTITLES.reduce((acc, s) => (time >= s.time ? s : acc), SUBTITLES[0]);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative rounded-xl m-3 overflow-hidden bg-zinc-900">
        <video src="/video.mp4" className="w-full aspect-video object-cover" />
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <span className="rounded-lg bg-black/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
            {currentSubtitle.text}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button onClick={() => setPlaying(!playing)} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
              </button>
              <button className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Previous">
                <SkipBack className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Next">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setMuted(!muted)} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={muted ? "Unmute" : "Mute"}>
                <Volume2 className="h-4 w-4" />
              </button>
              <span className="text-[10px] font-medium text-white/60">CC</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">CC</span>
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">With Captions</p>
        </div>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Subtitle track overlay</p>
      </div>
    </div>
  );
}
