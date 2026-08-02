import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutThreeColumn: RegistryEntry = entry({
    id: "layout-three-column",
    title: "Three Column & App Shell",
    description: "Sidebar, main content, and right panel arrangements.",
    source: `export default function LayoutThreeColumn() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-16 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
          {["⌂", "📊", "⚙"].map((icon, i) => (
            <button key={i} className={\`flex h-7 items-center justify-center rounded-md text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
        <div className="flex w-20 flex-col border-l border-black/[.08] bg-zinc-50 p-2 text-[10px] text-zinc-400 dark:border-white/[.145] dark:bg-black">
          <span className="font-medium text-zinc-600 dark:text-zinc-300">Details</span>
          <span className="mt-2">Info</span>
          <span>Activity</span>
        </div>
      </div>
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
          <span>App</span>
          <span className="font-normal text-zinc-400">🔔</span>
        </div>
        <div className="flex flex-1">
          <div className="flex w-12 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-1.5 dark:border-white/[.145] dark:bg-black">
            {["⌂", "📊", "📝", "⚙"].map((icon, i) => (
              <button key={i} className={\`flex h-6 items-center justify-center rounded text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
          <div className="flex w-16 flex-col border-l border-black/[.08] bg-zinc-50 p-2 text-[10px] text-zinc-400 dark:border-white/[.145] dark:bg-black">
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Chat</span>
            <div className="mt-1 rounded bg-zinc-200 p-1 text-[8px] dark:bg-zinc-700">Hey!</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
