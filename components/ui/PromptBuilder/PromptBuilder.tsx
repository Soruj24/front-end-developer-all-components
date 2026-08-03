"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { promptBuilderTemplates } from "@/components/prompt-builder/templates";
import type { PromptBuilderProps } from "./PromptBuilder.types";
import { DEFAULT_MAX_LENGTH, ICON } from "./PromptBuilder.constants";
import { usePromptBuilder } from "./usePromptBuilder";
import { renderEditorHighlightNodes, renderPreviewBodyNodes } from "./PromptBuilderFormatting";
import { ToolbarButton, ActionButton, Icon } from "./PromptBuilderToolbar";
import { PromptBuilderHelp } from "./PromptBuilderHelp";
import { PromptBuilderHistory } from "./PromptBuilderHistory";
import { PromptBuilderEditor } from "./PromptBuilderEditor";
import { PromptBuilderVariables } from "./PromptBuilderVariables";
import { PromptBuilderPreview } from "./PromptBuilderPreview";

export function PromptBuilder({
  templates = promptBuilderTemplates,
  initialTemplateId,
  maxLength = DEFAULT_MAX_LENGTH,
  storageKey,
  includeSectionTitles = true,
  className,
  onCopy,
  onStateChange,
}: PromptBuilderProps) {
  const pb = usePromptBuilder({ templates, initialTemplateId, maxLength, storageKey, includeSectionTitles, onCopy, onStateChange });
  const historyPanelRef = useRef<HTMLDivElement>(null);
  const helpPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== "object") throw new Error("Invalid file.");
        setImportError(null);
      } catch (error) { setImportError(error instanceof Error ? error.message : "Could not read file."); }
    };
    reader.readAsText(file); event.target.value = "";
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const mod = event.metaKey || event.ctrlKey;
    if (mod && event.key === "Enter") { event.preventDefault(); void pb.copyPrompt(); return; }
    if (mod && event.shiftKey && event.key.toLowerCase() === "b") { event.preventDefault(); pb.toggleBullet(); return; }
    if (mod && event.key.toLowerCase() === "b") { event.preventDefault(); pb.formatSelection("**", "**"); return; }
    if (mod && event.key.toLowerCase() === "i") { event.preventDefault(); pb.formatSelection("*", "*"); return; }
    if (mod && event.key.toLowerCase() === "z") { event.preventDefault(); if (event.shiftKey) pb.redo(); else pb.undo(); return; }
    if (mod && event.key.toLowerCase() === "y") { event.preventDefault(); pb.redo(); return; }
    if (mod && event.key.toLowerCase() === "k") { event.preventDefault(); setHelpOpen((o) => !o); return; }
  };

  const renderEditorHighlight = (content: string) => renderEditorHighlightNodes(content, pb.varById);
  const renderPreviewBody = (content: string) => renderPreviewBodyNodes(content, pb.varById);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)} onKeyDown={handleKeyDown}>
      <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImport} aria-label="Import prompt JSON" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <select value={pb.state.templateId} onChange={(e) => pb.selectTemplate(e.target.value)} aria-label="Prompt template" className="h-9 max-w-[16rem] rounded-lg border border-input bg-background px-2.5 pr-8 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring">
            {templates.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", pb.isValid ? "border-success/40 bg-success-soft text-success" : "border-warning/40 bg-warning-soft text-warning")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", pb.isValid ? "bg-success" : "bg-warning")} />
            {pb.isValid ? (pb.totalChars > 0 ? "Ready to copy" : "Empty prompt") : `${pb.validation.missingRequired.length} variable${pb.validation.missingRequired.length === 1 ? "" : "s"} need a value`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <ToolbarButton onClick={pb.undo} disabled={pb.history.length === 0} label="Undo"><Icon d={ICON.undo} /></ToolbarButton>
            <ToolbarButton onClick={pb.redo} disabled={pb.future.length === 0} label="Redo"><Icon d={ICON.redo} /></ToolbarButton>
            <div ref={historyPanelRef} className="relative">
              <ToolbarButton onClick={() => setHistoryOpen((o) => !o)} active={historyOpen} label="History"><Icon d={ICON.clock} /></ToolbarButton>
              {historyOpen && <PromptBuilderHistory history={pb.history} onJumpTo={pb.jumpToHistory} />}
            </div>
            <div ref={helpPanelRef} className="relative">
              <ToolbarButton onClick={() => setHelpOpen((o) => !o)} active={helpOpen} label="Shortcuts"><Icon d={ICON.help} /></ToolbarButton>
              {helpOpen && <PromptBuilderHelp />}
            </div>
          </div>
          <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <div className="flex items-center gap-1.5">
            <ActionButton onClick={() => fileInputRef.current?.click()} label="Import"><Icon d={ICON.upload} className="h-3.5 w-3.5" />Import</ActionButton>
            <ActionButton onClick={() => {}} label="Export"><Icon d={ICON.download} className="h-3.5 w-3.5" />Export</ActionButton>
            <ActionButton onClick={pb.reset} label="Reset"><Icon d={ICON.reset} className="h-3.5 w-3.5" />Reset</ActionButton>
            <ActionButton variant="primary" onClick={() => void pb.copyPrompt()} disabled={pb.totalChars === 0} label="Copy"><Icon d={pb.copied ? ICON.check : ICON.copy} className="h-3.5 w-3.5" />{pb.copied ? "Copied" : "Copy"}</ActionButton>
          </div>
        </div>
      </div>

      {importError && <p className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">{importError}</p>}

      <div className="grid gap-4 lg:grid-cols-2">
        {pb.activeSection ? (
          <PromptBuilderEditor activeSection={pb.activeSection} activeSectionContent={pb.activeSectionContent} activeSectionIndex={pb.activeSectionIndex} sections={pb.state.sections} variables={pb.state.variables} maxLength={maxLength} taRefs={pb.taRefs} onUpdateSection={pb.updateSection} onMoveSection={pb.moveSection} onRemoveSection={pb.removeSection} onInsertVariable={pb.insertVariable} onAddSection={pb.addSection} renderEditorHighlight={renderEditorHighlight} />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface p-4 py-10">
            <p className="text-sm text-muted-foreground">No sections yet.</p>
            <ActionButton onClick={pb.addSection} label="Add section"><Icon d={ICON.plus} className="h-3.5 w-3.5" />Add section</ActionButton>
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-tight">Variables</h3>
              <ActionButton onClick={pb.addVariable} label="Add variable"><Icon d={ICON.plus} className="h-3.5 w-3.5" />Add</ActionButton>
            </div>
            <PromptBuilderVariables variables={pb.state.variables} onUpdateVariable={pb.updateVariable} onRemoveVariable={pb.removeVariable} />
          </div>
          <PromptBuilderPreview sections={pb.state.sections} variables={pb.state.variables} varById={pb.varById} includeSectionTitles={includeSectionTitles} totalChars={pb.totalChars} maxLength={maxLength} charRatio={pb.charRatio} copied={pb.copied} onCopy={() => void pb.copyPrompt()} renderPreviewBody={renderPreviewBody} />
        </div>
      </div>
    </div>
  );
}
