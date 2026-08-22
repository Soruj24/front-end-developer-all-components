import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutModalSheet: RegistryEntry = entry({
    id: "layout-modal-sheet",
    title: "Modal Sheet",
    description: "Bottom sheet sliding over dimmed page content.",
    source: `import { XIcon } from "lucide-react";

export default function LayoutModalSheet() {
  return (
    <div className="relative flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div aria-hidden="true" className="absolute inset-0 bg-overlay" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share project"
        className="absolute inset-x-0 bottom-0 z-10 rounded-t-xl border-t border-border bg-background p-3 shadow-lg"
      >
        <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-border" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-tight">Share project</span>
          <button
            type="button"
            aria-label="Close sheet"
            className="rounded-md p-1 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        {["Copy link", "Invite by email"].map((action) => (
          <button
            key={action}
            type="button"
            className="block w-full rounded-md px-2 py-1.5 text-left text-[11px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}`,
  });
