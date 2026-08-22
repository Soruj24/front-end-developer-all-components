import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMinimalBlog: RegistryEntry = entry({
    id: "layout-minimal-blog",
    title: "Minimal Blog",
    description: "Editorial reading layout: centred column with meta row.",
    source: `import { BookmarkIcon, MessageSquareIcon } from "lucide-react";

export default function LayoutMinimalBlog() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="mx-auto flex w-full max-w-72 flex-col gap-2 p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
          Engineering
        </span>
        <h3 className="text-sm font-semibold tracking-tight">
          Designing resilient layouts
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Grids, flexbox and container queries working as one system.
        </p>
        <span className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground/70">
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="h-3 w-3" aria-hidden="true" /> 12
          </span>
          <span className="flex items-center gap-1">
            <BookmarkIcon className="h-3 w-3" aria-hidden="true" /> Save
          </span>
        </span>
      </div>
    </div>
  );
}`,
  });
