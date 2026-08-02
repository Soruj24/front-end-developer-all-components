import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSplit: RegistryEntry = entry({
    id: "layout-split",
    title: "Two-Column Split & Split Screen",
    description: "Fifty-fifty panels for content and media.",
    source: `export default function LayoutSplit() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-1/2 items-center justify-center border-r border-black/[.08] bg-blue-50 text-[10px] text-blue-400 dark:border-white/[.145] dark:bg-blue-950">Content</div>
        <div className="flex w-1/2 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Sidebar</div>
      </div>
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] text-white/70">Image</div>
        <div className="flex w-1/2 flex-col justify-center gap-2 bg-white p-4 dark:bg-zinc-950">
          <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="mt-2 h-5 w-1/3 rounded bg-foreground" />
        </div>
      </div>
    </div>
  );
}`,
  });
