"use client";

import { useMemo, useState } from "react";
import { RotateCcwIcon } from "lucide-react";
import {
  SidebarBrand,
  SidebarSearch,
  SidebarSection,
  SidebarFooter,
} from "@/components/navigation";
import { filterNavigationSections } from "@/utils/navigation";
import { cn } from "@/lib/cn";
import { demoSections } from "./sample-data";

/**
 * Interactive playground — drive the real sidebar pieces with a search
 * query and per-section accordion toggles.
 */
export function NavPlayground() {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(["Resources"]));

  const sections = useMemo(
    () => filterNavigationSections(demoSections, query),
    [query],
  );
  const isSearching = query.trim().length > 0;

  const toggleSection = (title: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const reset = () => {
    setQuery("");
    setCollapsed(new Set());
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Sections
        </span>
        {demoSections.map((section) => {
          const open = isSearching || !collapsed.has(section.title);
          return (
            <button
              key={section.title}
              type="button"
              onClick={() => toggleSection(section.title)}
              aria-pressed={open}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                open
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {section.title}
            </button>
          );
        })}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <RotateCcwIcon className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="flex justify-center rounded-xl border border-dashed border-border bg-muted/20 p-6 dark:bg-muted/30">
        <aside
          aria-label="Sidebar playground"
          className="flex h-[380px] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-card ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
        >
          <SidebarBrand />
          <div className="px-3 pb-1 pt-3">
            <SidebarSearch value={query} onChange={setQuery} />
          </div>
          <nav
            aria-label="Playground pages"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3"
          >
            {sections.map((section) => (
              <SidebarSection
                key={section.title}
                section={section}
                open={isSearching || !collapsed.has(section.title)}
                onToggle={() => toggleSection(section.title)}
                onNavigate={() => {}}
              />
            ))}
            {sections.length === 0 && (
              <p className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-[13px] text-muted-foreground">
                No pages match &quot;{query}&quot;
              </p>
            )}
          </nav>
          <SidebarFooter />
        </aside>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Tip: press{" "}
        <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium">
          /
        </kbd>{" "}
        to focus search · ↑ ↓ to move between links · ← → to collapse or expand sections.
      </p>
    </div>
  );
}
