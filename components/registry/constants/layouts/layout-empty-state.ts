import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutEmptyState: RegistryEntry = entry({
    id: "layout-empty-state",
    title: "Empty State",
    description: "Friendly empty state with a primary call to action.",
    source: `import { InboxIcon } from "lucide-react";

export default function LayoutEmptyState() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <InboxIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <h3 className="text-xs font-semibold tracking-tight">No messages yet</h3>
        <p className="max-w-52 text-[11px] leading-relaxed text-muted-foreground">
          When teammates mention you, it will show up here.
        </p>
        <button
          type="button"
          className="mt-1 rounded-md border border-input px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Invite teammates
        </button>
      </div>
    </div>
  );
}`,
  });
