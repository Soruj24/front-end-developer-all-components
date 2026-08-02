import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineCards: RegistryEntry = entry({
    id: "timeline-cards",
    title: "Card, Bordered, Milestone & Grid",
    description: "Content cards, accent-bordered cards, milestone flags, and a mini day grid.",
    source: `export default function TimelineCards() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { title: "Research", desc: "Market analysis complete", date: "Week 1" },
          { title: "Design", desc: "Wireframes approved", date: "Week 2" },
          { title: "Develop", desc: "Core features built", date: "Week 3-4" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-5 mt-3 h-2.5 w-2.5 rounded-full border-2 \${i === 1 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
            <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{item.title}</span>
                <span className="text-[10px] text-zinc-400">{item.date}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { title: "Discovered", desc: "Identified the problem", color: "border-l-blue-500" },
          { title: "Prototyped", desc: "Built initial solution", color: "border-l-purple-500" },
          { title: "Tested", desc: "Validated with users", color: "border-l-emerald-500" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className="absolute -left-5 mt-3 h-2.5 w-2.5 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black" />
            <div className={\`rounded-lg border border-l-4 \${item.color} border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-black\`}>
              <div className="text-xs font-medium">{item.title}</div>
              <div className="text-[10px] text-zinc-400">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "MVP Launch", date: "Q1 2026" },
          { label: "10K Users", date: "Q2 2026" },
          { label: "Profitability", date: "Q3 2026" },
        ].map((item, i) => (
          <div key={i} className="relative mb-6 last:mb-0">
            <span className={\`absolute -left-5 mt-1 flex h-3 w-3 items-center justify-center rounded-full \${i === 2 ? "bg-amber-400" : "border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`}>
              {i === 2 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            <div className="inline-block rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-1.5 dark:border-white/[.145] dark:bg-zinc-900">
              <div className="text-xs font-medium">{item.label}</div>
              <div className="text-[10px] text-zinc-400">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="grid grid-cols-3 gap-2">
          {[
            { day: "Mon", event: "Kickoff" },
            { day: "Wed", event: "Review" },
            { day: "Fri", event: "Ship" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center rounded-lg border border-black/[.08] p-2 dark:border-white/[.145]">
              <span className="text-[10px] font-medium text-zinc-400">{item.day}</span>
              <span className={\`mt-1 h-2 w-2 rounded-full \${i === 1 ? "bg-amber-400" : i === 2 ? "bg-success-soft0" : "bg-blue-500"}\`} />
              <span className="mt-1 text-xs font-medium">{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
