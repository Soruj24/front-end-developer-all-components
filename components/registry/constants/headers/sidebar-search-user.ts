import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarSearchUser: RegistryEntry = entry({
    id: "sidebar-search-user",
    title: "Search & User",
    description: "A sidebar with a search box and profile footer.",
    source: `export default function SidebarSearchUser() {
  return (
    <div className="flex h-64 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex w-40 flex-col border-r border-black/[.08] bg-zinc-50 dark:border-white/[.145] dark:bg-black">
        <div className="border-b border-black/[.08] p-2 dark:border-white/[.145]">
          <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[10px] text-zinc-400 dark:bg-zinc-900">
            <span>⌕</span>
            <span>Search...</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-0.5 p-2">
          {["Dashboard", "Analytics", "Settings"].map((item, i) => (
            <button key={item} className={\`rounded-md px-2 py-1.5 text-left text-xs \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-500 hover:bg-black/[.04]"}\`}>{item}</button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-black/[.08] p-2 dark:border-white/[.145]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">👤</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-medium">Alex Rivera</p>
            <p className="truncate text-[8px] text-zinc-400">alex@example.com</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">
        Content
      </div>
    </div>
  );
}`,
  });
