import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineCompact: RegistryEntry = entry({
    id: "timeline-compact",
    title: "Compact, Inline Dots & Date Headers",
    description: "Tight single-line entries, an inline status strip, and grouped day lists.",
    source: `export default function TimelineCompact() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-700" />
        {["Committed", "Pushed", "Deployed", "Verified"].map((item, i) => (
          <div key={item} className="relative mb-3 last:mb-0">
            <span className={\`absolute -left-[7px] mt-1 h-1.5 w-1.5 rounded-full \${i < 3 ? "bg-zinc-400" : "bg-success-soft0"}\`} />
            <span className="text-[10px] text-zinc-500">{item}</span>
            <span className="ml-2 text-[10px] text-zinc-400">{i + 1}m ago</span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          {["Draft", "Review", "Approved", "Live"].map((item, i) => (
            <div key={item} className="flex items-center gap-1">
              <span className={\`h-2 w-2 rounded-full \${i < 3 ? i === 2 ? "bg-success-soft0" : "bg-blue-400" : "bg-zinc-300 dark:bg-zinc-600"}\`} />
              <span className={\`text-[10px] \${i === 2 ? "font-medium text-success" : "text-zinc-500"}\`}>{item}</span>
              {i < 3 && <span className="text-[10px] text-zinc-300">—</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { date: "Today", items: ["Morning standup", "Code review", "Deploy v2.1"] },
          { date: "Yesterday", items: ["Sprint planning", "API design"] },
        ].map((day) => (
          <div key={day.date} className="relative mb-4 last:mb-0">
            <span className="absolute -left-5 mt-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black" />
            <span className="text-xs font-semibold text-zinc-500">{day.date}</span>
            {day.items.map((item) => (
              <div key={item} className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
