"use client";

import type { NavSection } from "@/types/navigation";
import { SidebarSection } from "./SidebarSection";

interface SidebarNavigationProps {
  sections: NavSection[];
  expandedSections: (section: NavSection) => boolean;
  onToggleSection: (title: string) => void;
  collapsed: boolean;
  onNavigate: () => void;
}

export function SidebarNavigation({
  sections,
  expandedSections,
  onToggleSection,
  collapsed,
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {sections.map((section) => (
        <SidebarSection
          key={section.title}
          section={section}
          open={expandedSections(section)}
          onToggle={() => onToggleSection(section.title)}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
