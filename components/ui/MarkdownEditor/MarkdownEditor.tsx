"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { MarkdownEditorProps } from "./MarkdownEditor.types";

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold mb-1.5">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mb-2.5">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded-md bg-muted px-1.5 py-0.5 text-xs font-mono">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary/40 pl-3 text-muted-foreground my-2 italic">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

const TOOLBAR_ITEMS = [
  { id: "bold", label: "B", insert: "**", wrap: true },
  { id: "italic", label: "I", insert: "*", wrap: true },
  { id: "heading", label: "H", insert: "# ", wrap: false },
  { id: "quote", label: "\"", insert: "> ", wrap: false },
  { id: "code", label: "<>", insert: "`", wrap: true },
  { id: "link", label: "🔗", insert: "[text](url)", wrap: false },
  { id: "list", label: "•", insert: "- ", wrap: false },
] as const;

export function MarkdownEditor({ value, onChange, placeholder = "Write markdown...", preview = true, height = 240, className }: MarkdownEditorProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const [localPreview, setLocalPreview] = useState(preview);

  const handleChange = useCallback((next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  const wordCount = useMemo(() => {
    const trimmed = currentValue.trim();
    return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  }, [currentValue]);

  const charCount = currentValue.length;

  const handleToolbarClick = useCallback((item: typeof TOOLBAR_ITEMS[number]) => {
    const textarea = document.querySelector(`[data-md-editor]`) as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = currentValue.slice(start, end);
    const next = item.wrap
      ? currentValue.slice(0, start) + item.insert + selected + item.insert + currentValue.slice(end)
      : currentValue.slice(0, start) + item.insert + selected + currentValue.slice(end);
    handleChange(next);
    setTimeout(() => {
      textarea.focus();
      const cursorPos = item.wrap ? start + item.insert.length + selected.length + item.insert.length : start + item.insert.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }, [currentValue, handleChange]);

  const renderedHtml = useMemo(() => renderMarkdown(currentValue), [currentValue]);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className="flex items-center gap-1 border-b border-border bg-muted/30 px-2 py-1.5">
        <div className="flex items-center gap-0.5">
          {TOOLBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToolbarClick(item)}
              aria-label={`Insert ${item.id}`}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "transition-colors duration-150",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
          <button
            type="button"
            onClick={() => setLocalPreview(true)}
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md px-3 text-xs font-medium",
              "transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              localPreview
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setLocalPreview(false)}
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md px-3 text-xs font-medium",
              "transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              !localPreview
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        <textarea
          data-md-editor
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            "flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed",
            "text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none",
            "min-h-[200px]",
            localPreview ? "sm:border-r sm:border-border" : "",
          )}
          style={{ height: localPreview ? height : "100%", minHeight: typeof height === "number" ? `${height}px` : height }}
        />
        {localPreview && (
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4 text-sm leading-relaxed",
              "prose prose-sm max-w-none",
              "[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2.5",
              "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2",
              "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1.5",
              "[&_strong]:font-semibold",
              "[&_em]:italic",
              "[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono",
              "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:my-2 [&_blockquote]:italic",
              "[&_li]:ml-4 [&_li]:list-disc [&_li]:text-sm",
            )}
            style={{ height: localPreview ? height : "auto", minHeight: typeof height === "number" ? `${height}px` : height }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{wordCount} words</span>
          <span className="text-xs text-muted-foreground">{charCount} chars</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Markdown</span>
        </div>
      </div>
    </div>
  );
}
