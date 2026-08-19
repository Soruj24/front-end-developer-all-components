export const COPYBUTTON_SOURCE = `"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  onCopy?: () => void;
  timeout?: number;
  className?: string;
}

export function CopyButton({ text, label = "Copy", onCopy, timeout = 2000, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), timeout);
  };

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Copied!" : label}
    </button>
  );
}`;

export const LABEL_EXAMPLE = `const [copied, setCopied] = useState(false);
const copy = () => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<button onClick={copy} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium">
  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
  {copied ? "Copied!" : "Copy"}
</button>`;

export const ICONS_EXAMPLE = `<button onClick={() => copy(v.text, i)} className="rounded-lg bg-muted p-2 hover:bg-muted/80">
  {copiedIdx === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
</button>`;

export const INLINE_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <code className="flex-1 font-mono text-xs">{item.command}</code>
  <button onClick={() => copy(item.command, i)} className="rounded-md bg-muted px-2 py-1 text-xs">
    {copiedIdx === i ? "Copied" : "Copy"}
  </button>
</div>`;

export const TOAST_EXAMPLE = `const copy = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  showToast(label + " copied to clipboard");
};

<button onClick={() => copy("john@example.com", "Email")}>
  <Mail className="h-4 w-4" />
  Copy Email
</button>`;

export const CODE_EXAMPLE = `const [copied, setCopied] = useState(false);
const copy = () => {
  navigator.clipboard.writeText(code);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<button onClick={copy}>
  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
  {copied ? "Copied!" : "Copy"}
</button>`;

export const SHARE_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
    <link.icon className="h-4 w-4 text-muted-foreground" />
  </div>
  <p className="text-xs font-medium">{link.label}</p>
  <button onClick={() => copy(link.url, i)}>
    {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    {copiedIdx === i ? "Copied" : "Copy"}
  </button>
</div>`;

export const JSON_EXAMPLE = `const copy = () => {
  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};`;
