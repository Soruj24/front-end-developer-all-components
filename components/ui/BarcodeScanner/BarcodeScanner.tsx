"use client";

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
  if (/^\d{13}$/.test(code)) return "EAN-13";
  if (/^\d{8}$/.test(code)) return "EAN-8";
  if (/^\d{12}$/.test(code)) return "UPC-A";
  if (/^\d{6}$/.test(code)) return "UPC-E";
  if (/^97[89]\d{10}$/.test(code)) return "ISBN-13";
  if (/^[A-Za-z0-9\-]+$/.test(code) && /\d/.test(code) && /[A-Za-z]/.test(code)) return "Code128";
  if (/^[A-Z0-9\-\.\s\/\$+%*]+$/.test(code)) return "Code39";
  return "Unknown";
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function BarcodeScanner({
  onScan,
  onStatusChange,
  disabled = false,
  variant = "default",
  size = "md",
  showFormat = true,
  mockMode = true,
  mockCode,
  mockFormat,
  mockDelay = 1200,
  className,
}: BarcodeScannerProps) {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateStatus = useCallback(
    (s: ScanStatus) => {
      setStatus(s);
      onStatusChange?.(s);
    },
    [onStatusChange],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const triggerScan = useCallback(() => {
    if (disabled || !mockMode) return;
    updateStatus("scanning");

    timerRef.current = setTimeout(() => {
      const pick = mockCode
        ? { code: mockCode, format: mockFormat ?? detectFormat(mockCode), label: "Scanned Item" }
        : pickRandom(MOCK_BARCODES);

      const result: ScanResult = {
        code: pick.code,
        format: pick.format,
        timestamp: Date.now(),
        label: pick.label,
      };

      setLastResult(result);
      updateStatus("success");
      onScan?.(result.code, result.format);

      timerRef.current = setTimeout(() => updateStatus("idle"), 800);
    }, mockDelay);
  }, [disabled, mockMode, mockCode, mockFormat, mockDelay, onScan, updateStatus]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerScan();
      }
    },
    [triggerScan],
  );

  const sizeClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
  };

  const iconSizes = { sm: "h-8 w-8", md: "h-12 w-12", lg: "h-16 w-16" };

  const formatColor = lastResult ? FORMAT_COLORS[lastResult.format] : null;

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <button
          type="button"
          onClick={triggerScan}
          disabled={disabled || status === "scanning"}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-md px-4",
            "text-sm font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "active:scale-[0.98]",
            status === "scanning"
              ? "bg-primary/60 text-primary-foreground cursor-wait"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          onKeyDown={handleKeyDown}
        >
          {status === "scanning" ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 012-2h2" /><path d="M17 3h2a2 2 0 012 2v2" /><path d="M21 17v2a2 2 0 01-2 2h-2" /><path d="M7 21H5a2 2 0 01-2-2v-2" />
              <line x1="7" y1="12" x2="17" y2="12" />
            </svg>
          )}
          {status === "scanning" ? "Scanning..." : "Scan"}
        </button>
        {lastResult && showFormat && (
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", formatColor?.bg, formatColor?.text)}>
            {lastResult.format}
          </span>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("w-full max-w-xs", className)}>
        <button
          type="button"
          onClick={triggerScan}
          disabled={disabled || status === "scanning"}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative flex w-full items-center gap-3 rounded-lg border border-border bg-background p-3",
            "transition-all duration-200",
            "hover:border-ring/50 hover:shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "active:scale-[0.99]",
            status === "scanning" && "border-primary/50",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted", status === "scanning" && "animate-pulse")}>
            <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 012-2h2" /><path d="M17 3h2a2 2 0 012 2v2" /><path d="M21 17v2a2 2 0 01-2 2h-2" /><path d="M7 21H5a2 2 0 01-2-2v-2" />
              <path d="M7 12h10" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-medium text-foreground">{status === "scanning" ? "Scanning..." : "Tap to Scan"}</p>
            <p className="text-xs text-muted-foreground">Position barcode in view</p>
          </div>
          {lastResult && (
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", formatColor?.bg, formatColor?.text)}>
              {lastResult.format}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={triggerScan}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed",
          "transition-all duration-300",
          status === "scanning"
            ? "border-primary/60 bg-primary/5"
            : status === "success"
              ? "border-emerald-500/60 bg-emerald-500/5"
              : status === "error"
                ? "border-destructive/60 bg-destructive/5"
                : "border-border bg-muted/20 hover:border-ring/40 hover:bg-muted/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {status === "scanning" && (
            <div className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ top: "50%" }} />
          )}
          {status === "success" && lastResult ? (
            <svg className={cn(iconSizes[size], "text-emerald-500")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : status === "error" ? (
            <svg className={cn(iconSizes[size], "text-destructive")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          ) : (
            <svg className={cn(iconSizes[size], "text-muted-foreground")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 012-2h2" /><path d="M17 3h2a2 2 0 012 2v2" /><path d="M21 17v2a2 2 0 01-2 2h-2" /><path d="M7 21H5a2 2 0 01-2-2v-2" />
              <rect x="7" y="7" width="3" height="10" rx="1" /><rect x="14" y="7" width="3" height="6" rx="1" />
            </svg>
          )}

          {lastResult && (
            <div className="flex flex-col items-center gap-1">
              <p className="font-mono text-sm font-medium text-foreground">{lastResult.code}</p>
              {showFormat && (
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", formatColor?.bg, formatColor?.text)}>
                  {lastResult.format}
                </span>
              )}
            </div>
          )}

          {!lastResult && (
            <p className="text-xs text-muted-foreground">
              {status === "scanning" ? "Scanning..." : "Click or press Enter to scan"}
            </p>
          )}
        </div>

        <div className="absolute right-2 top-2">
          <div className={cn("h-2 w-2 rounded-full", status === "scanning" ? "bg-primary animate-pulse" : status === "success" ? "bg-emerald-500" : status === "error" ? "bg-destructive" : "bg-muted-foreground/40")} />
        </div>
      </div>

      <button
        type="button"
        onClick={triggerScan}
        disabled={disabled || status === "scanning"}
        className={cn(
          "mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg px-4",
          "text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.98]",
          status === "scanning"
            ? "bg-primary/60 text-primary-foreground cursor-wait"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {status === "scanning" && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {status === "scanning" ? "Scanning..." : "Start Scan"}
      </button>
    </div>
  );
}
