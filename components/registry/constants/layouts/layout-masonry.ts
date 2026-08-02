import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMasonry: RegistryEntry = entry({
    id: "layout-masonry",
    title: "Masonry Style",
    description: "Cards of varying heights in a grid.",
    source: `export default function LayoutMasonry() {
  return (
    <div className="flex h-48 w-full gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-zinc-50 p-3 dark:border-white/[.145] dark:bg-black">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex h-1/3 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Short</div>
        <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
      </div>
    </div>
  );
}`,
  });
