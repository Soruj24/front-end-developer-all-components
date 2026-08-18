"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Textarea, Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add rich-text-editor";

const usageCode = `import { RichTextEditor } from "@/components/ui";

export default function Example() {
  return <RichTextEditor onChange={(html) => console.log(html)} />;
}`;

const toolbarButtons = [
  { label: "B", title: "Bold", tag: "strong" },
  { label: "I", title: "Italic", tag: "em" },
  { label: "U", title: "Underline", tag: "u" },
  { label: "H1", title: "Heading", tag: "h1" },
  { label: "H2", title: "Heading 2", tag: "h2" },
  { label: "•", title: "List", tag: "ul" },
  { label: "1.", title: "Ordered List", tag: "ol" },
  { label: "\"", title: "Quote", tag: "blockquote" },
];

function renderPreview(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*\*/g, '<em>$1</em>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold">$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary pl-3 text-muted-foreground my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n/g, '<br/>');
}

export default function RichTextEditorPage() {
  const [content, setContent] = useState("**Bold text** and *italic text*.\n\n# Heading\n\n> A blockquote\n\n- List item 1\n- List item 2");
  const [view, setView] = useState<"edit" | "preview" | "split">("split");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Rich Text Editor</h1>
          <Badge variant="primary">Editor</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          WYSIWYG rich text editor with formatting toolbar, embed support, and markdown shortcuts.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Toolbar + Preview</h3>
          <ComponentPreview id="rich-text-editor-default">
            <div className="w-full">
              <div className="mb-2 flex gap-0.5 rounded-md border border-border p-1">
                {toolbarButtons.map((btn) => (
                  <button key={btn.label} className="h-7 w-7 rounded text-xs font-bold hover:bg-muted" title={btn.title}>{btn.label}</button>
                ))}
              </div>
              <div className="flex gap-3">
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px] font-mono text-sm flex-1" />
                <Card className="flex-1">
                  <CardContent className="p-3 prose prose-sm max-h-[200px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
                </Card>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">View Toggle</h3>
          <ComponentPreview id="rich-text-editor-toggle">
            <div className="w-full">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex gap-0.5 rounded border border-border p-0.5">
                  {(["edit", "preview", "split"] as const).map((v) => (
                    <button key={v} onClick={() => setView(v)} className={`rounded px-2 py-1 text-xs capitalize transition-colors ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{v}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {(view === "edit" || view === "split") && <Textarea value={content} onChange={(e) => setContent(e.target.value)} className={`${view === "split" ? "flex-1" : "w-full"} min-h-[180px] font-mono text-sm`} />}
                {(view === "preview" || view === "split") && <Card className={`${view === "split" ? "flex-1" : "w-full"}`}><CardContent className="p-3 prose prose-sm max-h-[180px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: renderPreview(content) }} /></Card>}
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="rich-text-editor-interactive">
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex gap-0.5 rounded border border-border p-0.5">
                    {toolbarButtons.slice(0, 4).map((btn) => (
                      <button key={btn.label} className="h-6 w-6 rounded text-xs font-bold hover:bg-muted" title={btn.title}>{btn.label}</button>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{content.split(/\s+/).length} words</span>
                </div>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[120px] font-mono text-sm mb-2" />
                <div className="rounded-lg bg-muted p-3 prose prose-sm" dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(html: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}