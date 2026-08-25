"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

const RICH_TEXT_EDITOR_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type RichTextEditorView = "edit" | "preview" | "split";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  view?: RichTextEditorView;
  onViewChange?: (view: RichTextEditorView) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const TOOLBAR_BUTTONS = [
  { label: "B", title: "Bold" }, { label: "I", title: "Italic" }, { label: "U", title: "Underline" },
  { label: "H1", title: "Heading 1" }, { label: "H2", title: "Heading 2" },
  { label: "\\u2022", title: "Bullet List" }, { label: "1.", title: "Numbered List" }, { label: "\\u201C", title: "Quote" },
];

function renderMarkdown(text) {
  return text.replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>").replace(/\\*(.+?)\\*/g, "<em>$1</em>")
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mb-1.5">$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary/40 pl-3 text-muted-foreground italic my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>')
    .replace(/^\\d+\\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$1</li>')
    .replace(/\\n/g, "<br/>");
}

export function RichTextEditor({ value, onChange, view: controlledView, onViewChange, placeholder = "Start writing...", disabled = false, className }: RichTextEditorProps) {
  const [internalValue, setInternalValue] = useState("");
  const [internalView, setInternalView] = useState("split");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const currentView = controlledView !== undefined ? controlledView : internalView;
  const handleChange = useCallback((next) => { if (!isControlled) setInternalValue(next); onChange?.(next); }, [isControlled, onChange]);
  const handleViewChange = useCallback((next) => { if (controlledView === undefined) setInternalView(next); onViewChange?.(next); }, [controlledView, onViewChange]);
  const wordCount = currentValue.trim().split(/\\s+/).filter(Boolean).length;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
          {TOOLBAR_BUTTONS.map((btn) => (
            <button key={btn.label} type="button" disabled={disabled} title={btn.title} aria-label={btn.title}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">{btn.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
          {["edit", "preview", "split"].map((v) => (
            <button key={v} type="button" disabled={disabled} onClick={() => handleViewChange(v)}
              className={cn("inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium capitalize transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                currentView === v ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-background hover:text-foreground")}>{v}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {(currentView === "edit" || currentView === "split") && (
          <textarea value={currentValue} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder} disabled={disabled}
            className="flex min-h-[200px] flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        )}
        {(currentView === "preview" || currentView === "split") && (
          <div className={cn("flex-1 overflow-auto rounded-xl border border-border bg-card px-4 py-3 prose prose-sm max-h-[200px] text-sm leading-relaxed text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            "dangerouslySetInnerHTML={{ __html: renderMarkdown(currentValue) || '<span class=\\"text-muted-foreground/50\\">Nothing to preview</span>' }}" />
        )}
      </div>
      <div className="flex items-center justify-end text-xs text-muted-foreground/60">{wordCount} {wordCount === 1 ? "word" : "words"}</div>
    </div>
  );
}`;

const DEFAULT_CONTENT = "**Bold text** and *italic text*.\n\n## Heading\n\n> A blockquote\n\n- List item 1\n- List item 2";

export default function RichTextEditorPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  return (
    <ComponentDocPage
      name="Rich Text Editor"
      category="Editor"
      description="Markdown-based rich text editor with formatting toolbar, live preview, split view, and word count."
    >
      <PreviewPanel filename="rich-text-editor-preview.tsx">
        <div className="w-full">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={RICH_TEXT_EDITOR_SOURCE}
        filename="components/ui/RichTextEditor/RichTextEditor.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Split view with toolbar, editor, and live preview."
          code={`import { RichTextEditor } from "@/components/ui/RichTextEditor";\n\n<RichTextEditor value={content} onChange={setContent} />`}
          filename="default.tsx"
        >
          <div className="w-full">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Edit Only"
          description="Single-pane editing without preview."
          code={`<RichTextEditor value={content} onChange={setContent} view="edit" />`}
          filename="edit-only.tsx"
        >
          <div className="w-full">
            <RichTextEditor value={content} onChange={setContent} view="edit" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Preview Only"
          description="Read-only rendered markdown preview."
          code={`<RichTextEditor value={content} view="preview" />`}
          filename="preview-only.tsx"
        >
          <div className="w-full">
            <RichTextEditor value={content} view="preview" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Placeholder"
          description="Placeholder text for empty editor."
          code={`<RichTextEditor placeholder="Write something amazing..." />`}
          filename="placeholder.tsx"
        >
          <div className="w-full">
            <RichTextEditor placeholder="Write something amazing..." />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive editor state."
          code={`<RichTextEditor value={content} disabled />`}
          filename="disabled.tsx"
        >
          <div className="w-full">
            <RichTextEditor value={content} disabled />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
