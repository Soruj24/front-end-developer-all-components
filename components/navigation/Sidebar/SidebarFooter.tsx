import { navigationLinkCount } from "@/constants/navigation";

/** Compact footer line inside the sidebar. */
export function SidebarFooter() {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-border/60 px-4 py-3 text-[11px] font-medium text-muted-foreground">
      <span className="rounded-md bg-muted/50 px-1.5 py-0.5 tabular-nums ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
        {navigationLinkCount} pages
      </span>
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        Next.js 16
      </span>
    </div>
  );
}
