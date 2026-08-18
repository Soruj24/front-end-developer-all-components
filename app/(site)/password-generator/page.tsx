"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Copy, Check, RefreshCw, Shield, Lock, KeyRound } from "lucide-react";

const installCommand = `npx component-library@latest add password-generator`;

const usageCode = `import { PasswordGenerator } from "@/components/ui";

<PasswordGenerator
  length={16}
  includeUppercase
  includeNumbers
  includeSymbols
/>`;

function generatePassword(length: number, options: { uppercase: boolean; numbers: boolean; symbols: boolean }) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let chars = lower;
  if (options.uppercase) chars += upper;
  if (options.numbers) chars += nums;
  if (options.symbols) chars += syms;
  let pw = "";
  for (let i = 0; i < length; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500" };
  if (score <= 4) return { label: "Medium", color: "bg-yellow-500" };
  return { label: "Strong", color: "bg-green-500" };
}

function BasicGeneratorDemo() {
  const [pw, setPw] = useState(() => generatePassword(12, { uppercase: true, numbers: true, symbols: false }));
  const [copied, setCopied] = useState(false);
  const strength = getStrength(pw);

  const copy = async () => {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
        <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
        <code className="flex-1 font-mono text-sm">{pw}</code>
        <button onClick={copy} className="rounded-md p-1.5 hover:bg-muted">
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
        </button>
        <button onClick={() => setPw(generatePassword(12, { uppercase: true, numbers: true, symbols: false }))}
          className="rounded-md p-1.5 hover:bg-muted">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div className={`h-full ${strength.color}`} style={{ width: `${(getStrength(pw).label === "Strong" ? 100 : getStrength(pw).label === "Medium" ? 60 : 30)}%` }} />
        </div>
        <span className="text-xs font-medium">{strength.label}</span>
      </div>
    </div>
  );
}

function CustomOptionsDemo() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ uppercase: true, numbers: true, symbols: true });
  const [pw, setPw] = useState(() => generatePassword(16, { uppercase: true, numbers: true, symbols: true }));
  const [copied, setCopied] = useState(false);

  const regenerate = () => setPw(generatePassword(length, opts));

  const copy = async () => {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle = (key: keyof typeof opts) => {
    const next = { ...opts, [key]: !opts[key] };
    setOpts(next);
    setPw(generatePassword(length, next));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
        <code className="flex-1 font-mono text-sm break-all">{pw}</code>
        <button onClick={copy} className="rounded-md p-1.5 hover:bg-muted shrink-0">
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
        </button>
        <button onClick={regenerate} className="rounded-md p-1.5 hover:bg-muted shrink-0">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm">Length: {length}</label>
          <input type="range" min={8} max={64} value={length}
            onChange={(e) => { setLength(Number(e.target.value)); setPw(generatePassword(Number(e.target.value), opts)); }}
            className="w-32" />
        </div>
        {(["uppercase", "numbers", "symbols"] as const).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={opts[k]} onChange={() => toggle(k)} className="rounded" />
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

function CopyToClipboardDemo() {
  const [pw] = useState(() => generatePassword(20, { uppercase: true, numbers: true, symbols: true }));
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted p-6 text-center space-y-4">
        <Shield className="mx-auto h-10 w-10 text-primary" />
        <code className="block font-mono text-lg tracking-wider">{pw}</code>
        <button onClick={copy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}

export default function PasswordGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Password Generator</h1>
          <Badge variant="primary">Utilities</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Generate secure random passwords with customizable length, character sets, and one-click copy to clipboard.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Generator</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple password with strength indicator.</p>
        </div>
        <ComponentPreview id="pwgen-basic">
          <BasicGeneratorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Options</h2>
          <p className="mt-1 text-sm text-muted-foreground">Adjust length and character set options.</p>
        </div>
        <ComponentPreview id="pwgen-custom">
          <CustomOptionsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Copy to Clipboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">One-click copy with visual feedback.</p>
        </div>
        <ComponentPreview id="pwgen-copy">
          <CopyToClipboardDemo />
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
                <td className="px-4 py-3 font-mono text-xs">length</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">12</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">includeUppercase</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">includeNumbers</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">includeSymbols</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onGenerate</td>
                <td className="px-4 py-3 text-muted-foreground">(password: string) =&gt; void</td>
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
