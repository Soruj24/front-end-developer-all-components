"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks";
import { navigationSections } from "@/constants/navigation";
import { filterNavigationSections } from "@/utils/navigation";
import type { NavLink, NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarFooter } from "./SidebarFooter";
import { MobileSidebar } from "./MobileSidebar";

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

export function Sidebar({ sections, width = 260 }: SidebarProps) {
  const { open, close } = useSidebar();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navSections = sections?.length ? sections : navigationSections;

  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const set = new Set<string>();
    for (const section of navSections) {
      if (isSectionActive(section, pathname)) set.add(section.title);
    }
    return set;
  });

  const filteredSections = useMemo(
    () => filterNavigationSections(navSections, search),
    [navSections, search],
  );

  const isSearching = search.trim().length > 0;

  const toggleSection = useCallback((title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedSections(new Set(navSections.map((s) => s.title)));
  }, [navSections]);

  const collapseAll = useCallback(() => {
    setExpandedSections(new Set());
  }, []);

  const isSectionOpen = useCallback(
    (section: NavSection) =>
      isSearching ||
      isSectionActive(section, pathname) ||
      expandedSections.has(section.title),
    [isSearching, pathname, expandedSections],
  );

  const onNavKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const items = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]"),
    );
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement);
    const focus = (i: number) => items[(i + items.length) % items.length]?.focus();

    if (event.key === "ArrowDown") { event.preventDefault(); focus(idx + 1); }
    else if (event.key === "ArrowUp") { event.preventDefault(); focus(idx - 1); }
    else if (event.key === "Home") { event.preventDefault(); items[0]?.focus(); }
    else if (event.key === "End") { event.preventDefault(); items[items.length - 1]?.focus(); }
  };

  return (
    <>
      <MobileSidebar open={open} onClose={close} sections={navSections} />

      <aside
        className={cn(
          "hidden flex-col border-r border-border/60 bg-background",
          "sm:flex sm:sticky sm:top-14 sm:h-[calc(100vh-3.5rem)]",
          "transition-[width] duration-300 ease-out",
        )}
        style={{ width: collapsed ? 56 : width }}
        aria-label="Documentation"
      >
        <SidebarHeader
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((p) => !p)}
        />

        {!collapsed && (
          <SidebarSearch value={search} onChange={setSearch} />
        )}

        <nav
          ref={navRef}
          onKeyDown={onNavKeyDown}
          className={cn(
            "flex flex-1 flex-col gap-0.5 overflow-y-auto",
            collapsed ? "px-2 py-3" : "px-3 py-2",
          )}
          aria-label="Documentation pages"
        >
          {!collapsed && (
            <div className="mb-1 flex items-center justify-end gap-1 px-1">
              <button
                type="button"
                onClick={expandAll}
                className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Expand all sections"
              >
                Expand
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Collapse all sections"
              >
                Collapse
              </button>
            </div>
          )}

          <SidebarNavigation
            sections={filteredSections}
            expandedSections={isSectionOpen}
            onToggleSection={toggleSection}
            collapsed={collapsed}
            onNavigate={close}
          />

          {filteredSections.length === 0 && !collapsed && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No pages match &quot;{search}&quot;
            </p>
          )}
        </nav>

        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
