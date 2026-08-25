"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MarkdownEditor } from "@/components/ui/MarkdownEditor";

const MARKDOWN_EDITOR_SOURCE = `"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  preview?: boolean;
  height?: number | string;
  className?: string;
}

const TOOLBAR_ITEMS = [
  { id: "bold", label: "B", insert: "**", wrap: true },
  { id: "italic", label: "I", insert: "*", wrap: true },
  { id: "heading", label: "H", insert: "# ", wrap: false },
  { id: "quote", label: "\\"", insert: "> ", wrap: false },
  { id: "code", label: "<>", insert: "\`", wrap: true },
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

  const handleToolbarClick = useCallback((item: typeof TOOLBAR_ITEMS[number]) => {
    const textarea = document.querySelector(\`[data-md-editor]\`) as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = currentValue.slice(start, end);
    const next = item.wrap
      ? currentValue.slice(0, start) + item.insert + selected + item.insert + currentValue.slice(end)
      : currentValue.slice(0, start) + item.insert + selected + currentValue.slice(end);
    handleChange(next);
  }, [currentValue, handleChange]);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className="flex items-center gap-1 border-b border-border bg-muted/30 px-2 py-1.5">
        <div className="flex items-center gap-0.5">
          {TOOLBAR_ITEMS.map((item) => (
            <button key={item.id} type="button" onClick={() => handleToolbarClick(item)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              {item.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
          <button onClick={() => setLocalPreview(true)} className={cn("inline-flex h-7 items-center justify-center rounded-md px-3 text-xs font-medium", localPreview ? "bg-foreground text-background shadow-sm" : "text-muted-foreground")}>
            Split
          </button>
          <button onClick={() => setLocalPreview(false)} className={cn("inline-flex h-7 items-center justify-center rounded-md px-3 text-xs font-medium", !localPreview ? "bg-foreground text-background shadow-sm" : "text-muted-foreground")}>
            Edit
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        <textarea data-md-editor value={currentValue} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder}
          className="flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-h-[200px]"
          style={{ height: localPreview ? height : "100%" }} />
        {localPreview && (
          <div className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed" style={{ height: localPreview ? height : "auto" }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentValue) }} />
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
}`;

const DEFAULT_VALUE = "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n> A blockquote\n\n`inline code` and a [link](https://example.com)";

export default function MarkdownEditorPage() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return (
    <ComponentDocPage
      name="Markdown Editor"
      category="Editor"
      description="Rich markdown editor with live preview, toolbar shortcuts, and split view."
    >
      <PreviewPanel filename="markdown-editor-preview.tsx">
        <MarkdownEditor value={value} onChange={setValue} height={280} />
      </PreviewPanel>

      <SourceCodeViewer source={MARKDOWN_EDITOR_SOURCE} filename="components/ui/MarkdownEditor/MarkdownEditor.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Split View"
          description="Side-by-side editor and live preview."
          code={`import { MarkdownEditor } from "@/components/ui/MarkdownEditor";

<MarkdownEditor value={text} onChange={setText} preview={true} />`}
          filename="split.tsx"
        >
          <MarkdownEditor value={value} onChange={setValue} height={240} />
        </ExampleBlock>

        <ExampleBlock
          title="Edit Only"
          description="Toolbar and raw markdown without preview."
          code={`<MarkdownEditor value={text} onChange={setText} preview={false} />`}
          filename="edit-only.tsx"
        >
          <MarkdownEditor value={value} onChange={setValue} preview={false} height={220} />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Placeholder"
          description="Custom placeholder text for empty state."
          code={`<MarkdownEditor placeholder="Start writing..." onChange={setText} />`}
          filename="placeholder.tsx"
        >
          <MarkdownEditor placeholder="Start writing your markdown here..." height={200} />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Height"
          description="Adjust the editor height."
          code={`<MarkdownEditor value={text} onChange={setText} height={400} />`}
          filename="height.tsx"
        >
          <MarkdownEditor value={value} onChange={setValue} height={360} />
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
