import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutLoadingSkeleton: RegistryEntry = entry({
    id: "layout-loading-skeleton",
    title: "Loading Skeleton",
    description: "Content area with loading placeholders.",
    source: `export default function LayoutLoadingSkeleton() {
  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
      <div className="flex h-7 items-center gap-2 border-b border-black/[.08] px-3 dark:border-white/[.145]">
        <div className="h-3 w-3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-2 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-2 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}`,
  });
