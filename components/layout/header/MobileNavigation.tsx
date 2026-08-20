"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

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
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw]",
          "border-l border-border/60 bg-popover shadow-xl",
          "transition-transform duration-300 ease-out",
          "lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
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
            <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-md px-2.5 py-2 text-sm",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "transition-colors",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="border-t border-border/60 pt-4">
            <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              Account
            </p>
            <div className="mb-2 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-medium text-muted-foreground">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground">{userName}</span>
            </div>
            {USER_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-md px-2.5 py-2 text-sm",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "transition-colors",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {role === "admin" && (
            <div className="border-t border-border/60 pt-4">
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                Admin
              </p>
              <Link
                href="/admin"
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-md px-2.5 py-2 text-sm",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "transition-colors",
                )}
              >
                Admin Panel
              </Link>
            </div>
          )}

          <div className="border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex w-full items-center rounded-md px-2.5 py-2 text-sm",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "transition-colors",
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
