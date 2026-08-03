import React from "react";
import { PlayIcon, RotateIcon, CopyIcon, CheckIcon, LinkIcon, DownloadIcon, SunIcon, MoonIcon, MaximizeIcon, MinimizeIcon, CodeFileIcon } from "./CodePlayground.icons";

interface CodePlaygroundToolbarProps {
  title: string; files: { name: string }[]; entryName: string; running: boolean;
  theme: "light" | "dark"; fullscreen: boolean; copied: boolean; shared: boolean;
  exportOpen: boolean; exportMenu: { label: string; onSelect: () => void }[];
  onRun: () => void; onCopy: () => void; onReset: () => void; onShare: () => void;
  onToggleTheme: () => void; onToggleFullscreen: () => void; onToggleExportOpen: () => void;
}

export function CodePlaygroundToolbar({ title, files, entryName, running, theme, fullscreen, copied, shared, exportOpen, exportMenu, onRun, onCopy, onReset, onShare, onToggleTheme, onToggleFullscreen, onToggleExportOpen }: CodePlaygroundToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface/60 px-3 py-2">
      <div className="mr-auto flex min-w-0 items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft text-primary"><CodeFileIcon className="h-4 w-4" /></div>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{title}</span>
          <span className="font-mono text-[10px] text-subtle">{files.length} file{files.length === 1 ? "" : "s"} · {entryName}</span>
        </div>
      </div>
      <button type="button" onClick={onRun} disabled={running} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60">
        <PlayIcon className="h-3.5 w-3.5" />{running ? "Compiling" : "Run"}
      </button>
      <button type="button" onClick={onCopy} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        {copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}
      </button>
      <button type="button" onClick={onReset} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <RotateIcon className="h-3.5 w-3.5" />Reset
      </button>
      <div className="relative">
        <button type="button" onClick={onToggleExportOpen} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <DownloadIcon className="h-3.5 w-3.5" />Export
        </button>
        {exportOpen && (
          <div className="absolute right-0 top-full z-30 mt-1 w-56 overflow-hidden rounded-lg border border-border bg-background py-1 shadow-popover animate-scale-in">
            {exportMenu.map((item) => <button key={item.label} type="button" onClick={() => { onToggleExportOpen(); item.onSelect(); }} className="block w-full px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{item.label}</button>)}
          </div>
        )}
      </div>
      <button type="button" onClick={onShare} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        {shared ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <LinkIcon className="h-3.5 w-3.5" />}{shared ? "Link copied" : "Share"}
      </button>
      <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        {theme === "dark" ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}
      </button>
      <button type="button" onClick={onToggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        {fullscreen ? <MinimizeIcon className="h-3.5 w-3.5" /> : <MaximizeIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
