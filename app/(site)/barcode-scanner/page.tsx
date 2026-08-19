"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const BARCODE_SCANNER_SOURCE = `"use client";

import { useState } from "react";

interface BarcodeScannerProps {
  onScan?: (code: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScan?.("4006381333931");
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative mb-3 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
        <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
        </svg>
        {scanning && <div className="absolute inset-x-4 h-0.5 animate-pulse bg-primary" />}
      </div>
      <button
        onClick={handleScan}
        disabled={scanning}
        className={\`w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors \${
          scanning ? "cursor-wait bg-primary/60" : "bg-primary hover:bg-primary/90"
        }\`}
      >
        {scanning ? "Scanning..." : "Start Scan"}
      </button>
    </div>
  );
}`;

const SCANNER_EXAMPLE = `<BarcodeScanner onScan={(code) => console.log(code)} />`;

const MANUAL_EXAMPLE = `const [manualCode, setManualCode] = useState("");

<Input
  placeholder="Enter barcode manually"
  value={manualCode}
  onChange={(e) => setManualCode(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && addManual()}
/>
<Button onClick={addManual}>Add</Button>`;

const RESULTS_EXAMPLE = `<div className="flex items-center gap-3 border-b border-border py-2 last:border-0">
  <span className={\`rounded-full px-2.5 py-0.5 text-xs font-medium \${
    r.status === "valid" ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"
  }\`}>{r.type}</span>
  <div>
    <p className="font-mono text-sm">{r.code}</p>
    <p className="text-xs text-muted-foreground">{r.product}</p>
  </div>
</div>`;

const mockScans = [
  { code: "4006381333931", type: "EAN-13", product: "Organic Milk 1L", status: "valid" },
  { code: "9780201379624", type: "ISBN-13", product: "Design Patterns", status: "valid" },
  { code: "ABC-123-XYZ", type: "Code128", product: "Shipment #4521", status: "valid" },
  { code: "0000000000000", type: "EAN-13", product: "Unknown", status: "invalid" },
];

function ScannerViewDemo() {
  const [scanning, setScanning] = useState(false);
  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1200);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="relative mb-3 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
          <svg className={`h-12 w-12 text-muted-foreground ${scanning ? "animate-pulse" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
          </svg>
          {scanning && <div className="absolute inset-x-4 h-0.5 animate-pulse bg-primary" />}
        </div>
        <Button className="w-full" onClick={simulateScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Simulate Scan"}
        </Button>
      </CardContent>
    </Card>
  );
}

function ManualEntryDemo() {
  const [manualCode, setManualCode] = useState("");
  const addManual = () => setManualCode("");
  return (
    <div className="flex w-full max-w-sm gap-2">
      <Input placeholder="Enter barcode manually" value={manualCode} onChange={(e) => setManualCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addManual()} />
      <Button onClick={addManual}>Add</Button>
    </div>
  );
}

function ScanResultsDemo() {
  const [results, setResults] = useState<typeof mockScans>(mockScans.slice(0, 2));
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-3">
        {results.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No scans yet. Click simulate above.</p>}
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${r.status === "valid" ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"}`}>{r.type}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono truncate">{r.code}</p>
              <p className="text-xs text-muted-foreground">{r.product}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function BarcodeScannerPage() {
  return (
    <ComponentDocPage
      name="Barcode Scanner"
      category="Forms"
      description="Barcode and QR code scanner with real-time detection, result formatting, and manual entry fallback."
    >
      <PreviewPanel filename="barcode-scanner.tsx">
        <ScannerViewDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BARCODE_SCANNER_SOURCE} filename="components/ui/BarcodeScanner/BarcodeScanner.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Scanner View" description="Live scanning view with camera frame animation." code={SCANNER_EXAMPLE}><ScannerViewDemo /></ExampleBlock>
        <ExampleBlock title="Manual Entry" description="Keyboard input as a fallback for unreadable codes." code={MANUAL_EXAMPLE}><ManualEntryDemo /></ExampleBlock>
        <ExampleBlock title="Scan Results" description="Formatted results with status pills." code={RESULTS_EXAMPLE}><ScanResultsDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}