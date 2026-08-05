"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { SiteHeaderMobileNav } from "./SiteHeaderMobileNav";
import { SiteHeaderMobileActions } from "./SiteHeaderMobileActions";
import { siteConfig } from "@/config/site";
import type { NavItem } from "../types/header.types";

interface SiteHeaderMobileMenuProps {
  isOpen: boolean;
  links: NavItem[];
  onNavigate: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  className?: string;
}

export function SiteHeaderMobileMenu({
  isOpen,
  links,
  onNavigate,
  theme,
  onThemeToggle,
  className,
}: SiteHeaderMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-14 z-40",
        "border-b border-border bg-surface/95 backdrop-blur-xl",
        "lg:hidden",
        "animate-slide-in-down",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="mb-4">
          <Link
            href="/"
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2",
              "text-[14px] font-medium text-muted-foreground",
              "transition-colors hover:bg-muted/50 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">
              {siteConfig.shortName}
            </span>
            {siteConfig.name}
          </Link>
        </div>

        <SiteHeaderMobileNav links={links} onNavigate={onNavigate} />

        <div className="my-4 border-t border-border" />

        <SiteHeaderMobileActions theme={theme} onThemeToggle={onThemeToggle} />

        <div className="mt-4">
          <Link
            href={siteConfig.getStartedHref}
            onClick={onNavigate}
            className={cn(
              "flex w-full items-center justify-center rounded-full",
              "bg-foreground px-4 py-2.5 text-[13px] font-medium text-background",
              "shadow-sm transition-all hover:shadow-md active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
