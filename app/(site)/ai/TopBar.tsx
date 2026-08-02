"use client";

import { models } from "./data";
import { MenuIcon, SearchIcon, SunIcon, MoonIcon } from "./icons";
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
    <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border">
      <div className="flex items-center gap-3">
        {!sidebarVisible && (
          <button onClick={onToggleSidebar} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted dark:hover:bg-muted">
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value as Model)}
          className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground outline-none focus:border-blue-500 dark:border-border dark:bg-muted dark:text-zinc-200"
        >
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button
          onClick={onToggleWebSearch}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            webSearch
              ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/30 dark:text-green-400"
              : "border-border text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
          }`}
        >
          <SearchIcon className="h-3.5 w-3.5" />
          Search web
        </button>
        <button
          onClick={onToggleDark}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted dark:hover:bg-muted"
          title="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {shareFeedback && (
          <span className="animate-fadeSlide rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">{shareFeedback}</span>
        )}
        {exportFeedback && (
          <span className="animate-fadeSlide rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{exportFeedback}</span>
        )}
        <button
          onClick={onShare}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
        >
          Share
        </button>
        <button
          onClick={onExport}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
        >
          Export
        </button>
      </div>
    </div>
  );
}
