import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineColorCoded: RegistryEntry = entry({
    id: "timeline-color-coded",
    title: "Color Coded, Gradient & Dashed Lines",
    description: "Per-topic colors, a rainbow gradient rail, and a dashed connector.",
    source: `export default function TimelineColorCoded() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Design review", color: "bg-blue-500" },
          { label: "Frontend build", color: "bg-purple-500" },
          { label: "Backend API", color: "bg-emerald-500" },
          { label: "QA Testing", color: "bg-warning" },
        ].map((item, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <span className={\`absolute -left-5 mt-1 h-3 w-3 rounded-full \${item.color} ring-2 ring-white dark:ring-black\`} />
            <div className="flex items-center gap-2">
              <span className={\`h-2 w-2 rounded-full \${item.color}\`} />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
        {["Ideation", "Prototype", "MVP", "Launch"].map((item, i) => (
          <div key={item} className="relative mb-6 last:mb-0">
            <span className={\`absolute -left-5 mt-1 h-3 w-3 rounded-full \${i === 3 ? "bg-pink-500 ring-2 ring-pink-200" : "bg-white border-2 border-zinc-300 dark:border-zinc-600"}\`} />
            <span className="text-xs font-medium">{item}</span>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 border-l-2 border-dashed border-zinc-300 dark:border-zinc-600" />
        {["Draft", "Review", "Final", "Published"].map((item, i) => (
          <div key={item} className="relative mb-5 last:mb-0">
            <span className={\`absolute -left-[9px] mt-1 h-3 w-3 rounded-full border-2 \${i === 3 ? "border-success bg-green-100 dark:bg-green-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />
            <span className="text-xs font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
