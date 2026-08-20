"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  LAYOUT,
  BORDER,
  BG,
  Z,
  RADIUS,
  TRANSITION,
  BACKDROP,
  INTERACTIVE,
  FOCUS,
  TEXT,
  COLOR,
} from "@/constants/tokens";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  role?: "user" | "admin";
  userName?: string;
  className?: string;
}

const NAV_ITEMS = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

const USER_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "My Components", href: "/components" },
  { label: "Favorites", href: "/favorites" },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

export function MobileNavigation({
  isOpen,
  onClose,
  role = "user",
  userName = "User",
  className,
}: MobileNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0",
          Z.modal,
          BG.overlay,
          BACKDROP.light,
          TRANSITION.opacity,
          "lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "fixed right-0 top-0 h-full w-72 max-w-[85vw]",
          Z.chrome,
          BORDER.default,
          BG.base,
          TRANSITION.slide,
          "lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4",
            LAYOUT.headerHeight,
            BORDER.default,
          )}
        >
          <span className={cn("font-semibold text-foreground", TEXT.brand)}>
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className={cn(INTERACTIVE.iconButton, FOCUS.ring)}
            aria-label="Close menu"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-3 py-4">
          <div className="mb-4">
            <p className={cn("mb-2 px-2 font-medium", TEXT.small, COLOR.muted)}>
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center px-2.5 py-2",
                  RADIUS.sm,
                  "text-muted-foreground",
                  BG.mutedSoft,
                  "hover:text-foreground",
                  TRANSITION.colors,
                  TEXT.body,
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={cn("border-t pt-4", BORDER.default)}>
            <p className={cn("mb-2 px-2 font-medium", TEXT.small, COLOR.muted)}>
              Account
            </p>
            <div className={cn("mb-2 flex items-center gap-2 px-2.5 py-2", RADIUS.sm, BG.mutedSoft)}>
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-medium text-muted-foreground")}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className={cn("font-medium text-foreground", TEXT.body)}>
                {userName}
              </span>
            </div>
            {USER_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center px-2.5 py-2",
                  RADIUS.sm,
                  "text-muted-foreground",
                  BG.mutedSoft,
                  "hover:text-foreground",
                  TRANSITION.colors,
                  TEXT.body,
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {role === "admin" && (
            <div className={cn("border-t pt-4", BORDER.default)}>
              <p className={cn("mb-2 px-2 font-medium", TEXT.small, COLOR.muted)}>
                Admin
              </p>
              <Link
                href="/admin"
                onClick={onClose}
                className={cn(
                  "flex items-center px-2.5 py-2",
                  RADIUS.sm,
                  "text-muted-foreground",
                  BG.mutedSoft,
                  "hover:text-foreground",
                  TRANSITION.colors,
                  TEXT.body,
                )}
              >
                Admin Panel
              </Link>
            </div>
          )}

          <div className={cn("border-t pt-4", BORDER.default)}>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex w-full items-center px-2.5 py-2",
                RADIUS.sm,
                "text-muted-foreground",
                BG.mutedSoft,
                "hover:text-foreground",
                TRANSITION.colors,
                TEXT.body,
              )}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
