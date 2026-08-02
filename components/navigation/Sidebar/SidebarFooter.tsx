import { navigationLinkCount } from "@/constants/navigation";

/** Compact footer line inside the sidebar. */
export function SidebarFooter() {
  return (
    <div className="flex items-center justify-between border-t border-border px-2.5 pt-4 text-[11px] text-muted-foreground">
      <span>{navigationLinkCount} pages</span>
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
