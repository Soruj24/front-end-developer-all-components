"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { useActivePath } from "@/hooks";

interface SiteHeaderMobileMenuProps {
  open: boolean;
  /** Called after a link is clicked so the menu can close itself. */
  onNavigate: () => void;
  /** Primary navigation links (falls back to the site config). */
  links?: { label: string; href: string }[];
}

/** Animated dropdown navigation shown below the header on small screens. */
export function SiteHeaderMobileMenu({
  open,
  onNavigate,
  links,
}: SiteHeaderMobileMenuProps) {
  const isActive = useActivePath();
  const items = links ?? siteConfig.navLinks;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-background/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onNavigate}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-x-0 top-14 z-40 origin-top border-b border-border bg-background/95 shadow-xs backdrop-blur-xl transition-all duration-200 ease-out lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {items.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-foreground"
                    : "text-foreground hover:bg-muted",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-2 border-t border-border p-4 pt-3">
          <Link
            href={siteConfig.getStartedHref}
            onClick={onNavigate}
            className="flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            onClick={onNavigate}
            className="flex h-10 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            GitHub
          </Link>
        </div>
      </div>
    </>
  );
}
