"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Copy, Check, Clipboard, ClipboardCheck } from "lucide-react";

const installCommand = `npx component-library@latest add copy-button`;
const usageCode = `import { CopyButton } from "@/components/copy-button";

<CopyButton text="Hello World" label="Copy" />`;

function CopyButtonDemo() {
  const [copied, setCopied] = useState(false);
  const text = "npm install @mylib/core";

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
    >
      {copied ? <ClipboardCheck className="h-4 w-4 text-emerald-500" /> : <Clipboard className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy command"}
    </button>
  );
}

function CopyIconDemo() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("text-to-copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3">
      <button onClick={copy} className="rounded-md bg-muted p-2 hover:bg-muted/80 transition-colors">
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </button>
      <button onClick={copy} className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <button onClick={copy} className="rounded-md border border-dashed p-2 hover:bg-muted transition-colors">
        {copied ? <ClipboardCheck className="h-4 w-4 text-emerald-500" /> : <Clipboard className="h-4 w-4" />}
      </button>
    </div>
  );
}

function InlineCopyDemo() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const items = [
    { label: "npm", command: "npm install pkg" },
    { label: "yarn", command: "yarn add pkg" },
    { label: "pnpm", command: "pnpm add pkg" },
  ];

  const copy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
          <span className="text-xs font-semibold text-muted-foreground w-10">{item.label}</span>
          <code className="flex-1 font-mono text-xs">{item.command}</code>
          <button onClick={() => copy(item.command, i)} className="rounded p-1 hover:bg-muted">
            {copiedIdx === i ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
          </button>
        </div>
      ))}
    </div>
  );
}

function ToastCopyDemo() {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("clipboard-content");
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={copy} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Copy to Clipboard
      </button>
      {toast && (
        <div className="animate-in slide-in-from-bottom-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default function CopyButtonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Copy Button</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Clipboard copy buttons with success feedback, inline copy, icon variants, and toast notifications.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Label Button</h2>
        <ComponentPreview>
          <CopyButtonDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Variants</h2>
        <ComponentPreview>
          <CopyIconDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Copy Commands</h2>
        <ComponentPreview>
          <InlineCopyDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Toast Feedback</h2>
        <ComponentPreview>
          <ToastCopyDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">text</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"Copy"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
