"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Download,
  Check,
  ArrowDown,
  FileDown,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileCode,
  File,
  CreditCard,
  Receipt,
  Package,
  Cloud,
  Loader2,
} from "lucide-react";

const installCommand = `npx component-library@latest add download-button`;
const usageCode = `import { DownloadButton } from "@/components/download-button";

<DownloadButton
  url="/file.pdf"
  filename="report.pdf"
  label="Download Report"
/>`;

function DownloadButton({
  label = "Download",
  variant = "primary",
  size = "md",
  icon: Icon = Download,
  onDownload,
}: {
  label?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: typeof Download;
  onDownload?: () => void;
}) {
  const [state, setState] = useState<"idle" | "downloading" | "done">("idle");

  const handleClick = () => {
    setState("downloading");
    setTimeout(() => {
      setState("done");
      onDownload?.();
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
    outline: "border border-black/[.08] hover:bg-muted dark:border-white/[.145]",
    ghost: "hover:bg-muted",
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === "downloading"}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all disabled:opacity-70 ${
        sizeClasses[size]
      } ${
        state === "done"
          ? "bg-emerald-500 text-white"
          : variantClasses[variant]
      }`}
    >
      {state === "done" ? (
        <Check className="h-4 w-4" />
      ) : state === "downloading" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {state === "done" ? "Downloaded!" : state === "downloading" ? "Downloading..." : label}
    </button>
  );
}

function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DownloadButton label="Primary" variant="primary" />
      <DownloadButton label="Outline" variant="outline" />
      <DownloadButton label="Ghost" variant="ghost" />
    </div>
  );
}

function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DownloadButton label="Small" size="sm" />
      <DownloadButton label="Medium" size="md" />
      <DownloadButton label="Large" size="lg" />
    </div>
  );
}

function FileCardsDemo() {
  const files = [
    { name: "Invoice-2024-001.pdf", size: "245 KB", type: "PDF", icon: FileText, color: "text-red-500" },
    { name: "Q4-Report.xlsx", size: "1.2 MB", type: "Excel", icon: FileSpreadsheet, color: "text-emerald-500" },
    { name: "Screenshot.png", size: "3.4 MB", type: "Image", icon: FileImage, color: "text-blue-500" },
    { name: "source-code.zip", size: "8.7 MB", type: "Archive", icon: FileCode, color: "text-purple-500" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Recent Files</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-3 px-4 py-3">
              <f.icon className={`h-5 w-5 ${f.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className="text-[10px] text-muted-foreground">{f.type} · {f.size}</p>
              </div>
              <DownloadButton label="Get" size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressDownloadDemo() {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [filename, setFilename] = useState("");

  const start = (name: string) => {
    setFilename(name);
    setProgress(0);
    setDownloading(true);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setDownloading(false);
          return 100;
        }
        return p + Math.random() * 8;
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Download Progress</h3>
          {downloading && <span className="text-[10px] text-muted-foreground">{filename}</span>}
        </div>

        {downloading || progress > 0 ? (
          <div className="space-y-3">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-200"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {downloading ? "Downloading..." : progress >= 100 ? "Complete" : "Paused"}
              </span>
              <span className="text-xs font-bold tabular-nums">{Math.min(100, Math.round(progress))}%</span>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => start("report.pdf")}
              className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Download Report
            </button>
            <button
              onClick={() => start("data.csv")}
              className="flex-1 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
            >
              Export CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InvoiceDownloadDemo() {
  const invoices = [
    { id: "INV-2024-001", date: "Jan 15, 2024", amount: "$1,200.00", status: "Paid" },
    { id: "INV-2024-002", date: "Feb 28, 2024", amount: "$850.00", status: "Paid" },
    { id: "INV-2024-003", date: "Mar 10, 2024", amount: "$2,300.00", status: "Pending" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Invoices</h3>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[.06] dark:border-white/[.1]">
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Invoice</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-2.5 text-right text-[10px] font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="px-4 py-3 text-xs font-mono font-medium">{inv.id}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                <td className="px-4 py-3 text-xs font-bold">{inv.amount}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <DownloadButton label="PDF" size="sm" icon={FileText} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExportDataDemo() {
  const [format, setFormat] = useState<"csv" | "json" | "xlsx">("csv");

  const formats = [
    { id: "csv" as const, label: "CSV", desc: "Comma-separated values", icon: FileSpreadsheet },
    { id: "json" as const, label: "JSON", desc: "JavaScript Object Notation", icon: FileCode },
    { id: "xlsx" as const, label: "Excel", desc: "Microsoft Excel format", icon: File },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Export Data</h3>
        <div className="mb-4 space-y-2">
          {formats.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                format === f.id
                  ? "border-foreground bg-foreground/5 shadow-sm"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <f.icon className={`h-5 w-5 ${format === f.id ? "text-foreground" : "text-muted-foreground"}`} />
              <div>
                <p className="text-sm font-medium">{f.label}</p>
                <p className="text-[10px] text-muted-foreground">{f.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <DownloadButton label={`Export as ${format.toUpperCase()}`} size="lg" icon={Cloud} />
      </div>
    </div>
  );
}

function DocumentLibraryDemo() {
  const docs = [
    { name: "Getting Started Guide", type: "PDF", pages: 24, icon: FileText, color: "text-red-500", size: "1.2 MB" },
    { name: "API Documentation", type: "HTML", pages: 0, icon: FileCode, color: "text-blue-500", size: "856 KB" },
    { name: "Brand Assets", type: "ZIP", pages: 0, icon: Package, color: "text-purple-500", size: "12.4 MB" },
    { name: "Release Notes", type: "PDF", pages: 8, icon: FileText, color: "text-red-500", size: "342 KB" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Documentation</h3>
            <span className="text-[10px] text-muted-foreground">{docs.length} files</span>
          </div>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center gap-3 px-4 py-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${doc.color}`}>
                <doc.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {doc.type} · {doc.size}
                  {doc.pages > 0 && ` · ${doc.pages} pages`}
                </p>
              </div>
              <DownloadButton label="Download" size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DownloadButtonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Download Button
          </h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Download buttons with progress states, file cards, icon variants, and animated
          feedback for file downloads.
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
          <h3 className="text-lg font-medium text-foreground">Button Variants</h3>
          <p className="text-sm text-muted-foreground">
            Primary, outline, and ghost button styles.
          </p>
          <ComponentPreview id="dl-variants">
            <ButtonVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Button Sizes</h3>
          <p className="text-sm text-muted-foreground">
            Small, medium, and large size options.
          </p>
          <ComponentPreview id="dl-sizes">
            <ButtonSizesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">File Cards</h3>
          <p className="text-sm text-muted-foreground">
            File list with type icons and download buttons.
          </p>
          <ComponentPreview id="dl-files">
            <FileCardsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Progress Download</h3>
          <p className="text-sm text-muted-foreground">
            Download with animated progress bar.
          </p>
          <ComponentPreview id="dl-progress">
            <ProgressDownloadDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Invoice Download</h3>
          <p className="text-sm text-muted-foreground">
            Table row download actions for billing.
          </p>
          <ComponentPreview id="dl-invoice">
            <InvoiceDownloadDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Export Data</h3>
          <p className="text-sm text-muted-foreground">
            Format selector with export button.
          </p>
          <ComponentPreview id="dl-export">
            <ExportDataDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Document Library</h3>
          <p className="text-sm text-muted-foreground">
            Documentation files with metadata and download.
          </p>
          <ComponentPreview id="dl-library">
            <DocumentLibraryDemo />
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
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"Download\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\" | \"outline\" | \"ghost\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">LucideIcon</td>
                <td className="px-4 py-3 text-muted-foreground">Download</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onDownload</td>
                <td className="px-4 py-3 text-muted-foreground">{"() => void"}</td>
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
