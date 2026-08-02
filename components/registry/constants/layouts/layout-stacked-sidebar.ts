import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutStackedSidebar: RegistryEntry = entry({
    id: "layout-stacked-sidebar",
    title: "Stacked Header + Sidebar",
    description: "Top bars combined with icon sidebars and content.",
    source: `export default function LayoutStackedSidebar() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-8 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
          <span className="text-[10px] font-bold">Top Bar</span>
          <span className="text-[10px] text-zinc-400">🔔</span>
        </div>
        <div className="flex flex-1">
          <div className="flex w-14 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
            {["⌂", "📊", "⚙"].map((icon, i) => (
              <button key={i} className={\`flex h-7 items-center justify-center rounded-md text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
        </div>
      </div>
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
          <span>Header</span>
          <div className="flex gap-2 font-normal text-zinc-400">
            <span>🔍</span>
            <span>🔔</span>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex w-12 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-1.5 dark:border-white/[.145] dark:bg-black">
            {["⌂", "📊", "📝", "⚙"].map((icon, i) => (
              <button key={i} className={\`flex h-6 items-center justify-center rounded text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
        </div>
      </div>
    </div>
  );
}`,
  });
