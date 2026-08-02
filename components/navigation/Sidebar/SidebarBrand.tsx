import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Brand mark at the top of the sidebar. */
export function SidebarBrand() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 px-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-[11px] font-bold text-accent-foreground shadow-sm transition-transform group-hover:scale-105">
        {siteConfig.shortName}
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}
