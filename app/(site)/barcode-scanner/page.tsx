"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
} from "@/components/docs";
import {
  BasicExample,
  FormatDetectionExample,
  ManualEntryExample,
  ScanHistoryExample,
  ProductLookupExample,
  InventoryCheckExample,
  VariantExample,
  SizeExample,
  StatusIndicatorExample,
} from "@/components/ui/BarcodeScanner/examples";
import { InlineSelect } from "@/components/ui/InlineSelect";
import { cn } from "@/lib/cn";

const BARCODE_SCANNER_SOURCE = `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type {
  BarcodeScannerProps,
  BarcodeFormat,
  ScanResult,
  ScanStatus,
} from "./BarcodeScanner.types";
import { MOCK_BARCODES, FORMAT_COLORS } from "./BarcodeScanner.constants";

function detectFormat(code: string): BarcodeFormat {
  if (/^\\d{13}$/.test(code)) return "EAN-13";
  if (/^\\d{8}$/.test(code)) return "EAN-8";
  if (/^\\d{12}$/.test(code)) return "UPC-A";
  if (/^97[89]\\d{10}$/.test(code)) return "ISBN-13";
  if (/^[A-Za-z0-9\\-]+$/.test(code)) return "Code128";
  return "Unknown";
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function BarcodeScanner({
  onScan, onError, onStatusChange, disabled = false,
  variant = "default", size = "md", showFormat = true,
  mockMode = true, mockCode, mockFormat, mockDelay = 1200, className,
}: BarcodeScannerProps) {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateStatus = useCallback((s: ScanStatus) => {
    setStatus(s);
    onStatusChange?.(s);
  }, [onStatusChange]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const triggerScan = useCallback(() => {
    if (disabled || !mockMode) return;
    updateStatus("scanning");
    timerRef.current = setTimeout(() => {
      const pick = mockCode
        ? { code: mockCode, format: mockFormat ?? detectFormat(mockCode), label: "Scanned Item" }
        : pickRandom(MOCK_BARCODES);
      const result: ScanResult = {
        code: pick.code, format: pick.format,
        timestamp: Date.now(), label: pick.label,
      };
      setLastResult(result);
      updateStatus("success");
      onScan?.(result.code, result.format);
      timerRef.current = setTimeout(() => updateStatus("idle"), 800);
    }, mockDelay);
  }, [disabled, mockMode, mockCode, mockFormat, mockDelay, onScan, updateStatus]);

  // ... renders viewport with animated scan line, status indicators,
  // format badges, and action button
}`;

const VARIANT_SOURCE = `<BarcodeScanner variant="default" />  {/* Full viewport + button */}
<BarcodeScanner variant="compact" />  {/* Inline card layout */}
<BarcodeScanner variant="minimal" />  {/* Button only */}`;

const SIZE_SOURCE = `<BarcodeScanner size="sm" />  {/* h-32 viewport */}
<BarcodeScanner size="md" />  {/* h-48 viewport (default) */}
<BarcodeScanner size="lg" />  {/* h-64 viewport */}`;

const FORMAT_SOURCE = `// Format detection is automatic
<BarcodeScanner
  showFormat
  onScan={(code, format) => {
    console.log(code, format); // "4006381333931", "EAN-13"
  }}
/>`;

const MANUAL_SOURCE = `const [manualCode, setManualCode] = useState("");
const [entries, setEntries] = useState<string[]>([]);

const addEntry = () => {
  if (!manualCode.trim()) return;
  setEntries((prev) => [manualCode.trim(), ...prev]);
  setManualCode("");
};

<input
  placeholder="Enter barcode manually..."
  value={manualCode}
  onChange={(e) => setManualCode(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && addEntry()}
/>
<button onClick={addEntry}>Add</button>`;

const PRODUCT_SOURCE = `const PRODUCTS: Record<string, Product> = {
  "4006381333931": { name: "Organic Milk 1L", price: "$3.99", stock: 24 },
  "9780201379624": { name: "Design Patterns", price: "$49.99", stock: 8 },
};

<BarcodeScanner
  onScan={(code) => {
    const product = PRODUCTS[code];
    if (product) showProduct(product);
    else showError(code);
  }}
/>`;

const STATUS_SOURCE = `const [status, setStatus] = useState<ScanStatus>("idle");

<BarcodeScanner onStatusChange={setStatus} />
{/* status: "idle" | "scanning" | "success" | "error" */}`;

const examples = [
  { id: "basic", title: "Basic Scanner", description: "Click-to-scan with status feedback", category: "basic" },
  { id: "variants", title: "Variants", description: "Default, compact, and minimal layouts", category: "variants" },
  { id: "sizes", title: "Sizes", description: "Small, medium, and large viewports", category: "variants" },
  { id: "format", title: "Format Detection", description: "Auto-detect barcode format (EAN-13, ISBN, UPC, Code128)", category: "advanced" },
  { id: "manual", title: "Manual Entry", description: "Keyboard fallback for unreadable codes", category: "advanced" },
  { id: "history", title: "Scan History", description: "Track and display recent scans", category: "advanced" },
  { id: "product", title: "Product Lookup", description: "Scan to find product info with price and stock", category: "real-world" },
  { id: "inventory", title: "Inventory Check", description: "Check items in/out with summary stats", category: "real-world" },
  { id: "status", title: "Status Indicator", description: "External status monitoring with visual indicator", category: "interactive" },
];

const sourceMap: Record<string, string> = {
  basic: BARCODE_SCANNER_SOURCE,
  variants: VARIANT_SOURCE,
  sizes: SIZE_SOURCE,
  format: FORMAT_SOURCE,
  manual: MANUAL_SOURCE,
  history: BARCODE_SCANNER_SOURCE,
  product: PRODUCT_SOURCE,
  inventory: BARCODE_SCANNER_SOURCE,
  status: STATUS_SOURCE,
};

export default function BarcodeScannerPage() {
  const [activeExample, setActiveExample] = useState("basic");
  const currentExample = examples.find((e) => e.id === activeExample);

  return (
    <ComponentDocPage
      name="Barcode Scanner"
      category="Forms"
      description="Barcode and QR code scanner with real-time detection, format identification, result formatting, and manual entry fallback."
    >
      <PreviewPanel filename="barcode-scanner.tsx">
        <BasicExample />
      </PreviewPanel>

      <SourceCodeViewer
        source={BARCODE_SCANNER_SOURCE}
        filename="components/ui/BarcodeScanner/BarcodeScanner.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Examples
          </h2>

          {/* Desktop navigation */}
          <div className="hidden gap-1 overflow-x-auto sm:flex">
            {examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setActiveExample(ex.id)}
                className={cn(
                  "inline-flex shrink-0 items-center rounded-md px-3 py-1.5",
                  "text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  activeExample === ex.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {ex.title}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="sm:hidden">
            <InlineSelect
              options={examples.map((ex) => ({ value: ex.id, label: ex.title }))}
              value={activeExample}
              onChange={(val) => setActiveExample(val)}
              size="sm"
            />
          </div>
        </div>

        {currentExample && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {currentExample.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {currentExample.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/30 p-8">
                {activeExample === "basic" && <BasicExample />}
                {activeExample === "variants" && <VariantExample />}
                {activeExample === "sizes" && <SizeExample />}
                {activeExample === "format" && <FormatDetectionExample />}
                {activeExample === "manual" && <ManualEntryExample />}
                {activeExample === "history" && <ScanHistoryExample />}
                {activeExample === "product" && <ProductLookupExample />}
                {activeExample === "inventory" && <InventoryCheckExample />}
                {activeExample === "status" && <StatusIndicatorExample />}
              </div>
            </div>

            <SourceCodeViewer
              source={sourceMap[activeExample] ?? BARCODE_SCANNER_SOURCE}
              filename={`examples/${currentExample.id}.tsx`}
            />
          </div>
        )}
      </section>
    </ComponentDocPage>
  );
}
