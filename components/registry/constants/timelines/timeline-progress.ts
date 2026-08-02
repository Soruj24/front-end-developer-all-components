import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineProgress: RegistryEntry = entry({
    id: "timeline-progress",
    title: "With Progress Bar & Loading Skeleton",
    description: "Percent-complete rows and a pulsing skeleton placeholder.",
    source: `export default function TimelineProgress() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Research", pct: "100%" },
          { label: "Design", pct: "100%" },
          { label: "Development", pct: "65%" },
          { label: "Testing", pct: "20%" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-5 mt-2 h-2.5 w-2.5 rounded-full \${item.pct === "100%" ? "bg-success-soft0" : "bg-amber-400"}\`} />
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium w-24">{item.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={\`h-full rounded-full \${item.pct === "100%" ? "bg-success-soft0" : "bg-amber-400"}\`} style={{ width: item.pct }} />
              </div>
              <span className="text-[10px] text-zinc-400">{item.pct}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <div className="absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            <div className="mt-1 h-2 w-32 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
