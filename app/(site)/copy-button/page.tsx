"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Copy,
  Check,
  Clipboard,
  ClipboardCheck,
  Share2,
  Link,
  Mail,
  Phone,
  ExternalLink,
  QrCode,
  Download,
  FileCode,
  Terminal,
} from "lucide-react";

const installCommand = `npx component-library@latest add copy-button`;
const usageCode = `import { CopyButton } from "@/components/copy-button";

<CopyButton text="Hello World" label="Copy" />`;

function LabelButtonDemo() {
  const [copied, setCopied] = useState(false);
  const text = "npm install @mylib/core";

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copy}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            copied
              ? "bg-emerald-500 text-white"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={copy}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
            copied
              ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "border-black/[.08] hover:bg-muted dark:border-white/[.145]"
          }`}
        >
          {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Command"}
        </button>
        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
      <div className="rounded-lg bg-muted/50 px-3 py-2">
        <code className="font-mono text-xs text-muted-foreground">{text}</code>
      </div>
    </div>
  );
}

function IconVariantsDemo() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const variants = [
    { text: "Default icon", icon: Copy, filledIcon: Check, style: "rounded-lg bg-muted p-2 hover:bg-muted/80" },
    { text: "Circle icon", icon: Copy, filledIcon: Check, style: "rounded-full bg-foreground p-2 text-background" },
    { text: "Border icon", icon: Clipboard, filledIcon: ClipboardCheck, style: "rounded-lg border border-dashed p-2 hover:bg-muted" },
    { text: "Ghost icon", icon: Copy, filledIcon: Check, style: "rounded-lg p-2 hover:bg-muted text-muted-foreground" },
    { text: "Square icon", icon: Copy, filledIcon: Check, style: "rounded-md bg-muted p-2.5 hover:bg-muted/80" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((v, i) => (
        <button
          key={i}
          onClick={() => copy(v.text, i)}
          className={`transition-colors ${v.style}`}
        >
          {copiedIdx === i ? (
            <v.filledIcon className="h-4 w-4 text-emerald-500" />
          ) : (
            <v.icon className="h-4 w-4" />
          )}
        </button>
      ))}
    </div>
  );
}

function InlineCopyDemo() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const items = [
    { label: "npm", command: "npm install @mylib/core", color: "text-red-500" },
    { label: "yarn", command: "yarn add @mylib/core", color: "text-blue-500" },
    { label: "pnpm", command: "pnpm add @mylib/core", color: "text-yellow-500" },
    { label: "bun", command: "bun add @mylib/core", color: "text-pink-500" },
  ];

  const copy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-semibold">Installation</span>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
            <span className={`w-10 text-xs font-bold ${item.color}`}>{item.label}</span>
            <code className="flex-1 font-mono text-xs text-foreground">{item.command}</code>
            <button
              onClick={() => copy(item.command, i)}
              className={`flex h-7 items-center gap-1 rounded-md px-2 text-[10px] font-medium transition-colors ${
                copiedIdx === i
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedIdx === i ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToastCopyDemo() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((toast) => toast.id !== id)), 2500);
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => copy("john@example.com", "Email")}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Copy Email
        </button>
        <button
          onClick={() => copy("+1 (555) 123-4567", "Phone")}
          className="flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2 text-sm font-medium hover:bg-muted transition-colors dark:border-white/[.145]"
        >
          <Phone className="h-4 w-4" />
          Copy Phone
        </button>
        <button
          onClick={() => copy("https://example.com/share/abc123", "Link")}
          className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Link className="h-4 w-4" />
          Copy Link
        </button>
      </div>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm text-background shadow-lg animate-in slide-in-from-bottom-2"
          >
            <Check className="h-4 w-4 text-emerald-400" />
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlockCopyDemo() {
  const [copied, setCopied] = useState(false);
  const code = `import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}`;

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-[#0d1117] overflow-hidden shadow-lg dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs text-white/50">page.tsx</span>
        </div>
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
            copied
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-[12px] leading-5 text-white/70">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function ShareLinkDemo() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const links = [
    { label: "Share URL", url: "https://myapp.com/dashboard?ref=share", icon: Link },
    { label: "Embed Code", url: '<iframe src="https://myapp.com/embed" />', icon: FileCode },
    { label: "QR Code URL", url: "https://api.qrserver.com/v1/create-qr-code/?data=myapp.com", icon: QrCode },
  ];

  const copy = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span className="text-sm font-semibold">Share</span>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <link.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">{link.label}</p>
              <p className="truncate text-[10px] text-muted-foreground font-mono">{link.url}</p>
            </div>
            <button
              onClick={() => copy(link.url, i)}
              className={`flex h-7 items-center gap-1 rounded-md px-2 text-[10px] font-medium transition-colors ${
                copiedIdx === i
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedIdx === i ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyJSONDemo() {
  const [copied, setCopied] = useState(false);
  const data = {
    name: "Button",
    version: "1.0.0",
    props: {
      variant: ["primary", "secondary", "outline", "ghost"],
      size: ["sm", "md", "lg"],
      disabled: "boolean",
    },
    examples: [
      '<Button variant="primary">Click</Button>',
      '<Button size="lg" disabled>Loading</Button>',
    ],
  };

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-[#0d1117] overflow-hidden shadow-lg dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">component.json</span>
        </div>
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
            copied
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-[12px] leading-5 text-white/70">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default function CopyButtonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Copy Button
          </h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Clipboard copy buttons with success feedback, inline copy, icon variants, and toast
          notifications.
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
          <h3 className="text-lg font-medium text-foreground">Label Button</h3>
          <p className="text-sm text-muted-foreground">
            Buttons with text labels and different styles.
          </p>
          <ComponentPreview id="copy-label">
            <LabelButtonDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Icon Variants</h3>
          <p className="text-sm text-muted-foreground">
            Icon-only copy buttons in different styles.
          </p>
          <ComponentPreview id="copy-icons">
            <IconVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Package Manager Commands</h3>
          <p className="text-sm text-muted-foreground">
            Inline copy buttons for package manager installation commands.
          </p>
          <ComponentPreview id="copy-inline">
            <InlineCopyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Toast Feedback</h3>
          <p className="text-sm text-muted-foreground">
            Toast notifications on copy with email, phone, and link options.
          </p>
          <ComponentPreview id="copy-toast">
            <ToastCopyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Code Block Copy</h3>
          <p className="text-sm text-muted-foreground">
            Copy button integrated in a code block with syntax display.
          </p>
          <ComponentPreview id="copy-code">
            <CodeBlockCopyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Share Links</h3>
          <p className="text-sm text-muted-foreground">
            Copy share URLs, embed codes, and QR code links.
          </p>
          <ComponentPreview id="copy-share">
            <ShareLinkDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Copy JSON</h3>
          <p className="text-sm text-muted-foreground">
            Copy formatted JSON data to clipboard.
          </p>
          <ComponentPreview id="copy-json">
            <CopyJSONDemo />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">text</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"Copy\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onCopy</td>
                <td className="px-4 py-3 text-muted-foreground">{"() => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">timeout</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
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
