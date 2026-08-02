import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSidebarMain: RegistryEntry = entry({
    id: "layout-sidebar-main",
    title: "Sidebar + Main & Left Nav",
    description: "Icon sidebar and text navigation variants beside content.",
    source: `export default function LayoutSidebarMain() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-16 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
          {["⌂", "📊", "⚙"].map((icon, i) => (
            <button key={i} className={\`flex h-7 items-center justify-center rounded-md text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
          ))}
          <button className="mt-auto flex h-7 items-center justify-center rounded-md text-xs text-zinc-400">👤</button>
        </div>
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main Content</div>
      </div>
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-20 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
          {["Dashboard", "Analytics", "Reports", "Settings"].map((item, i) => (
            <button key={i} className={\`rounded px-2 py-1 text-left text-[10px] \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-400"}\`}>{item}</button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
      </div>
    </div>
  );
}`,
  });
