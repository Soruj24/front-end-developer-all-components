import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS, TEXT } from "@/constants/tokens";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        collapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2.5",
      )}
    >
      {!collapsed ? (
        <>
          <Link
            href="/account/settings"
            className={cn(
              "rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              TEXT.small,
              FOCUS.ring,
            )}
          >
            Settings
          </Link>
          <span className={cn("flex items-center gap-1.5 text-muted-foreground", TEXT.tiny)}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
            v2.0
          </span>
        </>
      ) : (
        <span className={cn("text-muted-foreground", TEXT.tiny)}>v2.0</span>
      )}
    </div>
  );
}
