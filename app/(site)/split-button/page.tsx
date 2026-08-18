"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronDown, Plus, Download, Share2, Settings, Copy, MoreHorizontal } from "lucide-react";

const installCommand = `npx shadcn@latest add split-button`;

const usageCode = `import { SplitButton } from "@/components/ui/split-button";

export function SplitButtonDemo() {
  return (
    <SplitButton
      label="Actions"
      items={[
        { label: "Save", onClick: () => {} },
        { label: "Export", onClick: () => {} },
      ]}
    />
  );
}`;

function ActionSplit() {
  const [selected, setSelected] = useState("Save");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        {selected}
      </button>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {["Save", "Save as", "Save copy"].map((item) => (
            <button
              key={item}
              onClick={() => { setSelected(item); setOpen(false); }}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmitSplit() {
  const [status, setStatus] = useState("idle");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStatus("submitted")}
          className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
        <button className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Status: <Badge variant={status === "submitted" ? "default" : "secondary"}>{status}</Badge>
      </p>
    </div>
  );
}

function CreateButton() {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setCreated(true); }}
          className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-1 h-4 w-4" />
          Create
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {["Document", "Folder", "Project"].map((item) => (
            <button
              key={item}
              onClick={() => { setOpen(false); setCreated(true); }}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            >
              <Plus className="mr-2 h-4 w-4" />
              {item}
            </button>
          ))}
        </div>
      )}
      {created && <Badge variant="outline">Item created</Badge>}
    </div>
  );
}

function ExportSplit() {
  const [format, setFormat] = useState("PDF");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download className="mr-1 h-4 w-4" />
          Export as {format}
        </button>
        <button className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-1">
        {["PDF", "CSV", "PNG", "SVG"].map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`rounded px-2 py-1 text-xs ${
              format === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

function ShareSplit() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => { navigator.clipboard.writeText("https://example.com/shared"); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </button>
        <button className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      {copied && <Badge variant="outline">Link copied!</Badge>}
    </div>
  );
}

function CopySplit() {
  const [lastCopied, setLastCopied] = useState("");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => { navigator.clipboard.writeText("Selected content"); setLastCopied("content"); }}
          className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Copy className="mr-1 h-4 w-4" />
          Copy
        </button>
        <button className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-1">
        {["content", "link", "embed"].map((item) => (
          <button
            key={item}
            onClick={() => { navigator.clipboard.writeText(item); setLastCopied(item); }}
            className="rounded px-2 py-1 text-xs bg-muted hover:bg-muted/80"
          >
            Copy {item}
          </button>
        ))}
      </div>
      {lastCopied && <span className="text-xs text-muted-foreground">Last copied: {lastCopied}</span>}
    </div>
  );
}

function MoreOptions() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center justify-center rounded-l-md border border-r-0 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Settings className="mr-1 h-4 w-4" />
          Options
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-r-md border bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {["Edit", "Duplicate", "Delete"].map((item) => (
            <button
              key={item}
              onClick={() => { setAction(item); setOpen(false); }}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {action && <Badge variant="outline">Action: {action}</Badge>}
    </div>
  );
}

export default function SplitButtonPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <ChevronDown className="mr-2 inline h-8 w-8" />
          Split Button
        </h1>
        <p className="text-lg text-muted-foreground">
          A button with a split dropdown for related actions and options.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Action Split</h3>
          <ComponentPreview>
            <ActionSplit />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Submit Split</h3>
          <ComponentPreview>
            <SubmitSplit />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Create Button</h3>
          <ComponentPreview>
            <CreateButton />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Export Split</h3>
          <ComponentPreview>
            <ExportSplit />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Share Split</h3>
          <ComponentPreview>
            <ShareSplit />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Copy Split</h3>
          <ComponentPreview>
            <CopySplit />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">More Options</h3>
          <ComponentPreview>
            <MoreOptions />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">label</td>
                <td className="p-3">string</td>
                <td className="p-3">required</td>
                <td className="p-3">Button label text</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">items</td>
                <td className="p-3">SplitButtonItem[]</td>
                <td className="p-3">required</td>
                <td className="p-3">Dropdown menu items</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">variant</td>
                <td className="p-3">"default" | "outline" | "ghost"</td>
                <td className="p-3">"default"</td>
                <td className="p-3">Button variant</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3">"sm" | "md" | "lg"</td>
                <td className="p-3">"md"</td>
                <td className="p-3">Button size</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">disabled</td>
                <td className="p-3">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Disable the button</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">icon</td>
                <td className="p-3">ReactNode</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Icon before the label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
