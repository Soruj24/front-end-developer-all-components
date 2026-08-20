import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className={cn("flex items-center border-b border-border/60", collapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-3")}>
      {!collapsed && (
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-[11px] font-bold text-background transition-transform group-hover:scale-105">
            {siteConfig.shortName}
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>
      )}

      {collapsed && (
        <Link href="/" className="group flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-[11px] font-bold text-background transition-transform group-hover:scale-105" aria-label="Home">
          {siteConfig.shortName}
        </Link>
      )}

      <button
        type="button"
        onClick={onToggleCollapse}
        className={cn(
          "flex items-center justify-center rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          collapsed ? "h-7 w-7" : "h-6 w-6",
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {collapsed ? (
            <>
              <path d="m9 18 6-6-6-6" />
            </>
          ) : (
            <>
              <path d="m15 18-6-6 6-6" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
