"use client";

import { useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { DeviceId } from "@/components/preview";
import { DEVICES } from "@/components/preview";
import {
  SunIcon, MoonIcon, RefreshIcon, ExpandIcon, MinimizeIcon,
  CopyIcon, CheckIcon,
} from "./icons";

interface PreviewToolbarProps {
  device: DeviceId;
  onDeviceChange: (device: DeviceId) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onRefresh: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  copied: boolean;
  onCopy: () => void;
  breakpoint?: string;
}

function ToolbarButton({
  onClick, title, active, children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} title={title} aria-label={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}>
      {children}
    </button>
  );
}

function Divider() {
  return <span className="h-4 w-px bg-border" aria-hidden="true" />;
}

export function PreviewToolbar({
  device, onDeviceChange, isDark, onToggleDark,
  onRefresh, isFullscreen, onToggleFullscreen,
  copied, onCopy, breakpoint,
}: PreviewToolbarProps) {
  const currentDevice = DEVICES.find((d) => d.id === device);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </span>
        <div className="hidden items-center gap-1 sm:flex">
          {DEVICES.map((preset) => (
            <button key={preset.id} type="button" onClick={() => onDeviceChange(preset.id)}
              title={`${preset.label}${preset.width ? ` (${preset.width}px)` : ""}`}
              aria-pressed={device === preset.id}
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                device === preset.id
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}>
              {preset.shortLabel}
            </button>
          ))}
        </div>
        {breakpoint && (
          <span className="hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            {breakpoint}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton title={isDark ? "Light mode" : "Dark mode"} active={isDark} onClick={onToggleDark}>
          {isDark ? <MoonIcon className="h-3.5 w-3.5" /> : <SunIcon className="h-3.5 w-3.5" />}
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="Refresh" onClick={onRefresh}>
          <RefreshIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title={isFullscreen ? "Exit fullscreen" : "Fullscreen"} active={isFullscreen} onClick={onToggleFullscreen}>
          {isFullscreen ? <MinimizeIcon className="h-3.5 w-3.5" /> : <ExpandIcon className="h-3.5 w-3.5" />}
        </ToolbarButton>
        <Divider />
        <button type="button" onClick={onCopy} title="Copy source"
          className={cn("inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors",
            copied ? "text-success" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

/** Keyboard shortcut listener for preview controls. */
export function usePreviewKeyboardShortcuts(handlers: {
  onRefresh: () => void;
  onToggleDark: () => void;
  onToggleFullscreen: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "r" && !e.metaKey && !e.ctrlKey) handlers.onRefresh();
      if (e.key === "d" && !e.metaKey && !e.ctrlKey) handlers.onToggleDark();
      if (e.key === "f" && !e.metaKey && !e.ctrlKey) handlers.onToggleFullscreen();
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
