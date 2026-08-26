"use client";

import { useCallback, useState, useMemo } from "react";
import type { RegistryComponent } from "@/features/registry";
import { getDevice, DEVICES } from "@/components/preview";
import type { DeviceId } from "@/components/preview";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { ComponentRenderer } from "@/components/preview/ComponentRenderer";
import { LivePreview } from "./live-preview/LivePreview";
import { PreviewToolbar, usePreviewKeyboardShortcuts } from "./NewPreviewToolbar";

function getBreakpointLabel(device: DeviceId, containerWidth: number): string {
  if (device === "full") {
    if (containerWidth < 640) return `${Math.round(containerWidth)}px — Mobile`;
    if (containerWidth < 768) return `${Math.round(containerWidth)}px — Tablet`;
    if (containerWidth < 1024) return `${Math.round(containerWidth)}px — Laptop`;
    if (containerWidth < 1280) return `${Math.round(containerWidth)}px — Desktop`;
    return `${Math.round(containerWidth)}px — Wide`;
  }
  const preset = DEVICES.find((d) => d.id === device);
  return preset ? `${preset.width}px` : "";
}

export function ComponentLivePreview({
  component,
}: {
  component: RegistryComponent;
}) {
  const [device, setDevice] = useState<DeviceId>("full");
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRefresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(component.source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  }, [component.source]);

  const toggleFullscreen = useCallback(() => setIsFullscreen((v) => !v), []);

  usePreviewKeyboardShortcuts({
    onRefresh: handleRefresh,
    onToggleDark: () => setIsDark((v) => !v),
    onToggleFullscreen: toggleFullscreen,
  });

  const currentDevice = useMemo(() => getDevice(device), [device]);
  const breakpointLabel = getBreakpointLabel(device, 0);

  return (
    <>
      <section className="flex flex-col gap-4" id="preview">
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
          <PreviewToolbar
            device={device}
            onDeviceChange={setDevice}
            isDark={isDark}
            onToggleDark={() => setIsDark((v) => !v)}
            onRefresh={handleRefresh}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            copied={copied}
            onCopy={handleCopy}
            breakpoint={breakpointLabel}
          />

          <div
            className={`flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-muted/60 via-background to-muted/60 p-6 transition-colors duration-300 ${
              isDark ? "dark bg-[#0b0b10]" : ""
            }`}
          >
            <PreviewFrame device={currentDevice}>
              <ComponentRenderer key={refreshKey}>
                <LivePreview component={component} />
              </ComponentRenderer>
            </PreviewFrame>
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <span className="text-[11px] text-muted-foreground">
              Press <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">R</kbd> refresh
              {" "}<kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">D</kbd> dark
              {" "}<kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">F</kbd> fullscreen
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/60">
              v{component.version}
            </span>
          </div>
        </div>
      </section>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen preview"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-medium text-foreground">{component.name}</span>
            <div className="flex items-center gap-2">
              <PreviewToolbar
                device={device}
                onDeviceChange={setDevice}
                isDark={isDark}
                onToggleDark={() => setIsDark((v) => !v)}
                onRefresh={handleRefresh}
                isFullscreen={true}
                onToggleFullscreen={toggleFullscreen}
                copied={copied}
                onCopy={handleCopy}
                breakpoint={breakpointLabel}
              />
            </div>
          </div>
          <div className={`min-h-0 flex-1 overflow-auto p-6 ${
            isDark ? "dark bg-[#0b0b10]" : "bg-gradient-to-br from-muted/40 via-background to-muted/40"
          }`}>
            <PreviewFrame device={currentDevice} className="min-h-full">
              <ComponentRenderer key={refreshKey} className="min-h-full">
                <LivePreview component={component} />
              </ComponentRenderer>
            </PreviewFrame>
          </div>
        </div>
      )}
    </>
  );
}
