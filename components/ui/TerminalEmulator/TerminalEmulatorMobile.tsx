"use client";

import type { TermTheme } from "./TerminalEmulator.types";
import { ChevronUpIcon, ChevronDownIcon } from "./TerminalEmulator.icons";

const mobileButton = "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[12px] font-semibold transition-colors hover:bg-black/10 dark:hover:bg-white/10";

interface TerminalEmulatorMobileProps {
  theme: TermTheme;
  busy: boolean;
  onHistoryPrev: () => void;
  onHistoryNext: () => void;
  onSubmit: () => void;
}

export function TerminalEmulatorMobile({ theme, busy, onHistoryPrev, onHistoryNext, onSubmit }: TerminalEmulatorMobileProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t px-2 py-1.5 md:hidden" style={{ background: theme.header, borderColor: theme.border }}>
      <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.dim }}>{busy ? "running…" : "terminal"}</span>
      <div className="flex items-center gap-1">
        <button type="button" onClick={onHistoryPrev} aria-label="Previous command" className={mobileButton} style={{ color: theme.fg }}><ChevronUpIcon className="h-4 w-4" /></button>
        <button type="button" onClick={onHistoryNext} aria-label="Next command" className={mobileButton} style={{ color: theme.fg }}><ChevronDownIcon className="h-4 w-4" /></button>
        <button type="button" onClick={onSubmit} disabled={busy} aria-label="Run command" className={mobileButton} style={{ color: theme.fg, border: `1px solid ${theme.border}`, borderRadius: 8 }}>⏎</button>
      </div>
    </div>
  );
}
