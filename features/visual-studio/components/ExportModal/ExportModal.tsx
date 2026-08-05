"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { ExportTab } from "../../types/studio";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ExportModal({ open, onClose }: Props) {
  const { generatedCode, generatedTailwind, generatedTypes, generatedDocs, copyCodeToClipboard, downloadComponent } = useStudio();
  const [tab, setTab] = useState<ExportTab>("code");
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!open) return null;

  const handleCopy = async () => {
    await copyCodeToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyField = async (content: string, field: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadTypes = () => {
    const blob = new Blob([generatedTypes], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DesignedComponent.types.ts";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocs = () => {
    const blob = new Blob([generatedDocs], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DesignedComponent.docs.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Export Component</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="flex border-b border-border">
          {(["code", "download", "share"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium transition-colors capitalize",
                tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "code" ? "Copy Code" : t === "download" ? "Download" : "Share & Install"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "code" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-foreground">React Component (TSX)</label>
                  <button onClick={() => handleCopyField(generatedCode, "code")} className="text-[10px] text-primary hover:underline">
                    {copiedField === "code" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="relative max-h-48 overflow-auto rounded-lg border border-border bg-[#1e1e1e] p-4">
                  <pre className="text-[12px] leading-relaxed text-[#d4d4d8]">{generatedCode}</pre>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-foreground">TypeScript Types</label>
                  <button onClick={() => handleCopyField(generatedTypes, "types")} className="text-[10px] text-primary hover:underline">
                    {copiedField === "types" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="relative max-h-32 overflow-auto rounded-lg border border-border bg-[#1e1e1e] p-4">
                  <pre className="text-[11px] leading-relaxed text-[#d4d4d8]">{generatedTypes}</pre>
                </div>
              </div>
              <button onClick={handleCopy} className={cn("w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors", copied ? "bg-success/10 text-success border border-success/20" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
                {copied ? "✓ Copied to Clipboard" : "Copy Full Component Code"}
              </button>
            </div>
          )}

          {tab === "download" && (
            <div className="space-y-3">
              <button onClick={downloadComponent} className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">TSX</div>
                <div>
                  <div className="text-sm font-medium text-foreground">DesignedComponent.tsx</div>
                  <div className="text-xs text-muted-foreground">React + TypeScript component file</div>
                </div>
              </button>
              <button onClick={handleDownloadTypes} className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">TS</div>
                <div>
                  <div className="text-sm font-medium text-foreground">DesignedComponent.types.ts</div>
                  <div className="text-xs text-muted-foreground">TypeScript type definitions</div>
                </div>
              </button>
              <button onClick={() => { const b = new Blob([generatedTailwind], { type: "text/plain" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "tailwind-classes.txt"; a.click(); URL.revokeObjectURL(u); }} className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">TW</div>
                <div>
                  <div className="text-sm font-medium text-foreground">tailwind-classes.txt</div>
                  <div className="text-xs text-muted-foreground">All generated Tailwind utility classes</div>
                </div>
              </button>
              <button onClick={handleDownloadDocs} className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">MD</div>
                <div>
                  <div className="text-sm font-medium text-foreground">DesignedComponent.docs.md</div>
                  <div className="text-xs text-muted-foreground">Component documentation</div>
                </div>
              </button>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="text-xs text-muted-foreground">
                  Download includes the component file with all Tailwind classes inlined. Copy the file into your project and import it.
                </div>
              </div>
            </div>
          )}

          {tab === "share" && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-foreground">CLI Install Command</label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-3">
                  <code className="flex-1 text-xs text-foreground">npx create-component@latest DesignedComponent.tsx</code>
                  <button onClick={() => handleCopyField("npx create-component@latest DesignedComponent.tsx", "cli")} className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/20">
                    {copiedField === "cli" ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-foreground">Registry JSON</label>
                <div className="max-h-32 overflow-auto rounded-lg border border-border bg-[#1e1e1e] p-3">
                  <pre className="text-[11px] text-[#d4d4d8]">{JSON.stringify({
                    name: "DesignedComponent",
                    type: "component",
                    files: [{ path: "DesignedComponent.tsx", content: generatedCode.slice(0, 200) + "..." }],
                  }, null, 2)}</pre>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-foreground">Share URL</label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-3">
                  <code className="flex-1 text-xs text-foreground truncate">https://studio.example.com/share/abc123</code>
                  <button onClick={() => handleCopyField("https://studio.example.com/share/abc123", "url")} className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/20">
                    {copiedField === "url" ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-xs text-muted-foreground">
                Share this component with your team or publish it to the component registry for others to install.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
