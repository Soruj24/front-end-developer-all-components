import type { BarcodeFormat, ScanResult } from "./BarcodeScanner.types";

export const MOCK_SCAN: ScanResult = {
  code: "4006381333931",
  format: "EAN-13",
  timestamp: Date.now(),
  label: "Organic Milk 1L",
};

export const MOCK_SCANS: ScanResult[] = [
  { code: "4006381333931", format: "EAN-13", timestamp: Date.now() - 30000, label: "Organic Milk 1L" },
  { code: "9780201379624", format: "ISBN-13", timestamp: Date.now() - 25000, label: "Design Patterns" },
  { code: "ABC-123-XYZ", format: "Code128", timestamp: Date.now() - 20000, label: "Shipment #4521" },
  { code: "0012345678905", format: "UPC-A", timestamp: Date.now() - 15000, label: "Cereal Box 500g" },
  { code: "9781234567897", format: "ISBN-13", timestamp: Date.now() - 10000, label: "TypeScript in Depth" },
];

export const FORMAT_COLORS: Record<BarcodeFormat, { bg: string; text: string }> = {
  "EAN-13": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "EAN-8": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "UPC-A": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  "UPC-E": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  "Code128": { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  "Code39": { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  "ISBN-13": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  QR: { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
  Unknown: { bg: "bg-muted", text: "text-muted-foreground" },
};

export const MOCK_BARCODES: { code: string; format: BarcodeFormat; label: string }[] = [
  { code: "4006381333931", format: "EAN-13", label: "Organic Milk 1L" },
  { code: "9780201379624", format: "ISBN-13", label: "Design Patterns" },
  { code: "ABC-123-XYZ", format: "Code128", label: "Shipment #4521" },
  { code: "0012345678905", format: "UPC-A", label: "Cereal Box 500g" },
  { code: "0000000000000", format: "EAN-13", label: "Unknown Product" },
];
