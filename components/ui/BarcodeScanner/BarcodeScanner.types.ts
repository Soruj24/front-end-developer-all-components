export type BarcodeFormat =
  | "EAN-13"
  | "EAN-8"
  | "UPC-A"
  | "UPC-E"
  | "Code128"
  | "Code39"
  | "ISBN-13"
  | "QR"
  | "Unknown";

export type ScannerVariant = "default" | "compact" | "minimal";
export type ScannerSize = "sm" | "md" | "lg";
export type ScanStatus = "idle" | "scanning" | "success" | "error";

export interface ScanResult {
  code: string;
  format: BarcodeFormat;
  timestamp: number;
  label?: string;
}

export interface BarcodeScannerProps {
  onScan?: (code: string, format: BarcodeFormat) => void;
  onError?: (error: string) => void;
  onStatusChange?: (status: ScanStatus) => void;
  disabled?: boolean;
  variant?: ScannerVariant;
  size?: ScannerSize;
  showFormat?: boolean;
  mockMode?: boolean;
  mockCode?: string;
  mockFormat?: BarcodeFormat;
  mockDelay?: number;
  className?: string;
}
