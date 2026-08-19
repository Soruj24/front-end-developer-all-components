"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Check, Download, Loader2, Receipt, FileText, FileSpreadsheet, FileImage, FileCode, Package, Cloud } from "lucide-react";

const downloadButtonSource = "import { useState } from \"react\";\nimport { DownloadButton } from \"@/components/download-button\";\n<DownloadButton url=\"/file.pdf\" filename=\"report.pdf\" label=\"Download Report\" />";

function DownloadButton({label = "Download",variant = "primary",size = "md",icon:Icon = Download,onDownload}) {
  const [state,setState] = useState<"idle"|"downloading"|"done">("idle");
  const handleClick = () => {
    setState("downloading");
    setTimeout(() => {
      setState("done");
      onDownload?.();
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };
  const sizeClasses = {sm:"px-3 py-1.5 text-xs gap-1.5",md:"px-4 py-2 text-sm gap-2",lg:"px-6 py-3 text-base gap-2.5"};
  const variantClasses = {primary:"bg-foreground text-background hover:bg-foreground/90 shadow-sm",outline:"border border-black/[.08] hover:bg-muted dark:border-white/[.145]",ghost:"hover:bg-muted"};
  const sizeClassValue = sizeClasses[size];
  const isDone = state === "done";
  const isDownloading = state === "downloading";
  const variantClassValue = isDone ? "bg-emerald-500 text-white" : variantClasses[variant];
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all disabled:opacity-70";
  const fullClassName = baseClasses + " " + sizeClassValue + " " + variantClassValue;
  return (
    <button onClick={handleClick} disabled={isDownloading} className={fullClassName}>
      {isDone ? <Check className="h-4 w-4"/> : isDownloading ? <Loader2 className="h-4 w-4 animate-spin"/> : null}
    </button>
  );
}

function ButtonVariantsDemo() {
  const btns = [];
  btns.push(<DownloadButton label="Primary" variant="primary" key="primary"/>);
  btns.push(<DownloadButton label="Outline" variant="outline" key="outline"/>);
  btns.push(<DownloadButton label="Ghost" variant="ghost" key="ghost"/>);
  return <div className="flex flex-wrap items-center gap-3">{btns}</div>;
}

function ButtonSizesDemo() {
  const btns = [];
  btns.push(<DownloadButton label="Small" size="sm" key="small"/>);
  btns.push(<DownloadButton label="Medium" size="md" key="medium"/>);
  btns.push(<DownloadButton label="Large" size="lg" key="large"/>);
  return <div className="flex flex-wrap items-center gap-3">{btns}</div>;
}

function FileCardsDemo() {
  const files = [
    {name: "Invoice-2024-001.pdf", size: "245 KB", type: "PDF", icon: FileText, color: "text-red-500"},
    {name: "Q4-Report.xlsx", size: "1.2 MB", type: "Excel", icon: FileSpreadsheet, color: "text-emerald-500"},
    {name: "Screenshot.png", size: "3.4 MB", type: "Image", icon: FileImage, color: "text-blue-500"},
    {name: "source-code.zip", size: "8.7 MB", type: "Archive", icon: FileCode, color: "text-purple-500"}
  ];
  const iconClasses = files.map(f => "h-5 w-5 " + f.color);
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Recent Files</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-3 px-4 py-3">
              <div className={iconClasses[files.indexOf(f)]} />
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
  const [progress, setProgress, filename] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const start = (n) => {
    setFilename(n);
    setProgress(0);
    setDownloading(true);
    const i = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(i);
          setDownloading(false);
          return 100;
        }
        return p + Math.random() * 8;
      }, 100);
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
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-200" style={{ width: (Math.min(100, progress) + "%") }} />
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
            <button onClick={() => start("report.pdf")} className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90">
              Download Report
            </button>
            <button onClick={() => start("data.csv")} className="flex-1 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]">
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
    {id: "INV-2024-001", date: "Jan 15,2024", amount: "$1,200.00", status: "Paid"},
    {id: "INV-2024-002", date: "Feb 28,2024", amount: "$850.00", status: "Paid"},
    {id: "INV-2024-003", date: "Mar 10,2024", amount: "$2,300.00", status: "Pending"}
  ];
  const statusClasses = invoices.map(inv => 
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium " + 
    (inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400")
  );
  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Invoices</h3>
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
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-4 py-3 text-xs font-mono font-medium">{inv.id}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-xs font-bold">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className={statusClasses[invoices.indexOf(inv)]}>
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
    </div>
  );
}

function ExportDataDemo() {
  const [format, setFormat] = useState<"csv" | "json" | "xlsx">("csv");
  const formats = [
    {id: "csv" as const, label: "CSV", desc: "Comma-separated values", icon: FileSpreadsheet},
    {id: "json" as const, label: "JSON", desc: "JavaScript Object Notation", icon: FileCode},
    {id: "xlsx" as const, label: "Excel", desc: "Microsoft Excel format", icon: File}
  ];
  const iconClass = "h-5 w-5 " + (format === formats[0].id ? "text-foreground" : "text-muted-foreground");
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Export Data</h3>
        <div className="mb-4 space-y-2">
          {formats.map((f) => (
            <button key={f.id} onClick={() => setFormat(f.id)} className={
              "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all " +
              (format === f.id ? "border-foreground bg-foreground/5 shadow-sm" : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]")
            }>
              <f.icon className={iconClass} />
              <div>
                <p className="text-sm font-medium">{f.label}</p>
                <p className="text-[10px] text-muted-foreground">{f.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <DownloadButton label={"Export as " + format.toUpperCase()} size="lg" icon={Cloud} />
      </div>
    </div>
  );
}

function DocumentLibraryDemo() {
  const docs = [
    {name: "Getting Started Guide", type: "PDF", pages: 24, icon: FileText, color: "text-red-500", size: "1.2 MB"},
    {name: "API Documentation", type: "HTML", pages: 0, icon: FileCode, color: "text-blue-500", size: "856 KB"},
    {name: "Brand Assets", type: "ZIP", pages: 0, icon: Package, color: "text-purple-500", size: "12.4 MB"},
    {name: "Release Notes", type: "PDF", pages: 8, icon: FileText, color: "text-red-500", size: "342 KB"}
  ];
  const docColorClasses = docs.map(doc => 
    "flex h-10 w-10 items-center justify-center rounded-lg bg-muted " + doc.color
  );
  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Documentation</h3>
            <span className="text-[10px] text-muted-foreground">{docs.length} files</span>
          </div>
          <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
            {docs.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 px-4 py-3">
                <div className={docColorClasses[docs.indexOf(doc)]} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {doc.type} · {doc.size}{doc.pages > 0 ? ` · ${doc.pages} pages` : ""}
                  </p>
                </div>
                <DownloadButton label="Download" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadButtonPage() {
  return (
    <ComponentDocPage name="Download Button" category="Forms" description="Download buttons with progress states, file cards, icon variants, and animated feedback for file downloads.">
      <PreviewPanel filename="download-button-preview.tsx">
        <DownloadButton label="Download" variant="primary" size="md" />
      </PreviewPanel>

      <SourceCodeViewer source={downloadButtonSource} filename="download-button.tsx" defaultExpanded />

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Button Variants" code={downloadButtonSource}>
          <ButtonVariantsDemo />
        </ExampleBlock>

        <ExampleBlock title="Button Sizes" code={downloadButtonSource}>
          <ButtonSizesDemo />
        </ExampleBlock>

        <ExampleBlock title="File Cards" code={downloadButtonSource}>
          <FileCardsDemo />
        </ExampleBlock>

        <ExampleBlock title="Progress Download" code={downloadButtonSource}>
          <ProgressDownloadDemo />
        </ExampleBlock>

        <ExampleBlock title="Invoice Download" code={downloadButtonSource}>
          <InvoiceDownloadDemo />
        </ExampleBlock>

        <ExampleBlock title="Export Data" code={downloadButtonSource}>
          <ExportDataDemo />
        </ExampleBlock>

        <ExampleBlock title="Document Library" code={downloadButtonSource}>
          <DocumentLibraryDemo />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}