import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutCenteredHero: RegistryEntry = entry({
    id: "layout-centered-hero",
    title: "Centered Hero",
    description: "Full-height hero copy centred in the viewport.",
    source: `export default function LayoutCenteredHero() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <h3 className="text-base font-semibold tracking-tight">Build faster</h3>
        <p className="max-w-xs text-xs text-muted-foreground">
          Compose production-ready layouts from a handful of primitives.
        </p>
        <span className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Get started
          </button>
          <button
            type="button"
            className="rounded-md border border-input px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Docs
          </button>
        </span>
      </div>
    </div>
  );
}`,
  });
