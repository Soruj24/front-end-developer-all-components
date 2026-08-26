"use client";

import { cn } from "@/lib/cn";
import type { DeviceId } from "./devices";
import { DeviceSwitcher } from "./DeviceSwitcher";
import {
  CheckIcon,
  CopyIcon,
  ExpandIcon,
  MoonIcon,
  SunIcon,
} from "./icons";

export type { DeviceId } from "./devices";

interface PreviewToolbarProps {
  device: DeviceId;
  onDeviceChange: (device: DeviceId) => void;
  forcedDark: boolean;
  onToggleDark: () => void;
  copied: boolean;
  onCopy: () => void;
  onExpand: () => void;
}

function ToolbarButton({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="h-4 w-px bg-border" aria-hidden="true" />;
}

/** Toolbar above the live preview: device switcher, theme, copy, expand, playground. */
export function PreviewToolbar({
  device,
  onDeviceChange,
  forcedDark,
  onToggleDark,
  copied,
  onCopy,
  onExpand,
}: PreviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Live Preview
      </span>

      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
        <DeviceSwitcher device={device} onDeviceChange={onDeviceChange} />

        <Divider />

        <ToolbarButton
          title={forcedDark ? "Show light preview" : "Show dark preview"}
          active={forcedDark}
          onClick={onToggleDark}
        >
          {forcedDark ? <MoonIcon className="h-3.5 w-3.5" /> : <SunIcon className="h-3.5 w-3.5" />}
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Copy source" onClick={onCopy}>
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5 text-success" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </ToolbarButton>

        <ToolbarButton title="Expand" onClick={onExpand}>
          <ExpandIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>
    </div>
  );
}
