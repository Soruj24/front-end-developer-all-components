import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutCardGrid: RegistryEntry = entry({
    id: "layout-card-grid",
    title: "Card Grid & Dashboard Widgets",
    description: "Responsive card grids and metric widget rows.",
    source: `export default function LayoutCardGrid() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full flex-col gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-zinc-950">
        <div className="grid h-full grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-center rounded-md border border-black/[.08] bg-zinc-50 text-[10px] text-zinc-300 dark:border-white/[.145] dark:bg-black">Card {i}</div>
          ))}
        </div>
      </div>
      <div className="flex h-48 w-full flex-col gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-zinc-50 p-3 dark:border-white/[.145] dark:bg-black">
        <div className="flex gap-2">
          {["Revenue", "Users", "Orders"].map((label) => (
            <div key={label} className="flex flex-1 flex-col gap-1 rounded-md bg-white p-2 dark:bg-zinc-950">
              <span className="text-[8px] text-zinc-400">{label}</span>
              <span className="text-xs font-bold">$—</span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Chart Area</div>
      </div>
    </div>
  );
}`,
  });
