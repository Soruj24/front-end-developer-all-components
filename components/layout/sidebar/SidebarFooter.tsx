import Link from "next/link";
import { cn } from "@/lib/cn";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-border/60",
        collapsed ? "flex flex-col items-center gap-2 px-2 py-3" : "flex items-center justify-between px-3 py-3",
      )}
    >
      {!collapsed && (
        <>
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Settings"
            >
              Settings
            </Link>
            <Link
              href="/help"
              className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Help"
            >
              Help
            </Link>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            v2.0
          </span>
        </>
      )}

      {collapsed && (
        <>
          <Link href="/settings" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Settings" aria-label="Settings">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          <span className="text-[9px] font-medium text-muted-foreground">v2.0</span>
        </>
      )}
    </div>
  );
}
