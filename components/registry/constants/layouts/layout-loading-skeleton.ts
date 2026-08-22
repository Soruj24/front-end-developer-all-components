import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutLoadingSkeleton: RegistryEntry = entry({
    id: "layout-loading-skeleton",
    title: "Loading Skeleton",
    description: "Skeleton placeholders mirroring a list layout.",
    source: `import { RefreshCwIcon } from "lucide-react";

export default function LayoutLoadingSkeleton() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-full max-w-72 flex-col gap-2.5 p-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2.5">
            <span className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-muted" />
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="h-2 w-1/3 animate-pulse rounded-full bg-muted" />
              <span className="h-2 w-2/3 animate-pulse rounded-full bg-muted/70" />
            </span>
            <span className="h-2 w-8 animate-pulse rounded-full bg-muted/50" />
          </div>
        ))}
        <span className="sr-only" role="status">Loading…</span>
        <span className="mx-auto mt-1 flex items-center gap-1 text-[10px] text-muted-foreground/60">
          <RefreshCwIcon className="h-3 w-3 animate-spin" aria-hidden="true" /> Fetching latest…
        </span>
      </div>
    </div>
  );
}`,
  });
