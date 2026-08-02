import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutKanban: RegistryEntry = entry({
    id: "layout-kanban",
    title: "Kanban Board",
    description: "Horizontal columns with task cards.",
    source: `export default function LayoutKanban() {
  return (
    <div className="flex h-48 w-full gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
      {["To Do", "In Progress", "Done"].map((col) => (
        <div key={col} className="flex flex-1 flex-col gap-1.5 rounded-md bg-white p-2 dark:bg-zinc-950">
          <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300">{col}</span>
          {[1, 2].map((card) => (
            <div key={card} className="rounded-md border border-black/[.08] p-1.5 text-[8px] text-zinc-400 dark:border-white/[.145]">
              Task {card}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}`,
  });
