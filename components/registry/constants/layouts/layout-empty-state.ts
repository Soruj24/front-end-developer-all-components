import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutEmptyState: RegistryEntry = entry({
    id: "layout-empty-state",
    title: "Empty State Layout",
    description: "Content area showing an empty state.",
    source: `export default function LayoutEmptyState() {
  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
        <span className="text-[10px] font-bold">Inbox</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-900">
        <span className="text-lg text-zinc-300">📭</span>
        <span className="text-xs text-zinc-400">No messages yet</span>
        <span className="text-[10px] text-zinc-300">Get started by sending your first message</span>
      </div>
    </div>
  );
}`,
  });
