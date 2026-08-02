"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  CheckIcon,
  CopyIcon,
  ExpandIcon,
  ExternalLinkIcon,
  MonitorIcon,
  MoonIcon,
  SmartphoneIcon,
  SunIcon,
  TabletIcon,
} from "./icons";

export type FrameWidth = "desktop" | "tablet" | "mobile";

interface PreviewToolbarProps {
  frame: FrameWidth;
  onFrameChange: (frame: FrameWidth) => void;
  forcedDark: boolean;
  onToggleDark: () => void;
  copied: boolean;
  onCopy: () => void;
  onExpand: () => void;
  playgroundHref: string;
}

const FRAMES: Array<{ id: FrameWidth; label: string; icon: typeof MonitorIcon }> = [
  { id: "desktop", label: "Desktop", icon: MonitorIcon },
  { id: "tablet", label: "Tablet", icon: TabletIcon },
  { id: "mobile", label: "Mobile", icon: SmartphoneIcon },
];

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

/** Toolbar floating above the live preview frame. */
export function PreviewToolbar({
  frame,
  onFrameChange,
  forcedDark,
  onToggleDark,
  copied,
  onCopy,
  onExpand,
  playgroundHref,
}: PreviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Live Preview
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5">
          {FRAMES.map(({ id, label, icon: FrameIcon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onFrameChange(id)}
              title={label}
              aria-label={`${label} preview`}
              aria-pressed={frame === id}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:scale-95",
                frame === id
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FrameIcon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

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

        <Link
          href={playgroundHref}
          title="Open in playground"
          aria-label="Open in playground"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-95"
        >
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
