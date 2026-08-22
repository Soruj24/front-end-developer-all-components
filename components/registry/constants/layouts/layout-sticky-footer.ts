import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutStickyFooter: RegistryEntry = entry({
    id: "layout-sticky-footer",
    title: "Sticky Footer",
    description: "Scrolling body with an always-visible action footer.",
    source: `import { ArrowRightIcon } from "lucide-react";

export default function LayoutStickyFooter() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
        {["Draft saved", "Sync complete", "Deploy queued"].map((row) => (
          <div
            key={row}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 text-[11px] shadow-xs"
          >
            <ArrowRightIcon className="h-3 w-3 text-muted-foreground/60" aria-hidden="true" />
            {row}
          </div>
        ))}
      </div>
      <div className="flex h-9 shrink-0 w-full items-center justify-between border-t border-border bg-background px-3">
        <span className="text-[11px] text-muted-foreground">3 items</span>
        <button
          type="button"
          className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}`,
  });
