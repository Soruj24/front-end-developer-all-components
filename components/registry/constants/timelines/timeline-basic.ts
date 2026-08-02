import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineBasic: RegistryEntry = entry({
    id: "timeline-basic",
    title: "Basic Vertical & With Icons",
    description: "Simple vertical lists with plain dots or emoji icon markers.",
    source: `export default function TimelineBasic() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="flex flex-col items-center gap-6">
        <div className="relative pl-8">
          <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
          {["Jan", "Feb", "Mar"].map((m, i) => (
            <div key={m} className="relative mb-6 last:mb-0">
              <span className={\`absolute -left-5 mt-1 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 \${i === 1 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
              <div className="text-xs font-medium">{m} 2026</div>
              <div className="mt-0.5 text-xs text-zinc-500">Event {i + 1} description</div>
            </div>
          ))}
        </div>
        <div className="relative pl-10">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
          {[
            { icon: "⌂", label: "Homepage launched", time: "Jan 15" },
            { icon: "📊", label: "Analytics added", time: "Feb 20" },
            { icon: "✉", label: "Email system live", time: "Mar 10" },
            { icon: "⚙", label: "Settings panel", time: "Apr 5" },
          ].map((e, i) => (
            <div key={i} className="relative mb-5 last:mb-0">
              <span className={\`absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full text-[10px] \${i === 0 ? "bg-indigo-100 text-primary dark:bg-indigo-900 dark:text-indigo-400" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"}\`}>{e.icon}</span>
              <div className="text-xs font-medium">{e.label}</div>
              <div className="text-[10px] text-zinc-400">{e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
