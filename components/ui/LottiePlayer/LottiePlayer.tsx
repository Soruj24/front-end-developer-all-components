"use client";

import { cn } from "@/lib/cn";
import type { LottiePlayerProps } from "./LottiePlayer.types";

export function LottiePlayer({ animation, playing = true, loop = true, speed = 1, onPlay, onPause, onLoop, className }: LottiePlayerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "flex h-48 w-full items-center justify-center rounded-2xl border border-border bg-card",
          "transition-all duration-300",
        )}
        style={{ animationDuration: `${1 / speed}s`, animationPlayState: playing ? "running" : "paused" }}
      >
        {animation ?? (
          <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
            ✨
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={playing ? onPause : onPlay}
          aria-label={playing ? "Pause" : "Play"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            playing
              ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]"
              : "bg-muted text-foreground hover:bg-muted/80 active:scale-[0.98]",
          )}
        >
          {playing ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onLoop}
          aria-label={loop ? "Loop on" : "Loop off"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            loop
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Loop
        </button>
      </div>
    </div>
  );
}
