"use client";

import { cn } from "@/lib/cn";
import { models } from "./data";
import { MenuIcon, SearchIcon, SunIcon, MoonIcon } from "./icons";
import { InlineSelect } from "@/components/ui/InlineSelect";
import type { Model } from "./data";

export function TopBar({
  sidebarVisible,
  onToggleSidebar,
  model,
  onModelChange,
  webSearch,
  onToggleWebSearch,
  darkMode,
  onToggleDark,
  shareFeedback,
  exportFeedback,
  onShare,
  onExport,
}: {
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
  model: Model;
  onModelChange: (m: Model) => void;
  webSearch: boolean;
  onToggleWebSearch: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  shareFeedback: string;
  exportFeedback: string;
  onShare: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
      <div className="flex items-center gap-3">
        {!sidebarVisible && (
          <button onClick={onToggleSidebar} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
        <InlineSelect
          options={models.map((m) => ({ value: m, label: m }))}
          value={model}
          onChange={(val) => onModelChange(val as Model)}
          size="sm"
        />
        <button
          onClick={onToggleWebSearch}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "active:scale-[0.97]",
            webSearch
              ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/30 dark:text-green-400"
              : "border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <SearchIcon className="h-3.5 w-3.5" />
          Search web
        </button>
        <button
          onClick={onToggleDark}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          title="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {shareFeedback && (
          <span className="animate-fadeSlide rounded-md bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">{shareFeedback}</span>
        )}
        {exportFeedback && (
          <span className="animate-fadeSlide rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{exportFeedback}</span>
        )}
        <button
          onClick={onShare}
          className={cn(
            "rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground",
            "transition-all hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "active:scale-[0.97]",
          )}
        >
          Share
        </button>
        <button
          onClick={onExport}
          className={cn(
            "rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground",
            "transition-all hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "active:scale-[0.97]",
          )}
        >
          Export
        </button>
      </div>
    </div>
  );
}
