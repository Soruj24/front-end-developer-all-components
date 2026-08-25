"use client";

import { SHORTCUTS } from "./PromptBuilder.constants";

export function PromptBuilderHelp() {
  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-border/60 bg-card p-2 shadow-popover ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Keyboard Shortcuts
      </p>
      <div className="flex flex-col">
        {SHORTCUTS.map((shortcut) => (
          <div
            key={shortcut.keys}
            className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5"
          >
            <span className="text-sm text-muted-foreground">
              {shortcut.label}
            </span>
            <kbd className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
              {shortcut.keys}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
