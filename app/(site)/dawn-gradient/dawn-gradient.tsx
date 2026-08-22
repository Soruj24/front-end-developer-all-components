"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Pause, Play, SlidersHorizontal, Zap } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DawnGradientDemoProps {
  title?: string;
  description?: string;
  defaultRunning?: boolean;
  intervalMs?: number;
  className?: string;
}

export function DawnGradientDemo({
  title = "Dawn Gradient",
  description = "Animated conic-gradient backdrop",
  defaultRunning = false,
  intervalMs = 50,
  className,
}: DawnGradientDemoProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(defaultRunning && !prefersReducedMotion);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setAngle((a) => (a + 10) % 360), intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs]);

  const gradient = `conic-gradient(from ${angle}deg at 50% 50%, #f97316, #ff8c4d, #fbbf24, #22c55e, #14b8a6, #6366f1, #a855f7, #ec4899, #f97316)`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary-soft text-primary"
          >
            <Zap className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={panelOpen}
            aria-controls="dawn-gradient-settings"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            Settings
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                panelOpen && "rotate-180",
              )}
            />
          </button>

          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            aria-pressed={running}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]",
              running
                ? "border border-border bg-background text-foreground hover:bg-muted"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            {running ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {running ? "Stop" : "Animate"}
          </button>
        </div>
      </div>

      <div
        id="dawn-gradient-settings"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          panelOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 py-4">
            <label
              htmlFor="dawn-gradient-angle"
              className="mb-2 flex items-center justify-between text-xs font-medium text-foreground"
            >
              Angle
              <span className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono tabular-nums text-muted-foreground">
                {angle}°
              </span>
            </label>
            <input
              id="dawn-gradient-angle"
              type="range"
              min={0}
              max={359}
              step={1}
              value={angle}
              disabled={running}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {running ? "Stop the animation to adjust the angle." : "Drag to rotate the gradient manually."}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-56 w-full overflow-hidden border-t border-border sm:h-72 md:h-80">
        <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15"
        />
        <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white backdrop-blur-sm">
          <Zap className="h-3 w-3" aria-hidden="true" />
          conic-gradient · {angle}°
        </p>
      </div>
    </div>
  );
}

export default DawnGradientDemo;
