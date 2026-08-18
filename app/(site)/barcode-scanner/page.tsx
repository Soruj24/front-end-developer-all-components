"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button, Input } from "@/components/ui";

const installCommand = "npx component-library@latest add barcode-scanner";

const usageCode = `import { BarcodeScanner } from "@/components/ui";

export default function Example() {
  return <BarcodeScanner onScan={(code) => console.log(code)} />;
}`;

const mockScans = [
  { code: "4006381333931", type: "EAN-13", product: "Organic Milk 1L", status: "valid" },
  { code: "9780201379624", type: "ISBN-13", product: "Design Patterns", status: "valid" },
  { code: "ABC-123-XYZ", type: "Code128", product: "Shipment #4521", status: "valid" },
  { code: "0000000000000", type: "EAN-13", product: "Unknown", status: "invalid" },
];

export default function BarcodeScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [results, setResults] = useState<typeof mockScans>([]);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const random = mockScans[Math.floor(Math.random() * mockScans.length)];
      setResults((prev) => [random, ...prev].slice(0, 5));
      setScanning(false);
    }, 1200);
  };

  const addManual = () => {
    if (!manualCode.trim()) return;
    setResults((prev) => [{ code: manualCode, type: "Manual", product: "Custom Entry", status: "valid" }, ...prev].slice(0, 5));
    setManualCode("");
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Barcode Scanner</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Barcode and QR code scanner with real-time detection, result formatting, and manual entry fallback.
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
          <h3 className="text-lg font-medium text-foreground">Scanner View</h3>
          <ComponentPreview id="barcode-scanner-default">
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
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Manual Entry</h3>
          <ComponentPreview id="barcode-scanner-manual">
            <div className="flex w-full max-w-sm gap-2">
              <Input placeholder="Enter barcode manually" value={manualCode} onChange={(e) => setManualCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addManual()} />
              <Button onClick={addManual}>Add</Button>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Scan Results</h3>
          <ComponentPreview id="barcode-scanner-results">
            <Card className="w-full max-w-sm">
              <CardContent className="p-3">
                {results.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No scans yet. Click simulate above.</p>}
                {results.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
                    <Badge variant={r.status === "valid" ? "primary" : "destructive"}>{r.type}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono truncate">{r.code}</p>
                      <p className="text-xs text-muted-foreground">{r.product}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onScan</td>
                <td className="px-4 py-3 text-muted-foreground">(code: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}