import type { RefObject } from "react";
import { cn } from "@/lib/cn";
import type { PromptSection } from "@/components/prompt-builder/templates";
import type { Token } from "./PromptBuilder.types";
import { parseTokens } from "./PromptBuilder.utils";

export function formatSelection(
  activeSection: PromptSection | undefined,
  activeSectionContent: string,
  taRefs: RefObject<Record<string, HTMLTextAreaElement | null>>,
  before: string,
  after: string,
  updateSection: (id: string, patch: Partial<PromptSection>) => void,
  resizeActive: () => void
) {
  if (!activeSection) return;
  const ta = taRefs.current[activeSection.id];
  const len = activeSectionContent.length;
  const start = ta && document.activeElement === ta ? ta.selectionStart : len;
  const end = ta && document.activeElement === ta ? ta.selectionEnd : len;
  const selected = activeSectionContent.slice(start, end) || "text";
  const nextContent = activeSectionContent.slice(0, start) + before + selected + after + activeSectionContent.slice(end);
  updateSection(activeSection.id, { content: nextContent });
  requestAnimationFrame(() => { if (ta) { ta.focus(); ta.setSelectionRange(start + before.length, start + before.length + selected.length); resizeActive(); } });
}

export function toggleBullet(
  activeSection: PromptSection | undefined,
  activeSectionContent: string,
  taRefs: RefObject<Record<string, HTMLTextAreaElement | null>>,
  updateSection: (id: string, patch: Partial<PromptSection>) => void
) {
  if (!activeSection) return;
  const ta = taRefs.current[activeSection.id];
  const len = activeSectionContent.length;
  const start = ta && document.activeElement === ta ? ta.selectionStart : len;
  const lineStart = activeSectionContent.lastIndexOf("\n", start - 1) + 1;
  const before = activeSectionContent.slice(0, lineStart);
  const after = activeSectionContent.slice(lineStart);
  const hasBullet = after.startsWith("- ");
  updateSection(activeSection.id, { content: hasBullet ? before + after.slice(2) : before + "- " + after });
}

export function insertVariableToken(
  activeSection: PromptSection | undefined,
  activeSectionContent: string,
  taRefs: RefObject<Record<string, HTMLTextAreaElement | null>>,
  variableId: string,
  updateSection: (id: string, patch: Partial<PromptSection>) => void,
  resizeActive: () => void
) {
  if (!activeSection) return;
  const ta = taRefs.current[activeSection.id];
  const len = activeSectionContent.length;
  const start = ta && document.activeElement === ta ? ta.selectionStart : len;
  const token = `{{${variableId}}}`;
  const nextContent = activeSectionContent.slice(0, start) + token + activeSectionContent.slice(start);
  updateSection(activeSection.id, { content: nextContent });
  requestAnimationFrame(() => { if (ta) { ta.focus(); ta.setSelectionRange(start + token.length, start + token.length); resizeActive(); } });
}

export function renderEditorHighlightNodes(content: string, varById: Map<string, { id: string }>): React.ReactNode[] {
  const tokens = parseTokens(content);
  const nodes: React.ReactNode[] = [];
  let last = 0;
  tokens.forEach((token, i) => {
    if (token.start > last) nodes.push(content.slice(last, token.start));
    const known = varById.has(token.id);
    nodes.push(<mark key={`${token.id}-${i}`} className={cn("rounded-[3px] px-px font-semibold", known ? "bg-primary-soft text-primary" : "bg-danger-soft text-danger")}>{token.full}</mark>);
    last = token.end;
  });
  if (last < content.length) nodes.push(content.slice(last));
  return nodes;
}

export function renderPreviewBodyNodes(content: string, varById: Map<string, import("@/components/prompt-builder/templates").PromptVariable>): React.ReactNode[] {
  const tokens = parseTokens(content);
  const nodes: React.ReactNode[] = [];
  let last = 0;
  tokens.forEach((token, i) => {
    if (token.start > last) nodes.push(content.slice(last, token.start));
    const variable = varById.get(token.id);
    const filled = Boolean(variable?.value.trim());
    const requiredMissing = Boolean(variable?.required && !filled);
    const hasPlaceholder = Boolean(variable?.placeholder && !filled);
    const display = filled ? variable?.value ?? "" : hasPlaceholder ? `[${variable?.placeholder ?? token.full}]` : token.full;
    nodes.push(
      <span key={`${token.id}-${i}`} title={variable ? `${variable.label}${filled ? `: ${variable.value}` : " — needs a value"}` : `Unknown variable: ${token.full}`} className={cn("mx-0.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.9em]", filled ? "bg-primary-soft text-primary" : requiredMissing ? "bg-danger-soft text-danger" : hasPlaceholder ? "bg-warning-soft text-warning" : "bg-muted text-muted-foreground")}>
        {display}
        {requiredMissing && <span className="text-[10px] font-semibold uppercase tracking-wide">Required</span>}
      </span>
    );
    last = token.end;
  });
  if (last < content.length) nodes.push(content.slice(last));
  return nodes;
}
