"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button, Textarea } from "@/components/ui";

const installCommand = "npx component-library@latest add markdown-editor";

const usageCode = `import { MarkdownEditor } from "@/components/ui";

export default function Example() {
  return <MarkdownEditor onChange={(md) => console.log(md)} />;
}`;

export default function MarkdownEditorPage() {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n> A blockquote");
  const [preview, setPreview] = useState(true);

  const renderMd = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary pl-3 text-muted-foreground my-2">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Markdown Editor</h1>
          <Badge variant="primary">Editor</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Rich markdown editor with live preview, syntax highlighting, and toolbar shortcuts.
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
          <h3 className="text-lg font-medium text-foreground">Split View</h3>
          <ComponentPreview id="markdown-editor-default">
            <div className="flex w-full gap-3">
              <Textarea value={md} onChange={(e) => setMd(e.target.value)} className="min-h-[200px] font-mono text-sm" />
              <div className="flex-1 rounded-lg border border-border p-3 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderMd(md) }} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Toolbar</h3>
          <ComponentPreview id="markdown-editor-toolbar">
            <div className="w-full">
              <div className="mb-2 flex gap-1 border border-border rounded-md p-1">
                {["B", "I", "U", "H1", "H2", "Link", "Image", "List"].map((btn) => (
                  <Button key={btn} variant="ghost" size="sm" className="h-7 text-xs font-bold">{btn}</Button>
                ))}
              </div>
              <div className="flex gap-3">
                <Textarea value={md} onChange={(e) => setMd(e.target.value)} className="min-h-[150px] font-mono text-xs flex-1" />
                <Card className="flex-1">
                  <CardContent className="p-3 prose prose-xs max-h-[150px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: renderMd(md) }} />
                </Card>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="markdown-editor-interactive">
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant={preview ? "default" : "outline"} size="sm" onClick={() => setPreview(true)}>Split</Button>
                  <Button variant={!preview ? "default" : "outline"} size="sm" onClick={() => setPreview(false)}>Edit</Button>
                </div>
                <span className="text-xs text-muted-foreground">{md.split(/\s+/).length} words</span>
              </div>
              <div className={`flex gap-3 ${!preview ? "" : ""}`}>
                <Textarea value={md} onChange={(e) => setMd(e.target.value)} className={`font-mono text-sm ${preview ? "flex-1 min-h-[200px]" : "w-full min-h-[300px]"}`} />
                {preview && <Card className="flex-1"><CardContent className="p-3 prose prose-sm max-h-[300px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: renderMd(md) }} /></Card>}
              </div>
            </div>
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
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
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