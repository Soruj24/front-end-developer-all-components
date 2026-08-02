import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineExpandable: RegistryEntry = entry({
    id: "timeline-expandable",
    title: "Expandable Cards",
    description: "Click a phase card to reveal a longer description.",
    source: `import { useState } from "react";

export default function TimelineExpandable() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
      {[
        { title: "Discovery", detail: "User research and market analysis completed. Identified top 3 pain points and validated solution approach." },
        { title: "Development", detail: "Frontend and backend implementation across 8 sprints. 120+ features delivered." },
        { title: "Launch", detail: "Production deployment with zero downtime. Marketing campaign reached 50K impressions in first week." },
      ].map((item, i) => (
        <div key={i} className="relative mb-4 last:mb-0">
          <span className={\`absolute -left-5 mt-2 h-2.5 w-2.5 rounded-full border-2 \${expanded === i ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={\`w-full rounded-lg border border-black/[.08] p-3 text-left transition-shadow hover:shadow-sm dark:border-white/[.145] \${expanded === i ? "shadow-sm ring-1 ring-indigo-500/20" : ""}\`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{item.title}</span>
              <span className="text-[10px] text-zinc-400">{expanded === i ? "▾" : "▸"}</span>
            </div>
            {expanded === i && (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{item.detail}</p>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}`,
  });
