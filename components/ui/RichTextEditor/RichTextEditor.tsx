"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { RichTextEditorProps, RichTextEditorView, RichTextEditorToolbarButton } from "./RichTextEditor.types";

const TOOLBAR_BUTTONS: RichTextEditorToolbarButton[] = [
  { label: "B", title: "Bold", tag: "strong" },
  { label: "I", title: "Italic", tag: "em" },
  { label: "U", title: "Underline", tag: "u" },
  { label: "H1", title: "Heading 1", tag: "h1" },
  { label: "H2", title: "Heading 2", tag: "h2" },
  { label: "\u2022", title: "Bullet List", tag: "ul" },
  { label: "1.", title: "Numbered List", tag: "ol" },
  { label: "\u201C", title: "Quote", tag: "blockquote" },
];

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mb-1.5">$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary/40 pl-3 text-muted-foreground italic my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$2</li>')
    .replace(/\n/g, '<br/>');
}

export function RichTextEditor({
  value,
  onChange,
  view: controlledView,
  onViewChange,
  placeholder = "Start writing...",
  disabled = false,
  className,
}: RichTextEditorProps) {
  const [internalValue, setInternalValue] = useState("");
  const [internalView, setInternalView] = useState<RichTextEditorView>("split");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const currentView = controlledView !== undefined ? controlledView : internalView;

  const handleChange = useCallback((next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  const handleViewChange = useCallback((next: RichTextEditorView) => {
    if (controlledView === undefined) setInternalView(next);
    onViewChange?.(next);
  }, [controlledView, onViewChange]);

  const wordCount = currentValue.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
          {TOOLBAR_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              disabled={disabled}
              title={btn.title}
              aria-label={btn.title}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold",
                "text-muted-foreground transition-colors duration-150",
                "hover:bg-background hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
          {(["edit", "preview", "split"] as const).map((v) => (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => handleViewChange(v)}
              className={cn(
                "inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium capitalize",
                "transition-all duration-150",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                currentView === v
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:bg-background hover:text-foreground",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {(currentView === "edit" || currentView === "split") && (
          <textarea
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex min-h-[200px] flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3",
              "font-mono text-sm leading-relaxed text-foreground",
              "placeholder:text-muted-foreground/50",
              "transition-colors duration-150",
              "hover:border-muted-foreground/30",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          />
        )}

        {(currentView === "preview" || currentView === "split") && (
          <div
            className={cn(
              "flex-1 overflow-auto rounded-xl border border-border bg-card px-4 py-3",
              "prose prose-sm max-h-[200px] text-sm leading-relaxed text-foreground",
              "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            )}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentValue) || '<span class="text-muted-foreground/50">Nothing to preview</span>' }}
          />
        )}
      </div>

      <div className="flex items-center justify-end text-xs text-muted-foreground/60">
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </div>
    </div>
  );
}
