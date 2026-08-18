"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Download, Check, ArrowDown, FileDown } from "lucide-react";

const installCommand = `npx component-library@latest add download-button`;
const usageCode = `import { DownloadButton } from "@/components/download-button";

<DownloadButton
  url="/file.pdf"
  filename="report.pdf"
  label="Download Report"
/>`;

function DownloadBtnDemo({ label = "Download", variant = "primary" }: { label?: string; variant?: string }) {
  const [state, setState] = useState<"idle" | "downloading" | "done">("idle");

  const download = () => {
    setState("downloading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 2000); }, 1500);
  };

  return (
    <button
      onClick={download}
      disabled={state === "downloading"}
      className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
        state === "done" ? "bg-emerald-500 text-white" : state === "downloading" ? "bg-primary/50 text-primary-foreground" : variant === "outline" ? "border border-primary text-primary hover:bg-primary/10" : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
    >
      {state === "done" ? <Check className="h-4 w-4" /> : state === "downloading" ? <Download className="h-4 w-4 animate-bounce" /> : <ArrowDown className="h-4 w-4" />}
      {state === "done" ? "Downloaded!" : state === "downloading" ? "Downloading..." : label}
    </button>
  );
}

function FileCardDemo() {
  const files = [
    { name: "report.pdf", size: "2.4 MB", type: "PDF" },
    { name: "data.xlsx", size: "1.1 MB", type: "Excel" },
    { name: "image.png", size: "5.2 MB", type: "Image" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {files.map((f) => (
        <div key={f.name} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
          <FileDown className="h-5 w-5 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{f.name}</p>
            <p className="text-[10px] text-muted-foreground">{f.type} · {f.size}</p>
          </div>
          <DownloadBtnDemo label="Get" />
        </div>
      ))}
    </div>
  );
}

function ProgressDownloadDemo() {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const start = () => {
    setProgress(0);
    setDownloading(true);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setDownloading(false); return 100; }
        return p + 2;
      });
    }, 60);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{progress}% complete</span>
        <button onClick={start} disabled={downloading} className="text-xs text-primary font-medium hover:underline">
          {downloading ? "Downloading..." : progress === 100 ? "Done" : "Start"}
        </button>
      </div>
    </div>
  );
}

function IconDownloadDemo() {
  return (
    <div className="flex gap-3">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"><Download className="h-4 w-4" /></button>
      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-muted/80"><ArrowDown className="h-4 w-4" /></button>
      <button className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed hover:bg-muted"><FileDown className="h-4 w-4" /></button>
    </div>
  );
}

export default function DownloadButtonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Download Button</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Download buttons with progress states, file cards, icon variants, and animated feedback for file downloads.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Download States</h2>
        <ComponentPreview>
          <div className="flex gap-3">
            <DownloadBtnDemo />
            <DownloadBtnDemo variant="outline" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">File Cards</h2>
        <ComponentPreview>
          <FileCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress Bar</h2>
        <ComponentPreview>
          <ProgressDownloadDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Buttons</h2>
        <ComponentPreview>
          <IconDownloadDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">url</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">filename</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"Download"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
