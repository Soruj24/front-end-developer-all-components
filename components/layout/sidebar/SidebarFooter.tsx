import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  BORDER,
  STATUS_DOT,
  INTERACTIVE,
  FOCUS,
  TEXT,
  COLOR,
} from "@/constants/tokens";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "border-t",
        BORDER.default,
        collapsed ? "flex flex-col items-center gap-2 px-2 py-3" : "flex items-center justify-between px-3 py-3",
      )}
    >
      {!collapsed && (
        <>
          <div className="flex items-center gap-3">
            <Link
              href="/account/settings"
              className={cn(INTERACTIVE.navLink, FOCUS.ring)}
              aria-label="Settings"
            >
              Settings
            </Link>

          </div>
          <span className={cn("flex items-center gap-1.5", TEXT.small, COLOR.muted)}>
            <span className={STATUS_DOT.wrapper}>
              <span className={STATUS_DOT.ping} />
              <span className={STATUS_DOT.dot} />
            </span>
            v2.0
          </span>
        </>
      )}

      {collapsed && (
        <>
          <Link
            href="/account/settings"
            className={cn(INTERACTIVE.iconButtonSm, FOCUS.ring)}
            title="Settings"
            aria-label="Settings"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          <span className={cn("font-medium", TEXT.tiny, COLOR.muted)}>v2.0</span>
        </>
      )}
    </div>
  );
}
