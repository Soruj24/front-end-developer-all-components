"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavLink[];
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface SidebarProps {
  sections?: NavSection[];
  collapsed?: boolean;
  onToggle?: () => void;
}

function isActiveLink(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = isActiveLink(link.href, pathname);

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {link.icon && <span className="h-4 w-4">{link.icon}</span>}
      {link.label}
    </Link>
  );
}

function SidebarSection({
  section,
  pathname,
  defaultOpen = true,
}: {
  section: NavSection;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
      >
        {section.title}
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-0.5 pl-2">
          {section.links.map((link) => (
            <SidebarLink key={link.href} link={link} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ sections = [], collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 bottom-0 z-30 w-64 border-r border-border/50 bg-background/95 backdrop-blur-sm transition-all duration-300",
        "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]",
        collapsed && "-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden"
      )}
      aria-label="Documentation"
    >
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search docs..."
            className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-9 pr-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:bg-muted/50 focus:outline-none"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1" aria-label="Documentation">
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              pathname={pathname}
              defaultOpen={section.links.some((link) =>
                isActiveLink(link.href, pathname)
              )}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border/50 pt-4">
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs font-medium text-foreground">Need help?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check our documentation or open an issue.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
