"use client";

import { useState, useEffect } from "react";
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  Radio,
  Mic,
  Settings,
  Check,
} from "lucide-react";

export function PlaygroundDemo() {
  const [volume, setVolume] = useState(65);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [spatial, setSpatial] = useState(true);
  const [noiseCancel, setNoiseCancel] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full max-w-lg space-y-4">
      {/* Volume */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Headphones className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Volume</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{muted ? "Muted" : `${volume}%`}</p>
          </div>
          <button
            onClick={() => setMuted(!muted)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <VolumeX className="h-3 w-3 shrink-0 text-zinc-400" />
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); if (muted) setMuted(false); }}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100"
          />
          <Volume2 className="h-3 w-3 shrink-0 text-zinc-400" />
        </div>
        <div className="mt-2 flex gap-1.5">
          {[25, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => { setVolume(v); setMuted(false); }}
              className={`flex-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all ${
                volume === v && !muted
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>

      {/* Player */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-2 text-center">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Now Playing</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Luna Wave &middot; Midnight Dreams</p>
        </div>
        <div className="mb-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sound Settings</p>
        </div>
        <div className="space-y-2">
          {[
            { key: "spatial" as const, label: "Spatial Audio", val: spatial, fn: () => setSpatial(!spatial) },
            { key: "nc" as const, label: "Noise Cancellation", val: noiseCancel, fn: () => setNoiseCancel(!noiseCancel) },
          ].map((s) => (
            <button
              key={s.key}
              onClick={s.fn}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                s.val
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors ${
                  s.val ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border border-zinc-300 dark:border-zinc-600"
                }`}
              >
                {s.val && <Check className="h-3 w-3" />}
              </div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{s.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
