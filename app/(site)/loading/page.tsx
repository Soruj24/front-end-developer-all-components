"use client";

import { useState, useEffect } from "react";
import { ComponentPreview } from "@/components/preview";

export default function LoadingPage() {
  const [progress, setProgress] = useState(45);
  const [step, setStep] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const messages = ["Loading...", "Fetching...", "Almost there...", "Processing..."];

  const bars = [
    { label: "Default", color: "bg-blue-500", w: "w-3/4" },
    { label: "Success", color: "bg-emerald-500", w: "w-full" },
    { label: "Warning", color: "bg-warning", w: "w-1/2" },
    { label: "Error", color: "bg-danger", w: "w-2/3" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Loading States</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A comprehensive collection of loading patterns — spinners, progress
          bars, skeleton screens, overlays, and animations. Use the tabs to
          switch between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="loading-spinner-variants">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Small</span>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-blue-500" />
            <span className="text-[10px] text-muted-foreground/70">h-5 w-5</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Medium</span>
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-border border-t-purple-500" />
            <span className="text-[10px] text-muted-foreground/70">h-8 w-8</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Large</span>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-pink-500" />
            <span className="text-[10px] text-muted-foreground/70">h-12 w-12</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dual Ring</span>
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-400" />
              <div className="absolute h-7 w-7 animate-[spin_0.8s_linear_infinite_reverse] rounded-full border-[3px] border-transparent border-b-violet-500 border-l-violet-500" />
            </div>
            <span className="text-[10px] text-muted-foreground/70">counter-rotating</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Bouncing Dots</span>
            <div className="flex gap-2">
              {[0, 0.15, 0.3].map((delay, i) => (
                <div
                  key={i}
                  className="h-3 w-3 animate-bounce rounded-full bg-warning"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground/70">staggered 150ms</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Spinning Square</span>
            <div className="h-10 w-10 animate-[spin_1.5s_linear_infinite] rounded-md border-2 border-emerald-500 border-t-transparent bg-emerald-500/10" />
            <span className="text-[10px] text-muted-foreground/70">rounded-md</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 shadow-card">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Pulse Ring</span>
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute h-12 w-12 animate-[pulse-ring_1.5s_ease-out_infinite] rounded-full border-2 border-rose-400" />
              <div className="absolute h-8 w-8 animate-[pulse-ring_1.5s_ease-out_infinite_0.5s] rounded-full border-2 border-rose-500" />
              <div className="h-4 w-4 rounded-full bg-rose-500" />
            </div>
            <span className="text-[10px] text-muted-foreground/70">2 rings + dot</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="loading-progress-bars">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Indeterminate</h2>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/2 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 [background-size:200%_100%]" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Animated gradient sweeps back and forth</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Determinate</h2>
            <div className="mb-3 flex items-center gap-4">
              <span className="w-10 text-sm font-semibold text-primary">{progress}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Drag slider to update progress</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Color Variants</h2>
            <div className="flex flex-col gap-3">
              {bars.map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-medium text-muted-foreground">{bar.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full ${bar.color} ${bar.w} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Striped Progress</h2>
            <div className="flex flex-col gap-3">
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 animate-[progress-stripes_1s_linear_infinite] rounded-full bg-blue-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-1/2 animate-[progress-stripes_0.8s_linear_infinite] rounded-full bg-emerald-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-5/6 animate-[progress-stripes_1.2s_linear_infinite] rounded-full bg-rose-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Diagonal stripes move right</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="loading-skeleton-screens">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-pulse rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="mb-4 h-40 w-full rounded-lg bg-muted" />
            <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
            <div className="mb-1 h-4 w-full rounded bg-muted" />
            <div className="mb-4 h-4 w-2/3 rounded bg-muted" />
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-lg bg-muted" />
              <div className="h-8 w-20 rounded-lg bg-muted" />
            </div>
            <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Card Skeleton</p>
          </div>
          <div className="animate-pulse rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-full bg-muted" />
              <div className="flex-1">
                <div className="mb-1 h-5 w-32 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            </div>
            <div className="mb-1 h-4 w-full rounded bg-muted" />
            <div className="mb-4 h-4 w-5/6 rounded bg-muted" />
            <div className="flex gap-6 border-t border-border pt-4 dark:border-border">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="mb-1 h-6 w-10 rounded bg-muted" />
                  <div className="h-3 w-8 rounded bg-muted" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Profile Skeleton</p>
          </div>
          <div className="animate-pulse rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="mb-3 h-5 w-2/3 rounded bg-muted" />
            <div className="mb-1 h-4 w-full rounded bg-muted" />
            <div className="mb-1 h-4 w-full rounded bg-muted" />
            <div className="mb-4 h-4 w-3/4 rounded bg-muted" />
            <div className="mb-3 h-32 w-full rounded-lg bg-muted" />
            <div className="mb-1 h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Article Skeleton</p>
          </div>
          <div className="animate-pulse rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="mb-4 h-44 w-full rounded-lg bg-muted" />
            <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
            <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
            <div className="mb-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 rounded bg-muted" />
              ))}
            </div>
            <div className="h-6 w-20 rounded bg-muted" />
            <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Product Card Skeleton</p>
          </div>
          <div className="animate-pulse rounded-xl border border-border bg-background p-6 shadow-card">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-border py-3 last:border-b-0 dark:border-border"
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="mb-1 h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
            ))}
            <p className="mt-3 text-center text-[10px] text-muted-foreground/70">List Item Skeleton</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="loading-overlays">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Full-Screen Overlay</h2>
            <button
              onClick={() => setShowOverlay(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Launch Overlay
            </button>
            <p className="mt-3 text-xs text-muted-foreground">Click backdrop or ✕ to close</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Inline Section Loading</h2>
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-muted/40 py-8 dark:border-border dark:bg-muted/50">
              <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-border border-t-indigo-500" />
              <p className="text-sm font-medium text-muted-foreground">Loading content...</p>
              <div className="flex gap-4">
                <div className="h-2 w-16 animate-pulse rounded bg-muted dark:bg-muted" />
                <div className="h-2 w-24 animate-pulse rounded bg-muted dark:bg-muted" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Button Loading State</h2>
            <button
              onClick={() => {
                setButtonLoading(true);
                setTimeout(() => setButtonLoading(false), 2500);
              }}
              disabled={buttonLoading}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-80"
            >
              {buttonLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            {buttonLoading && (
              <p className="mt-3 text-xs text-indigo-500">Simulating save for 2.5s...</p>
            )}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="loading-animations">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Typing Dots</h2>
            <div className="flex items-center gap-1.5 py-6">
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full bg-indigo-500"
                  style={{
                    animation: `typing-dot 1.4s ${delay}s infinite ease-in-out both`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">3 dots with staggered scale/opacity</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Loading Text Morphing</h2>
            <div className="relative flex h-10 items-center py-6">
              <span
                key={step}
                className="animate-[fade-slide_0.3s_ease-out] text-base font-semibold text-primary dark:text-indigo-400"
              >
                {messages[step]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Cycles every 1.4s with fade-slide</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Shimmer Effect</h2>
            <div className="relative h-36 overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent [background-size:200%_100%]" />
              <div className="relative flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white/30 bg-white/10" />
                  <span className="text-xs text-white/50">Content loading...</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Sweeping gradient highlight</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <h2 className="mb-4 font-medium">Pulsing Circle Ring</h2>
            <div className="flex items-center justify-center py-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-20 w-20 animate-[expand-ring_2s_ease-out_infinite] rounded-full border-[3px] border-teal-400" />
                <div className="absolute h-14 w-14 animate-[expand-ring_2s_ease-out_infinite_0.5s] rounded-full border-[3px] border-teal-500" />
                <div className="h-8 w-8 rounded-full bg-teal-500 shadow-lg shadow-teal-500/40" />
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground">Concentric rings expand outward</p>
          </div>
        </div>
      </ComponentPreview>

      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowOverlay(false)}
        >
          <div className="flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-white/25 border-t-white" />
            <p className="text-lg font-medium text-white">Loading...</p>
            <div className="flex gap-1.5">
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-white/70"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowOverlay(false)}
            className="absolute right-8 top-8 text-3xl text-white/60 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
