import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  BORDER,
  BG,
  RADIUS,
  TRANSITION,
  INTERACTIVE,
  FOCUS,
  TEXT,
} from "@/constants/tokens";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center border-b",
        BORDER.default,
        collapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-3",
      )}
    >
      {!collapsed && (
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center font-bold text-background",
              RADIUS.lg,
              BG.primary,
              TEXT.small,
              `${TRANSITION.transform} group-hover:scale-105`,
            )}
          >
            {siteConfig.shortName}
          </span>
          <span className={cn("font-semibold tracking-tight text-foreground", TEXT.brand)}>
            {siteConfig.name}
          </span>
        </Link>
      )}

      {collapsed && (
        <Link
          href="/"
          className={cn(
            "group flex h-7 w-7 items-center justify-center font-bold text-background",
            RADIUS.lg,
            BG.primary,
            TEXT.small,
            `${TRANSITION.transform} group-hover:scale-105`,
          )}
          aria-label="Home"
        >
          {siteConfig.shortName}
        </Link>
      )}

      <button
        type="button"
        onClick={onToggleCollapse}
        className={cn(
          collapsed ? INTERACTIVE.iconButtonSm : INTERACTIVE.iconButton,
          FOCUS.ring,
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
            <path d="m9 18 6-6-6-6" />
          ) : (
            <path d="m15 18-6-6 6-6" />
          )}
        </svg>
      </button>
    </div>
  );
}
