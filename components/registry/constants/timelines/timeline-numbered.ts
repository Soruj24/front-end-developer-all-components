import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineNumbered: RegistryEntry = entry({
    id: "timeline-numbered",
    title: "Numbered Steps & Connected Steppers",
    description: "Vertical numbered steps plus vertical and horizontal connected circles.",
    source: `export default function TimelineNumbered() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {["Register", "Verify", "Setup", "Done"].map((item, i) => (
          <div key={item} className="relative mb-6 last:mb-0">
            <span className={\`absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold \${i < 3 ? "bg-zinc-200 text-zinc-500 dark:bg-zinc-700" : "bg-success-soft0 text-white"}\`}>{i + 1}</span>
            <span className="text-xs font-medium">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {["Step 1", "Step 2", "Step 3"].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className={\`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold \${i === 2 ? "bg-success-soft0 text-white" : i === 0 ? "bg-foreground text-background" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>
              {i === 2 ? "✓" : i + 1}
            </span>
            <span className="mt-1 text-xs font-medium">{item}</span>
            {i < 2 && <div className="my-1 h-6 w-0.5 bg-zinc-200 dark:bg-zinc-700" />}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-0 sm:col-span-2">
        {["Plan", "Build", "Ship", "Scale"].map((item, i) => (
          <div key={item} className="flex items-center">
            <div className="flex flex-col items-center">
              <span className={\`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold \${i < 2 ? "bg-foreground text-background" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>
                {i < 2 ? "✓" : i + 1}
              </span>
              <span className="mt-1 text-[10px] font-medium">{item}</span>
            </div>
            {i < 3 && <div className={\`h-0.5 w-8 \${i < 1 ? "bg-foreground" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
