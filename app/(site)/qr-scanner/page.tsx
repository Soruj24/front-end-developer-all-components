"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ScanLine, Camera, QrCode, Zap, CheckCircle, XCircle, Search } from "lucide-react";

const installCommand = `npx component-library@latest add qr-scanner`;

const usageCode = `import { QRScanner } from "@/components/ui/qr-scanner";

export default function Demo() {
  return <QRScanner onScan={(result) => console.log(result)} />;
}`;

function ScannerViewDemo() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-48 w-48 rounded-xl border-2 border-primary/30 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCode className="h-16 w-16 text-muted-foreground/30" />
        </div>
        {scanning && <div className="absolute left-0 right-0 h-0.5 bg-primary animate-pulse" style={{ top: "40%" }} />}
        <div className="absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-2 right-2 h-4 w-4 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-r-2 border-b-2 border-primary" />
      </div>
      <button onClick={() => { setScanning(true); setResult(null); setTimeout(() => { setScanning(false); setResult("https://example.com"); }, 2000); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        <ScanLine className="mr-1 inline h-4 w-4" /> {scanning ? "Scanning..." : "Start Scan"}
      </button>
      {result && <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-4 py-2 text-sm text-green-700 dark:text-green-400 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> {result}</div>}
    </div>
  );
}

function QRGenerateDemo() {
  const [value, setValue] = useState("https://example.com");
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-40 w-40 rounded-xl border bg-white p-3 shadow-sm">
        <div className="grid grid-cols-7 gap-px h-full">
          {Array.from({ length: 49 }).map((_, i) => (
            <div key={i} className={`rounded-sm ${(i < 21 && i % 7 < 3) || (i > 27 && i % 7 < 3 && Math.floor(i / 7) > 4) ? "bg-foreground" : Math.random() > 0.5 ? "bg-foreground" : "bg-white"}`} />
          ))}
        </div>
      </div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="w-64 rounded-lg border bg-background px-3 py-2 text-sm" placeholder="Enter URL" />
      <div className="text-xs text-muted-foreground">QR for: {value}</div>
    </div>
  );
}

function ScanResultDemo() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex gap-3">
        <button onClick={() => setStatus("success")} className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"><CheckCircle className="mr-1 inline h-4 w-4" /> Success</button>
        <button onClick={() => setStatus("error")} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"><XCircle className="mr-1 inline h-4 w-4" /> Error</button>
      </div>
      {status === "success" && <div className="w-full max-w-xs rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800 p-4"><div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400"><CheckCircle className="h-4 w-4" /> QR Code Scanned</div><p className="mt-1 text-xs text-green-600 dark:text-green-500">URL: https://example.com/product/123</p></div>}
      {status === "error" && <div className="w-full max-w-xs rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-4"><div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400"><XCircle className="h-4 w-4" /> Scan Failed</div><p className="mt-1 text-xs text-red-600 dark:text-red-500">Unable to read QR code</p></div>}
      {status === "idle" && <p className="text-sm text-muted-foreground">Click a button to simulate scan result</p>}
    </div>
  );
}

function CameraViewDemo() {
  const [flash, setFlash] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-48 w-64 rounded-xl overflow-hidden bg-foreground/5 border">
        <div className="absolute inset-0 flex items-center justify-center"><Camera className="h-10 w-10 text-muted-foreground/40" /></div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <button onClick={() => setFlash(!flash)} className={`rounded-full p-1.5 text-xs transition-colors ${flash ? "bg-yellow-400 text-foreground" : "bg-muted text-muted-foreground"}`}><Zap className="h-3 w-3" /></button>
          <div className="text-[10px] text-muted-foreground">Camera Preview</div>
        </div>
        {flash && <div className="absolute inset-0 bg-yellow-100/20" />}
      </div>
    </div>
  );
}

function CodeReaderDemo() {
  const [codes] = useState(["QR", "EAN-13", "Code 128", "UPC-A"]);
  const [selected, setSelected] = useState("QR");
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex gap-2">
        {codes.map((code) => (
          <button key={code} onClick={() => setSelected(code)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selected === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <QrCode className="mr-1 inline h-3 w-3" /> {code}
          </button>
        ))}
      </div>
      <div className="h-32 w-48 rounded-lg border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
        Ready to scan {selected}
      </div>
    </div>
  );
}

function BarcodeScanDemo() {
  const [scanned, setScanned] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-24 w-48 overflow-hidden rounded-lg border bg-white p-2">
        <div className="flex items-end gap-px h-full">
          {[3,1,2,1,3,1,1,2,1,3,1,2,1,1,3,1,2,1,3,1,1,2,3,1,1,2,1,3,1,2,1].map((w, i) => (
            <div key={i} className="bg-foreground" style={{ width: w, height: `${50 + Math.random() * 50}%` }} />
          ))}
        </div>
      </div>
      <button onClick={() => { setScanned(true); setTimeout(() => setScanned(false), 1500); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        <ScanLine className="mr-1 inline h-4 w-4" /> Scan Barcode
      </button>
      {scanned && <div className="text-xs text-primary font-mono">8901234567890</div>}
    </div>
  );
}

function LinkPreviewDemo() {
  const [url, setUrl] = useState("https://example.com");
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-72 rounded-lg border bg-background px-3 py-2 pr-10 text-sm" placeholder="Scan or enter URL" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      {url && (
        <div className="w-72 rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0"><QrCode className="h-5 w-5 text-primary" /></div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{url}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Preview of scanned link content</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QRScannerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">QR Scanner</h1>
          <Badge variant="primary">Utility</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A QR code and barcode scanner component for scanning, generating, and previewing codes.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various QR and barcode scanner demonstrations.</p>
        </div>

        <ComponentPreview id="qr-scanner-view">
          <ScannerViewDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-generate">
          <QRGenerateDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-result">
          <ScanResultDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-camera">
          <CameraViewDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-code-reader">
          <CodeReaderDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-barcode">
          <BarcodeScanDemo />
        </ComponentPreview>

        <ComponentPreview id="qr-scanner-link-preview">
          <LinkPreviewDemo />
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
                <td className="px-4 py-3 font-mono text-xs">onScan</td>
                <td className="px-4 py-3 text-muted-foreground">(result: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">type</td>
                <td className="px-4 py-3 text-muted-foreground">"qr" | "barcode" | "both"</td>
                <td className="px-4 py-3 text-muted-foreground">"both"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
