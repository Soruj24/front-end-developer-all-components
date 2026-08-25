"use client";

import { useState } from "react";
import {
  SidebarBrand,
  SidebarSearch,
  SidebarSection,
  SidebarFooter,
} from "@/components/navigation";
import { demoSections } from "./sample-data";

/**
 * Live Preview — the real sidebar sub-components composed inside a static
 * frame, so the redesigned styles can be inspected in isolation.
 */
export function SidebarShowcase() {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(["Resources"]));

  const toggleSection = (title: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <aside
      aria-label="Sidebar live preview"
      className="flex h-[420px] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-left shadow-card ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
    >
      <SidebarBrand />
      <div className="px-3 pb-1 pt-3">
        <SidebarSearch value={search} onChange={setSearch} />
      </div>
      <nav
        aria-label="Preview pages"
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3"
      >
        {demoSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            open={!collapsed.has(section.title)}
            onToggle={() => toggleSection(section.title)}
            onNavigate={() => {}}
          />
        ))}
      </nav>
      <SidebarFooter />
    </aside>
  );
}
