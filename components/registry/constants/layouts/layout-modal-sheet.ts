import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutModalSheet: RegistryEntry = entry({
    id: "layout-modal-sheet",
    title: "Modal & Bottom Sheet",
    description: "Centered modal and bottom panel overlays.",
    source: `export default function LayoutModalSheet() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900">Page Content</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex w-2/3 flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Modal Title</span>
              <span className="text-xs text-zinc-400">✕</span>
            </div>
            <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-2 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex gap-2 self-end">
              <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-5 w-12 rounded bg-foreground" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 border-t border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-zinc-950">
          <div className="mx-auto h-1 w-8 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <span className="text-xs font-medium">Bottom Sheet</span>
          <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}`,
  });
