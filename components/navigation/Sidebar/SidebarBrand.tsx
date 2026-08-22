import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Brand mark at the top of the sidebar. */
export function SidebarBrand() {
  return (
    <div className="flex h-14 shrink-0 items-center border-b border-border px-3">
      <Link
        href="/"
        className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg p-1.5 transition-colors duration-150 hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:bg-muted"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-[11px] font-bold tracking-wide text-primary-foreground shadow-sm transition-transform duration-200 ease-out group-hover:scale-105">
          {siteConfig.shortName}
        </span>
        <span className="truncate text-[15px] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
