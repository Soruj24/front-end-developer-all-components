import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const loadingSpinnerVariants: RegistryEntry = entry({
    id: "loading-spinner-variants",
    title: "Spinner Variants",
    description:
      "Small, medium, large, dual-ring, bouncing dots, spinning square, and pulse ring spinners.",
    source: `export default function LoadingSpinnerVariants() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Small</span>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-500" />
        <span className="text-[10px] text-zinc-400">h-5 w-5</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Medium</span>
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-200 border-t-purple-500" />
        <span className="text-[10px] text-zinc-400">h-8 w-8</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Large</span>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-pink-500" />
        <span className="text-[10px] text-zinc-400">h-12 w-12</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Dual Ring</span>
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-400" />
          <div className="absolute h-7 w-7 animate-[spin_0.8s_linear_infinite_reverse] rounded-full border-[3px] border-transparent border-b-violet-500 border-l-violet-500" />
        </div>
        <span className="text-[10px] text-zinc-400">counter-rotating</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Bouncing Dots</span>
        <div className="flex gap-2">
          {[0, 0.15, 0.3].map((delay, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-bounce rounded-full bg-warning"
              style={{ animationDelay: \`\${delay}s\` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-zinc-400">staggered 150ms</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Spinning Square</span>
        <div className="h-10 w-10 animate-[spin_1.5s_linear_infinite] rounded-md border-2 border-emerald-500 border-t-transparent bg-emerald-500/10" />
        <span className="text-[10px] text-zinc-400">rounded-md</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Pulse Ring</span>
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-[pulse-ring_1.5s_ease-out_infinite] rounded-full border-2 border-rose-400" />
          <div className="absolute h-8 w-8 animate-[pulse-ring_1.5s_ease-out_infinite_0.5s] rounded-full border-2 border-rose-500" />
          <div className="h-4 w-4 rounded-full bg-rose-500" />
        </div>
        <span className="text-[10px] text-zinc-400">2 rings + dot</span>
      </div>
    </div>
  );
}`,
  });
