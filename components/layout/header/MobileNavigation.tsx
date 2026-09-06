"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS, TEXT, Z } from "@/constants/tokens";
import { siteConfig } from "@/config/site";
import type { NavSection } from "@/types/navigation";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  sections: NavSection[];
  role?: "user" | "admin";
  userName?: string;
  onSearch?: () => void;
  className?: string;
}

const PRIMARY = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export function MobileNavigation({
  isOpen,
  onClose,
  sections,
  userName = "User",
  onSearch,
  className,
}: MobileNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const shown = sections.slice(0, 6);

  return (
    <div className={cn(!isOpen && "pointer-events-none", className)} aria-hidden={!isOpen}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-overlay transition-opacity duration-200 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col border-r border-border/60 bg-background transition-transform duration-200 ease-out lg:hidden",
          Z.chrome,
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-4">
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
              {siteConfig.shortName}
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            tabIndex={isOpen ? 0 : -1}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              FOCUS.ring,
            )}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 pt-3">
          <button
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => { onClose(); onSearch?.(); }}
            className={cn(
              "flex h-11 w-full items-center gap-2.5 rounded-md border border-border/60 bg-muted/50 px-3 text-sm text-muted-foreground",
              FOCUS.ring,
            )}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search…
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
          <ul className="flex flex-col">
            {PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  tabIndex={isOpen ? 0 : -1}
                  className="flex min-h-[44px] items-center rounded-md px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-border/60" />
          {shown.map((section) => (
            <div key={section.title} className="mb-1">
              <p className={cn("px-3 pb-1 pt-2 font-semibold uppercase tracking-widest text-muted-foreground", TEXT.tiny)}>
                {section.title}
              </p>
              <ul className="flex flex-col">
                {section.links.slice(0, 6).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      tabIndex={isOpen ? 0 : -1}
                      className="flex min-h-[44px] items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <span className="truncate">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-border/60 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
            {userName.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {userName}
          </span>
          <Link
            href="/account/settings"
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className={cn("rounded-md px-2 py-2 text-[13px] text-muted-foreground hover:text-foreground", FOCUS.ring)}
          >
            Settings
          </Link>
        </div>
      </nav>
    </div>
  );
}
