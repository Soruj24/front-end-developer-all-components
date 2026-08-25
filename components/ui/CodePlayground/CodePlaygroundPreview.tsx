import React, { type RefObject } from "react";
import { cn } from "@/lib/cn";
import type { DeviceKey } from "./CodePlayground.types";
import { DEVICE_WIDTHS } from "./CodePlayground.types";
import { MonitorIcon, TabletIcon, MobileIcon, TerminalIcon, AlertTriangleIcon } from "./CodePlayground.icons";

interface CodePlaygroundPreviewProps {
  previewRef: RefObject<HTMLDivElement | null>; device: DeviceKey; setDevice: (d: DeviceKey) => void;
  consoleOpen: boolean; setConsoleOpen: (v: boolean) => void; error: string | null; setError: (e: string | null) => void;
  counts: { errors: number; warnings: number }; onRun: () => void;
}

const deviceButtons: { key: DeviceKey; label: string; icon: React.ReactNode }[] = [
  { key: "fluid", label: "Fluid", icon: <MonitorIcon className="h-3.5 w-3.5" /> },
  { key: "desktop", label: "1280", icon: <MonitorIcon className="h-3.5 w-3.5" /> },
  { key: "tablet", label: "768", icon: <TabletIcon className="h-3.5 w-3.5" /> },
  { key: "mobile", label: "375", icon: <MobileIcon className="h-3.5 w-3.5" /> },
];

export function CodePlaygroundPreview({ previewRef, device, setDevice, consoleOpen, setConsoleOpen, error, setError, counts, onRun }: CodePlaygroundPreviewProps) {
  const deviceWidth = device === "fluid" ? null : DEVICE_WIDTHS[device];
  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-muted/40 px-3 py-2">
        <span className="mr-auto text-xs font-medium uppercase tracking-wider text-muted-foreground">Preview{deviceWidth ? <span className="ml-2 font-mono normal-case text-muted-foreground/70">{deviceWidth}px</span> : null}</span>
        <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-0.5">
          {deviceButtons.map((btn) => (
            <button key={btn.key} type="button" onClick={() => setDevice(btn.key)} title={`${btn.label}${btn.key !== "fluid" ? ` (${DEVICE_WIDTHS[btn.key]}px)` : ""}`}
              className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors", device === btn.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}>
              {btn.icon}{btn.label !== "Fluid" && <span className="hidden sm:inline">{btn.label}</span>}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setConsoleOpen(!consoleOpen)} aria-label="Toggle console"
          className={cn("inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium transition-colors", consoleOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
          <TerminalIcon className="h-3.5 w-3.5" />Console
          {(counts.errors > 0 || counts.warnings > 0) && <span className={cn("flex items-center gap-0.5 font-mono", counts.errors > 0 ? "text-danger" : "text-warning")}><span>{counts.errors}</span><span className="opacity-60">/</span><span>{counts.warnings}</span></span>}
        </button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-muted/30">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
        <div className="absolute inset-0 overflow-auto p-3 sm:p-4">
          <div className="relative mx-auto h-full min-h-[320px] overflow-hidden rounded-lg border border-border/60 bg-background shadow-card ring-1 ring-black/[0.04] dark:ring-white/[0.08]" style={{ maxWidth: deviceWidth ?? undefined }}>
            <div ref={previewRef} className="flex min-h-full w-full items-center justify-center" />
          </div>
        </div>
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col bg-danger/5 p-6 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center gap-2 text-danger"><AlertTriangleIcon className="h-5 w-5" /><span className="text-sm font-semibold">Runtime error</span></div>
            <pre className="scrollbar-thin mt-3 flex-1 overflow-auto whitespace-pre-wrap rounded-lg border border-danger/20 bg-background/70 p-4 font-mono text-xs leading-relaxed text-danger">{error}</pre>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setError(null)} className="rounded-lg border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10">Dismiss</button>
              <button type="button" onClick={() => { setError(null); onRun(); }} className="rounded-lg bg-danger px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90">Retry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
