"use client";

import { CheckIcon, CopyIcon, LinkIcon, MoonIcon, SunIcon } from "./Icons";

interface ToolbarProps {
  title: string;
  endpointCount: number;
  baseUrl: string;
  copied: null | "curl" | "response";
  theme: "light" | "dark";
  onCopyCurl: () => void;
  onToggleTheme: () => void;
}

export function Toolbar({
  title,
  endpointCount,
  baseUrl,
  copied,
  theme,
  onCopyCurl,
  onToggleTheme,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-muted/50 px-3 py-2">
      <div className="mr-auto flex min-w-0 items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          <LinkIcon className="h-4 w-4" />
        </div>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{title}</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {endpointCount} endpoints · {baseUrl}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onCopyCurl}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied === "curl" ? (
          <CheckIcon className="h-3.5 w-3.5 text-success" />
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
        {copied === "curl" ? "Copied" : "Copy request"}
      </button>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {theme === "dark" ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
