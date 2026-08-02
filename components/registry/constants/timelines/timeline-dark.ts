import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineDark: RegistryEntry = entry({
    id: "timeline-dark",
    title: "Dark Timeline",
    description: "Process steps on an always-dark surface.",
    source: `export default function TimelineDark() {
  return (
    <div className="relative rounded-lg bg-zinc-900 p-4 pl-8">
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-zinc-700" />
      {["Initialized", "Processed", "Completed"].map((item, i) => (
        <div key={item} className="relative mb-4 last:mb-0">
          <span className={\`absolute -left-5 mt-1 h-2 w-2 rounded-full \${i === 2 ? "bg-green-400 ring-2 ring-green-400/30" : i === 1 ? "bg-blue-400" : "bg-zinc-500"}\`} />
          <span className={\`text-xs \${i === 2 ? "font-medium text-green-400" : "text-zinc-300"}\`}>{item}</span>
          <span className="ml-2 text-[10px] text-zinc-500">{i + 1}s ago</span>
        </div>
      ))}
    </div>
  );
}`,
  });
