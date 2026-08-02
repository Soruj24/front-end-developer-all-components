import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const loadingAnimations: RegistryEntry = entry({
    id: "loading-animations",
    title: "Loading Animations",
    description:
      "Typing dots, morphing loading text, shimmer sweep, and pulsing ring effects.",
    source: `import { useEffect, useState } from "react";

export default function LoadingAnimations() {
  const [step, setStep] = useState(0);
  const messages = ["Loading...", "Fetching...", "Almost there...", "Processing..."];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 1400);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Typing Dots</h3>
        <div className="flex items-center gap-1.5 py-6">
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-indigo-500"
              style={{ animation: \`typing-dot 1.4s \${delay}s infinite ease-in-out both\` }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-500">3 dots with staggered scale/opacity</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Loading Text Morphing</h3>
        <div className="relative flex h-10 items-center py-6">
          <span
            key={step}
            className="animate-[fade-slide_0.3s_ease-out] text-base font-semibold text-primary dark:text-indigo-400"
          >
            {messages[step]}
          </span>
        </div>
        <p className="text-xs text-zinc-500">Cycles every 1.4s with fade-slide</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Shimmer Effect</h3>
        <div className="relative h-36 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-700">
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent [background-size:200%_100%]" />
          <div className="relative flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white/30 bg-white/10" />
              <span className="text-xs text-white/50">Content loading...</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">Sweeping gradient highlight</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Pulsing Circle Ring</h3>
        <div className="flex items-center justify-center py-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-20 w-20 animate-[expand-ring_2s_ease-out_infinite] rounded-full border-[3px] border-teal-400" />
            <div className="absolute h-14 w-14 animate-[expand-ring_2s_ease-out_infinite_0.5s] rounded-full border-[3px] border-teal-500" />
            <div className="h-8 w-8 rounded-full bg-teal-500 shadow-lg shadow-teal-500/40" />
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500">Concentric rings expand outward</p>
      </div>
    </div>
  );
}`,
  });
