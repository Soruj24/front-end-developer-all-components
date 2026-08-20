"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { AudioPlayerProps, Track } from "./AudioPlayer.types";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

function parseDuration(dur: string): number {
  const parts = dur.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ tracks, className }: AudioPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);
  const track: Track = tracks[current];
  const totalSeconds = parseDuration(track.duration);
  const currentSeconds = (progress / 100) * totalSeconds;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length);
    setProgress(0);
  }, [tracks.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % tracks.length);
    setProgress(0);
  }, [tracks.length]);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
      role="region"
      aria-label="Audio player"
    >
      {/* Now Playing */}
      <div className="flex items-center gap-3.5 px-4 pt-4 pb-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
          {track.artwork ? (
            <img
              src={track.artwork}
              alt={`${track.title} artwork`}
              className="h-full w-full object-cover"
            />
          ) : (
            <Music className="h-5 w-5 text-primary" />
          )}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <div className="flex items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-primary animate-pulse"
                    style={{
                      height: `${8 + (i % 3) * 4}px`,
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {track.title}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {track.artist}
          </p>
        </div>

        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {track.duration}
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 px-4 pb-2">
        <span className="w-10 text-right text-[11px] tabular-nums text-muted-foreground">
          {formatTime(currentSeconds)}
        </span>
        <div className="relative flex-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary/20
              [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125
              [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md"
            aria-label="Seek"
          />
        </div>
        <span className="w-10 text-[11px] tabular-nums text-muted-foreground">
          {track.duration}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label="Previous track"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={togglePlay}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25",
              "transition-all duration-150 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
            )}
          </button>

          <button
            onClick={next}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label="Next track"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (muted) setMuted(false);
            }}
            className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-primary/20
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125
              [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Track list */}
      <div className="border-t border-border">
        <p className="px-4 pt-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Playlist
        </p>
        <div className="flex flex-col pb-2">
          {tracks.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setProgress(0);
                setPlaying(true);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-left transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                i === current
                  ? "bg-primary/5 text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
              aria-label={`Play ${t.title} by ${t.artist}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-medium tabular-nums">
                {i === current && playing ? (
                  <span className="flex items-end gap-[2px]">
                    {[0, 1, 2].map((j) => (
                      <span
                        key={j}
                        className="w-[2px] rounded-full bg-primary animate-pulse"
                        style={{
                          height: `${4 + (j % 3) * 2}px`,
                          animationDelay: `${j * 120}ms`,
                        }}
                      />
                    ))}
                  </span>
                ) : (
                  <span
                    className={cn(
                      i === current ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-sm",
                    i === current
                      ? "font-medium text-foreground"
                      : "font-normal",
                  )}
                >
                  {t.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.artist}
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {t.duration}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
