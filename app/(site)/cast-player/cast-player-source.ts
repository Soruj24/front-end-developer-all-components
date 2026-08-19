export const CASTPLAYER_SOURCE = `"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, Cast } from "lucide-react";

interface CastPlayerProps {
  title?: string;
  duration?: number;
  onCast?: () => void;
  className?: string;
}

export function CastPlayer({ title = "Video Title", duration = 180, onCast, className = "" }: CastPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 0;
        }
        return p + 0.3;
      });
    }, 50);
    return () => clearInterval(id);
  }, [playing]);

  const formatTime = (p: number) => {
    const sec = Math.floor((p / 100) * duration);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ":" + String(s).padStart(2, "0");
  };

  return (
    <div className={"w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145] " + className}>
      <div className="relative aspect-video bg-zinc-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <span className="text-xs font-medium text-white/60">{title}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
          <div className="relative h-1.5 rounded-full bg-white/20 mb-2">
            <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: progress + "%" }} />
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPlaying(!playing)} className="text-white">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button type="button" className="text-white/70">
              <SkipForward className="h-4 w-4" />
            </button>
            <button type="button" className="text-white/70">
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="w-16 h-1 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: volume + "%" }} />
            </div>
            <span className="ml-auto text-[10px] font-mono text-white/60">
              {formatTime(progress)} / {formatTime(100)}
            </span>
            <button type="button" onClick={onCast} className="text-white/70">
              <Cast className="h-4 w-4" />
            </button>
            <button type="button" className="text-white/70">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`;