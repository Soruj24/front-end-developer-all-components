"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useActivePath } from "@/hooks";
import { siteConfig } from "@/config/site";
import type { NavLink, NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  sections: NavSection[];
}

function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const isActive = useActivePath();
  const active = isActive(link.href, { exact: true });

  return (
    <li>
      <Link
        href={link.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
          active
            ? "bg-accent-soft text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        aria-current={active ? "page" : undefined}
      >
        {link.icon && <span className="mr-2 text-xs text-muted-foreground">{link.icon}</span>}
        {link.label}
      </Link>
      {link.children && link.children.length > 0 && (
        <ul className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-border/60 pl-2">
          {link.children.map((child) => (
            <MobileLink key={child.label} link={child} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileSidebar({ open, onClose, sections }: MobileSidebarProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col",
          "border-r border-border/60 bg-background shadow-xl",
          "transition-transform duration-300 ease-out sm:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <Link href="/" className="group flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-[11px] font-bold text-background">
              {siteConfig.shortName}
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label="Close menu"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-3">
              <p className="mb-1.5 px-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.links.map((link) => (
                  <MobileLink key={link.label} link={link} onNavigate={onClose} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/60 px-4 py-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Settings</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              v2.0
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
