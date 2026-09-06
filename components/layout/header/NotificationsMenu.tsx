"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS, RADIUS, TEXT, Z } from "@/constants/tokens";

const PREVIEW = [
  {
    title: "Weekly digest ready",
    body: "New components and templates this week.",
    time: "2h",
    unread: true,
  },
  {
    title: "Security reminder",
    body: "Review your active sessions.",
    time: "1d",
    unread: true,
  },
  {
    title: "Changelog published",
    body: "See what shipped in v2.0.",
    time: "3d",
    unread: false,
  },
];

export function NotificationsMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const unread = PREVIEW.filter((item) => item.unread).length;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-8 sm:w-8",
          FOCUS.ring,
        )}
      >
        <svg
          className="h-[18px] w-[18px] sm:h-4 sm:w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0" />
        </svg>
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background sm:right-1.5 sm:top-1.5"
          />
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Notifications"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-[320px] max-w-[85vw] overflow-hidden rounded-lg border border-border/60 bg-popover shadow-popover",
            Z.chrome,
          )}
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <Link
              href="/account/notifications"
              onClick={() => setOpen(false)}
              className={cn("rounded text-muted-foreground transition-colors hover:text-foreground", TEXT.small, FOCUS.ring)}
            >
              View all
            </Link>
          </div>
          <ul className="max-h-[320px] overflow-y-auto p-1.5">
            {PREVIEW.map((item) => (
              <li key={item.title}>
                <Link
                  href="/account/notifications"
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className={cn(
                    "flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted",
                    RADIUS.sm,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      item.unread ? "bg-primary" : "bg-border",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.body}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      {item.time} ago
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
