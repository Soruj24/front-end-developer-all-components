"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { writeClipboard } from "@/lib/clipboard";
import type { CopyPackage } from "../types/copy-package";

type Tab = "project" | "standalone" | "example";

/**
 * Option A (Copy Component: project + standalone) and Option B
 * (Copy Complete Example). Every button copies exactly the code shown.
 */
export function CopyPackageViewer({ pkg }: { pkg: CopyPackage }) {
  const [tab, setTab] = useState<Tab>("project");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const active =
    tab === "project"
      ? pkg.componentFile
      : tab === "standalone"
        ? pkg.standaloneFile
        : pkg.exampleFile;

  const handleCopy = async () => {
    const ok = await writeClipboard(active.code);
    setCopied(ok);
    setFailed(!ok);
    if (ok) window.setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = () => {
    const blob = new Blob([active.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = active.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "project", label: "Copy Component" },
    { id: "standalone", label: "Standalone (no alias)" },
    { id: "example", label: "Complete Example" },
  ];

  return (
    <section aria-label="Copy component package" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              tab === t.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {active.filename} · {active.code.split("\n").length} lines
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-[#0b0b10]">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">{active.filename}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : `Copy ${active.filename}`}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                copied ? "text-green-400" : failed ? "text-red-400" : "text-zinc-400 hover:text-white",
              )}
            >
              {copied ? "Copied" : failed ? "Failed" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              aria-label={`Download ${active.filename}`}
              className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Download
            </button>
          </div>
        </div>
        <pre className="max-h-[480px] overflow-auto p-4 text-[13px] leading-relaxed text-zinc-200">
          <code>{active.code}</code>
        </pre>
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {tab === "project" && "Project version — uses `@/lib/cn`. Add lib/cn.ts plus clsx + tailwind-merge."}
        {tab === "standalone" && "Standalone version — cn() is embedded. Only clsx + tailwind-merge to install."}
        {tab === "example" && "Minimal usage page that renders the preview above. Save next to the component file."}
        {copied && " Copied to clipboard."}
        {failed && " Copy failed — select the code manually."}
      </p>
    </section>
  );
}
