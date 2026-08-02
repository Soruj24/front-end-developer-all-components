import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutHolyGrail: RegistryEntry = entry({
    id: "layout-holy-grail",
    title: "Holy Grail",
    description: "Header, footer, sidebar, and main in the classic layout.",
    source: `export default function LayoutHolyGrail() {
  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
        <span>Header</span>
        <span className="text-zinc-400">Nav</span>
      </div>
      <div className="flex flex-1">
        <div className="flex w-12 items-center justify-center border-r border-black/[.08] bg-zinc-50 text-[10px] text-zinc-400 dark:border-white/[.145] dark:bg-black">SB</div>
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
      </div>
      <div className="flex h-6 items-center justify-center border-t border-black/[.08] bg-zinc-100 text-[10px] text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">Footer</div>
    </div>
  );
}`,
  });
