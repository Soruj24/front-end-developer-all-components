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

const actionBtn =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent";

export function TerminalEmulatorHeader({
  theme,
  username,
  hostname,
  copied,
  onCopy,
  onCycleTheme,
  onClear,
}: TerminalEmulatorHeaderProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 border-b px-4 py-2.5 backdrop-blur-sm"
      style={{ background: theme.header, borderColor: theme.border }}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform hover:scale-110" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110" />
      </div>
      <span
        className="ml-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
        style={{ color: theme.dim }}
      >
        <TerminalIcon className="h-3.5 w-3.5" />
        {username}@{hostname}
        <span className="opacity-50">&mdash;</span>
        <span className="opacity-70">{theme.label}</span>
      </span>
      <div className="ml-auto flex items-center gap-0.5">
        <button
          type="button"
          title="Copy transcript"
          aria-label="Copy transcript"
          onClick={onCopy}
          className={actionBtn}
          style={{ color: theme.dim }}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" style={{ color: theme.success }} />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          title="Cycle theme"
          aria-label="Cycle theme"
          onClick={onCycleTheme}
          className={actionBtn}
          style={{ color: theme.dim }}
        >
          <PaletteIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Clear screen (Ctrl+L)"
          aria-label="Clear screen"
          onClick={onClear}
          className={actionBtn}
          style={{ color: theme.dim }}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
