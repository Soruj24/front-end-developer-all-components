"use client";

import { cn } from "@/lib/cn";
import type { PromptSection } from "@/components/prompt-builder/templates";

export function SectionTabs({
  sections,
  activeSectionId,
  onSelect,
}: {
  sections: PromptSection[];
  activeSectionId: string;
  onSelect: (id: string) => void;
}) {
  if (sections.length === 0) {
    return <p className="text-sm text-muted-foreground">No sections yet. Add one to get started.</p>;
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onSelect(section.id)}
          className={cn(
            "inline-flex max-w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
            section.id === activeSectionId
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <span className="font-mono text-[10px] opacity-70">{index + 1}</span>
          <span className="max-w-[10rem] truncate">{section.title}</span>
        </button>
      ))}
    </div>
  );
}
