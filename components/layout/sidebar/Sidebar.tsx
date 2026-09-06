"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/constants/navigation";
import { filterNavigationSections } from "@/utils/navigation";
import type { NavLink, NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import { FOCUS, TEXT } from "@/constants/tokens";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  sections?: NavSection[];
  width?: number;
}

function isLinkActive(link: NavLink, pathname: string): boolean {
  return (
    pathname === link.href ||
    pathname.startsWith(`${link.href}/`) ||
    (link.children?.some((c) => isLinkActive(c, pathname)) ?? false)
  );
}

function isSectionActive(section: NavSection, pathname: string): boolean {
  return section.links.some((link) => isLinkActive(link, pathname));
}

export function Sidebar({ sections, width = 264 }: SidebarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navSections = sections?.length ? sections : navigationSections;

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const set = new Set<string>();
    for (const section of navSections) {
      if (isSectionActive(section, pathname)) set.add(section.title);
    }
    return set;
  });

  const filtered = useMemo(
    () => filterNavigationSections(navSections, search),
    [navSections, search],
  );
  const isSearching = search.trim().length > 0;

  const toggleSection = useCallback((title: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }, []);

  const isOpen = useCallback(
    (section: NavSection) =>
      isSearching || isSectionActive(section, pathname) || expanded.has(section.title),
    [isSearching, pathname, expanded],
  );

  const onNavKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const items = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]"));
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement);
    const focus = (i: number) => items[(i + items.length) % items.length]?.focus();
    if (event.key === "ArrowDown") { event.preventDefault(); focus(idx + 1); }
    else if (event.key === "ArrowUp") { event.preventDefault(); focus(idx - 1); }
    else if (event.key === "Home") { event.preventDefault(); items[0]?.focus(); }
    else if (event.key === "End") { event.preventDefault(); items[items.length - 1]?.focus(); }
  };

  return (
    <aside
      aria-label="Documentation"
      style={{ width: collapsed ? 60 : width }}
      className="sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-border/60 bg-background transition-[width] duration-200 ease-out lg:flex"
    >
      {!collapsed && <SidebarSearch value={search} onChange={setSearch} />}

      <nav
        ref={navRef}
        onKeyDown={onNavKeyDown}
        aria-label="Documentation pages"
        className={cn(
          "flex flex-1 flex-col gap-0.5 overflow-y-auto",
          collapsed ? "px-2 py-3" : "px-3 py-3",
        )}
      >
        <SidebarNavigation
          sections={filtered}
          expandedSections={isOpen}
          onToggleSection={toggleSection}
          collapsed={collapsed}
          onNavigate={() => {}}
        />
        {filtered.length === 0 && !collapsed && (
          <p className={cn("px-3 py-8 text-center text-muted-foreground", TEXT.body)}>
            No pages match &quot;{search}&quot;
          </p>
        )}
      </nav>

      <div className="border-t border-border/60">
        <button
          type="button"
          onClick={() => setCollapsed((p) => !p)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2.5 text-muted-foreground transition-colors hover:text-foreground",
            TEXT.small,
            FOCUS.ring,
            collapsed && "justify-center px-0",
          )}
        >
          <svg
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", collapsed && "rotate-180")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {!collapsed && <span className="font-medium">Collapse</span>}
        </button>
        <SidebarFooter collapsed={collapsed} />
      </div>
    </aside>
  );
}
