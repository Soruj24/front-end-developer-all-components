"use client";

import type { TermTheme } from "./TerminalEmulator.types";
import { TerminalIcon, CopyIcon, CheckIcon, TrashIcon, PaletteIcon } from "./TerminalEmulator.icons";

interface TerminalEmulatorHeaderProps {
  theme: TermTheme;
  username: string;
  hostname: string;
  copied: boolean;
  onCopy: () => void;
  onCycleTheme: () => void;
  onClear: () => void;
}

const headerButton = "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/10 dark:hover:bg-white/10";

export function TerminalEmulatorHeader({ theme, username, hostname, copied, onCopy, onCycleTheme, onClear }: TerminalEmulatorHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2" style={{ background: theme.header, borderColor: theme.border }}>
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-2 flex items-center gap-1.5 text-[12px] font-medium" style={{ color: theme.dim }}>
        <TerminalIcon className="h-3.5 w-3.5" />
        {username}@{hostname} — {theme.label}
      </span>
      <div className="ml-auto flex items-center gap-0.5">
        <button type="button" title="Copy transcript" aria-label="Copy transcript" onClick={onCopy} className={headerButton} style={{ color: theme.dim }}>
          {copied ? <CheckIcon className="h-4 w-4" style={{ color: theme.success }} /> : <CopyIcon className="h-4 w-4" />}
        </button>
        <button type="button" title="Cycle theme" aria-label="Cycle theme" onClick={onCycleTheme} className={headerButton} style={{ color: theme.dim }}>
          <PaletteIcon className="h-4 w-4" />
        </button>
        <button type="button" title="Clear screen (Ctrl+L)" aria-label="Clear screen" onClick={onClear} className={headerButton} style={{ color: theme.dim }}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
