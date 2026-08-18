"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Paperclip } from "lucide-react";

const installCommand = `npx component-library@latest add paperclip-attach`;
const usageCode = `import { PaperclipAttach } from "@/components/paperclip-attach";

<PaperclipAttach
  onFileSelect={(files) => handleFiles(files)}
  accept=".pdf,.doc,.png"
/>`;

export default function PaperclipAttachPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Paperclip Attach</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A file attachment component with a paperclip metaphor for uploading and managing file attachments in forms.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Upload</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2 rounded-lg border border-dashed p-4 hover:bg-muted/50 cursor-pointer">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Attach a file</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Attached Files</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {["design-spec.pdf", "screenshot.png"].map((file) => (
              <div key={file} className="flex items-center gap-2 rounded-lg border p-2">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{file}</span>
                <button className="text-xs text-muted-foreground hover:text-foreground">x</button>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-lg border border-dashed p-3 hover:bg-muted/50 cursor-pointer">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add more</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">In Message Box</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-3">
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-md border bg-background p-2">
                <p className="text-sm text-muted-foreground">Type a message...</p>
              </div>
              <button className="rounded-md p-2 hover:bg-muted">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onFileSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(files: File[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">accept</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"*"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">multiple</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
