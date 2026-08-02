import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineHistory: RegistryEntry = entry({
    id: "timeline-history",
    title: "Company History, Yearly Overview & Roadmap",
    description: "Milestone years, per-year event lists, and a quarterly roadmap.",
    source: `export default function TimelineHistory() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { year: "2020", event: "Founded" },
          { year: "2021", event: "Seed round" },
          { year: "2022", event: "100K users" },
          { year: "2023", event: "Series A" },
          { year: "2024", event: "IPO" },
        ].map((item, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <span className={\`absolute -left-5 mt-1 h-3 w-3 rounded-full border-2 \${i === 4 ? "border-amber-500 bg-amber-100 dark:bg-amber-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
            <span className="text-xs font-bold text-primary dark:text-indigo-400">{item.year}</span>
            <span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">{item.event}</span>
          </div>
        ))}
      </div>
      <div className="relative pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { year: "2024", events: ["Company founded", "Seed funding"] },
          { year: "2025", events: ["Product launch", "100 customers"] },
          { year: "2026", events: ["Series A", "Global expansion"] },
        ].map((item) => (
          <div key={item.year} className="relative mb-5 last:mb-0">
            <span className="absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background">{item.year[2]}{item.year[3]}</span>
            <span className="text-xs font-bold text-primary dark:text-indigo-400">{item.year}</span>
            {item.events.map((ev) => (
              <div key={ev} className="text-xs text-zinc-600 dark:text-zinc-400">{ev}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 sm:col-span-2">
        {[
          { phase: "Q1", items: ["Research", "Planning"], color: "bg-blue-400" },
          { phase: "Q2", items: ["Design", "Prototype"], color: "bg-purple-400" },
          { phase: "Q3", items: ["Development", "Testing"], color: "bg-amber-400" },
          { phase: "Q4", items: ["Launch", "Marketing"], color: "bg-emerald-400" },
        ].map((q) => (
          <div key={q.phase} className="flex items-center gap-3">
            <span className="w-6 text-xs font-bold text-zinc-500">{q.phase}</span>
            <div className="flex flex-1 gap-1">
              {q.items.map((item) => (
                <span key={item} className={\`rounded \${q.color} px-2 py-0.5 text-[10px] font-medium text-white\`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
