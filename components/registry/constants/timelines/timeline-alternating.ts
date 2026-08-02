import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineAlternating: RegistryEntry = entry({
    id: "timeline-alternating",
    title: "Alternating Sides & Horizontal Scroll",
    description: "Events that alternate around a center line, plus a scrollable sprint stepper.",
    source: `export default function TimelineAlternating() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-px bg-zinc-200 dark:bg-zinc-700" />
      {["Q1 Planning", "Design Sprint", "Dev Cycle", "Testing"].map((item, i) => (
        <div key={item} className={\`relative mb-6 w-[45%] \${i % 2 === 0 ? "mr-auto text-right" : "ml-auto text-left"}\`}>
          <span className={\`absolute top-1 h-3 w-3 rounded-full border-2 \${i % 2 === 0 ? "-right-1.5" : "-left-1.5"} \${i === 2 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
          <span className="text-xs font-medium">{item}</span>
          <p className="text-[10px] text-zinc-400">Details here</p>
        </div>
      ))}
      <div className="mt-10 overflow-x-auto pb-2">
        <div className="flex gap-8" style={{ minWidth: "400px" }}>
          {["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"].map((s, i) => (
            <div key={s} className="flex w-24 shrink-0 flex-col items-center">
              <span className={\`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold \${i === 2 ? "bg-foreground text-background" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>{i + 1}</span>
              {i < 3 && <div className="mt-3 h-0.5 w-full bg-zinc-200 dark:bg-zinc-700" style={{ marginTop: "-2px", marginLeft: "50%", width: "calc(100% + 2rem)" }} />}
              <span className="mt-2 text-xs font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
