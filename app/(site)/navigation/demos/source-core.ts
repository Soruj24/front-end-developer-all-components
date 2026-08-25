/** Verbatim source of components/navigation/Sidebar/Sidebar.tsx (Code Viewer). */
export const SIDEBAR_SOURCE = `"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks";
import { navigationSections } from "@/constants/navigation";
import { filterNavigationSections } from "@/utils/navigation";
import type { NavLink, NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import { SidebarToggle } from "./SidebarToggle";
import { SidebarBackdrop } from "./SidebarBackdrop";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarSection } from "./SidebarSection";
import { SidebarFooter } from "./SidebarFooter";

function isLinkActive(link: NavLink, pathname: string): boolean {
  return (
    pathname === link.href ||
    pathname.startsWith(link.href + "/") ||
    (link.children?.some((child) => isLinkActive(child, pathname)) ?? false)
  );
}

function isSectionActive(section: NavSection, pathname: string): boolean {
  return section.links.some((link) => isLinkActive(link, pathname));
}

/** Global site sidebar with searchable, accordion navigation. */
export function Sidebar({ sections }: { sections?: NavSection[] }) {
  const { open, toggle, close } = useSidebar();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const navRef = useRef<HTMLElement>(null);

  const navSections = sections?.length ? sections : navigationSections;

  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const set = new Set<string>();
    for (const section of navSections) {
      if (!isSectionActive(section, pathname)) set.add(section.title);
    }
    return set;
  });

  const filteredSections = useMemo(
    () => filterNavigationSections(navSections, search),
    [navSections, search],
  );

  const isSearching = search.trim().length > 0;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const toggleSection = useCallback((title: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }, []);

  const isSectionOpen = useCallback(
    (section: NavSection) =>
      isSearching ||
      isSectionActive(section, pathname) ||
      !collapsed.has(section.title),
    [isSearching, pathname, collapsed],
  );

  const onNavKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const items = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]"),
    );
    if (items.length === 0) return;
    const currentIndex = items.indexOf(
      document.activeElement as HTMLAnchorElement,
    );
    const focus = (index: number) => {
      const next = (index + items.length) % items.length;
      items[next]?.focus();
    };
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focus(currentIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focus(currentIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  return (
    <>
      <SidebarToggle open={open} onClick={toggle} />
      {open && <SidebarBackdrop onClick={close} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col",
          "border-r border-border/60 bg-card",
          "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          "transition-[transform,box-shadow] duration-300 ease-out",
          "sm:sticky sm:top-14 sm:h-[calc(100vh-3.5rem)] sm:translate-x-0 sm:shadow-none",
          open
            ? "translate-x-0 shadow-xl sm:shadow-none"
            : "-translate-x-full",
        )}
        aria-label="Documentation"
      >
        <SidebarBrand />
        <div className="px-3 pb-1 pt-3">
          <SidebarSearch value={search} onChange={setSearch} />
        </div>

        <nav
          ref={navRef}
          onKeyDown={onNavKeyDown}
          className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3"
          aria-label="Documentation pages"
        >
          {filteredSections.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              open={isSectionOpen(section)}
              onToggle={() => toggleSection(section.title)}
              onNavigate={close}
            />
          ))}
          {filteredSections.length === 0 && (
            <p className="rounded-lg border border-dashed border-border/60 px-3 py-8 text-center text-[13px] text-muted-foreground">
              No pages match &quot;{search}&quot;
            </p>
          )}
        </nav>

        <SidebarFooter />
      </aside>
    </>
  );
}
`;
