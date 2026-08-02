import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutCenteredHero: RegistryEntry = entry({
    id: "layout-centered-hero",
    title: "Centered Content & Full-Width Hero",
    description: "Max-width containers and edge-to-edge hero sections.",
    source: `export default function LayoutCenteredHero() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-8 items-center justify-center border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
          <span className="text-[10px] font-bold">Centered Layout</span>
        </div>
        <div className="flex flex-1 items-start justify-center bg-zinc-50 p-4 dark:bg-zinc-900">
          <div className="h-full w-full max-w-[70%] rounded-md border border-dashed border-zinc-300 bg-white p-3 dark:border-zinc-600 dark:bg-zinc-950">
            <div className="h-2 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-2 h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-16 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <div className="text-center">
            <div className="text-xs font-bold">Hero Section</div>
            <div className="mt-1 text-[10px] text-white/70">Full-width background</div>
          </div>
        </div>
        <div className="flex flex-1 items-start justify-center bg-white p-3 dark:bg-zinc-950">
          <div className="h-full w-full max-w-[80%]">
            <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-2 h-2 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
