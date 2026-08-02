import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineFull: RegistryEntry = entry({
    id: "timeline-full",
    title: "Full Page Layout & Sprint Timeline",
    description: "A calendar-style month view and a task sprint board.",
    source: `export default function TimelineFull() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-24 shrink-0 flex-col border-r border-black/[.08] bg-zinc-50 p-3 dark:border-white/[.145] dark:bg-black">
          <span className="mb-2 text-xs font-bold">2026</span>
          {["Jan", "Feb", "Mar", "Apr"].map((m, i) => (
            <button key={m} className={\`rounded px-2 py-1 text-left text-[10px] \${i === 2 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-400"}\`}>{m}</button>
          ))}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <span className="text-xs font-bold">March 2026</span>
          <div className="mt-2 flex flex-col gap-2">
            {[
              { day: "Mar 10", event: "Design review" },
              { day: "Mar 15", event: "Client meeting" },
              { day: "Mar 22", event: "Sprint demo" },
            ].map((item) => (
              <div key={item.day} className="flex items-center gap-2 rounded-md bg-zinc-50 px-2 py-1.5 dark:bg-zinc-900">
                <span className="text-[10px] font-medium text-primary dark:text-indigo-400">{item.day}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { task: "Setup CI/CD", assignee: "Alex", days: "Mon-Wed", done: true },
          { task: "API Integration", assignee: "Bob", days: "Tue-Thu", done: true },
          { task: "UI Components", assignee: "Carol", days: "Wed-Fri", done: false, active: true },
          { task: "Testing", assignee: "Dave", days: "Fri-Sun", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-black/[.08] px-3 py-2 dark:border-white/[.145]">
            <span className={\`h-2 w-2 rounded-full \${item.done ? "bg-success-soft0" : item.active ? "bg-blue-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600"}\`} />
            <span className={\`flex-1 text-xs \${item.done ? "text-zinc-400 line-through" : "font-medium"}\`}>{item.task}</span>
            <span className="text-[10px] text-zinc-400">{item.assignee}</span>
            <span className="text-[10px] text-zinc-400">{item.days}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
