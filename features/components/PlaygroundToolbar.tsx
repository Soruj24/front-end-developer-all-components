"use client";

import { cn } from "@/lib/cn";
import { XIcon, CopyIcon, CheckIcon, RefreshIcon, DownloadIcon } from "./icons";

interface PlaygroundToolbarProps {
  componentSlug: string;
  activeTab: "code" | "preview";
  onTabChange: (tab: "code" | "preview") => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onClose: () => void;
}

export function PlaygroundToolbar({
  componentSlug,
  activeTab,
  onTabChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  copied,
  onCopy,
  onDownload,
  onClose,
}: PlaygroundToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Playground
        </span>
        <span className="text-sm font-medium text-foreground">
          {componentSlug}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5">
          <TabButton
            active={activeTab === "code"}
            onClick={() => onTabChange("code")}
          >
            Code
          </TabButton>
          <TabButton
            active={activeTab === "preview"}
            onClick={() => onTabChange("preview")}
          >
            Preview
          </TabButton>
        </div>

        <span className="h-4 w-px bg-border" aria-hidden="true" />

        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="inline-flex h-8 items-center rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="inline-flex h-8 items-center rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
        >
          Redo
        </button>

        <ToolbarIcon onClick={onReset} title="Reset">
          <RefreshIcon className="h-3.5 w-3.5" />
        </ToolbarIcon>

        <ToolbarIcon
          onClick={onCopy}
          title="Copy code"
          active={copied}
          activeClass="text-success"
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
        </ToolbarIcon>

        <ToolbarIcon onClick={onDownload} title="Download">
          <DownloadIcon className="h-3.5 w-3.5" />
        </ToolbarIcon>

        <ToolbarIcon onClick={onClose} title="Close playground">
          <XIcon className="h-4 w-4" />
        </ToolbarIcon>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function ToolbarIcon({
  onClick,
  title,
  active,
  activeClass,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  activeClass?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        active
          ? activeClass ?? "text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
