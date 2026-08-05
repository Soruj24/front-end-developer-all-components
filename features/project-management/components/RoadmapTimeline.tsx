import { roadmapPhases } from "../constants/pm-data";
import { SectionCard } from "./SectionCard";

export function RoadmapTimeline() {
  return (
    <SectionCard title="Product Roadmap" icon="🗺️">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roadmapPhases.map((phase) => (
          <div key={phase.id} className={`rounded-lg border p-4 ${phase.status === "current" ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20" : "border-zinc-200 dark:border-zinc-800"}`}>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{phase.phase}</h3>
              {phase.status === "current" && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Current</span>}
            </div>
            <ul className="mt-3 space-y-2">
              {phase.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
