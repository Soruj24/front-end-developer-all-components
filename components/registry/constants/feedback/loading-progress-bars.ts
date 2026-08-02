import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const loadingProgressBars: RegistryEntry = entry({
    id: "loading-progress-bars",
    title: "Progress Bars",
    description:
      "Indeterminate sweep, determinate slider, color variants, and animated striped bars.",
    source: `import { useState } from "react";

export default function LoadingProgressBars() {
  const [progress, setProgress] = useState(45);

  const bars = [
    { label: "Default", color: "bg-blue-500", w: "w-3/4" },
    { label: "Success", color: "bg-emerald-500", w: "w-full" },
    { label: "Warning", color: "bg-warning", w: "w-1/2" },
    { label: "Error", color: "bg-danger", w: "w-2/3" },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Indeterminate</h3>
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full w-1/2 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 [background-size:200%_100%]" />
        </div>
        <p className="mt-2 text-xs text-zinc-500">Animated gradient sweeps back and forth</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Determinate</h3>
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
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: \`\${progress}%\` }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-500">Drag slider to update progress</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Color Variants</h3>
        <div className="flex flex-col gap-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-16 text-xs font-medium text-zinc-600 dark:text-zinc-400">{bar.label}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className={\`h-full \${bar.color} \${bar.w} rounded-full\`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-4 font-medium">Striped Progress</h3>
        <div className="flex flex-col gap-3">
          <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="h-full w-3/4 animate-[progress-stripes_1s_linear_infinite] rounded-full bg-blue-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="h-full w-1/2 animate-[progress-stripes_0.8s_linear_infinite] rounded-full bg-emerald-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="h-full w-5/6 animate-[progress-stripes_1.2s_linear_infinite] rounded-full bg-rose-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#ffffff20_8px,#ffffff20_16px)] [background-size:40px_40px]" />
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">Diagonal stripes move right</p>
      </div>
    </div>
  );
}`,
  });
