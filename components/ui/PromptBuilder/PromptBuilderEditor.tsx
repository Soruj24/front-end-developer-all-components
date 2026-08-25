"use client";

import { type RefObject, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PromptSection, PromptVariable } from "@/components/prompt-builder/templates";
import { editorBase } from "./PromptBuilder.constants";
import { ToolbarButton, ActionButton, Icon, ICON } from "./PromptBuilderToolbar";
import { SectionTabs } from "./SectionTabs";
import { VariableChips } from "./VariableChips";

interface PromptBuilderEditorProps {
  activeSection: PromptSection;
  activeSectionContent: string;
  activeSectionIndex: number;
  sections: PromptSection[];
  variables: PromptVariable[];
  maxLength: number;
  taRefs: RefObject<Record<string, HTMLTextAreaElement | null>>;
  onUpdateSection: (id: string, patch: Partial<PromptSection>) => void;
  onMoveSection: (id: string, dir: -1 | 1) => void;
  onRemoveSection: (id: string) => void;
  onInsertVariable: (id: string) => void;
  onAddSection: () => void;
  renderEditorHighlight: (content: string) => ReactNode[];
}

export function PromptBuilderEditor({
  activeSection, activeSectionContent, activeSectionIndex, sections, variables, maxLength,
  taRefs, onUpdateSection, onMoveSection, onRemoveSection, onInsertVariable, onAddSection, renderEditorHighlight,
}: PromptBuilderEditorProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight">Sections</h3>
        <ActionButton onClick={onAddSection} label="Add section"><Icon d={ICON.plus} className="h-3.5 w-3.5" />Add</ActionButton>
      </div>

      <SectionTabs sections={sections} activeSectionId={activeSection.id} onSelect={(id) => onUpdateSection(id, { title: sections.find((s) => s.id === id)?.title ?? "" })} />

      <div className="flex flex-wrap items-center gap-2">
        <input value={activeSection.title} onChange={(e) => onUpdateSection(activeSection.id, { title: e.target.value })} aria-label="Section title" className="h-9 w-full max-w-[16rem] rounded-lg border border-input bg-background px-2.5 text-sm font-medium outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton onClick={() => onMoveSection(activeSection.id, -1)} disabled={activeSectionIndex <= 0} label="Move up"><Icon d={ICON.chevronUp} className="h-3.5 w-3.5" /></ToolbarButton>
          <ToolbarButton onClick={() => onMoveSection(activeSection.id, 1)} disabled={activeSectionIndex < 0 || activeSectionIndex >= sections.length - 1} label="Move down"><Icon d={ICON.chevronDown} className="h-3.5 w-3.5" /></ToolbarButton>
          <ToolbarButton onClick={() => onRemoveSection(activeSection.id)} disabled={sections.length <= 1} label="Delete"><Icon d={ICON.trash} className="h-3.5 w-3.5" /></ToolbarButton>
        </div>
      </div>

      <VariableChips variables={variables} onInsert={onInsertVariable} />

      <div className="relative rounded-lg border border-input bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
        <pre aria-hidden className={cn(editorBase, "pointer-events-none absolute inset-0 text-foreground")}>{renderEditorHighlight(activeSectionContent)}{"\n"}</pre>
        <textarea ref={(el) => { taRefs.current[activeSection.id] = el; }} value={activeSectionContent} onChange={(e) => onUpdateSection(activeSection.id, { content: e.target.value.slice(0, maxLength) })} placeholder="Write your prompt here. Insert {{variable}} tokens or click a chip above." aria-label={`Section content: ${activeSection.title}`} spellCheck={false} className={cn(editorBase, "relative block text-transparent caret-foreground selection:bg-primary/10 placeholder:text-muted-foreground")} />
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground/70">
        <span>{activeSectionContent.length.toLocaleString()} chars in this section</span>
        <span className="font-mono">{"{{variable}}"} tokens highlight live</span>
      </div>
    </div>
  );
}
