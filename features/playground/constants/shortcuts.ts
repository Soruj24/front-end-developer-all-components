/** Keyboard shortcut metadata surfaced in the command palette and tooltips. */
export interface Shortcut {
  id: string;
  label: string;
  /** Human-readable key combo, e.g. "Ctrl/Cmd+Shift+P". */
  display: string;
}

export const SHORTCUTS: Shortcut[] = [
  { id: "command-palette", label: "Open command palette", display: "Ctrl/Cmd+P" },
  { id: "run", label: "Run / recompile", display: "Ctrl/Cmd+Enter" },
  { id: "format", label: "Format current file", display: "Shift+Alt+F" },
  { id: "save", label: "Save snapshot", display: "Ctrl/Cmd+S" },
  { id: "undo", label: "Undo", display: "Ctrl/Cmd+Z" },
  { id: "redo", label: "Redo", display: "Ctrl/Cmd+Shift+Z" },
  { id: "tab-cycle", label: "Cycle open tabs", display: "Ctrl/Cmd+Tab" },
  { id: "close-tab", label: "Close current tab", display: "Ctrl/Cmd+W" },
  { id: "switch-preview", label: "Focus preview", display: "Ctrl/Cmd+1" },
  { id: "switch-editor", label: "Focus editor", display: "Ctrl/Cmd+2" },
  { id: "toggle-console", label: "Toggle console panel", display: "Ctrl/Cmd+J" },
  { id: "toggle-sidebar", label: "Toggle sidebar", display: "Ctrl/Cmd+B" },
  { id: "toggle-wordwrap", label: "Toggle word wrap", display: "Alt+Z" },
  { id: "toggle-minimap", label: "Toggle minimap", display: "Alt+M" },
  { id: "fullscreen", label: "Fullscreen preview", display: "Ctrl/Cmd+Shift+F" },
  { id: "open-file", label: "Open file", display: "Ctrl/Cmd+P" },
  { id: "add-cursor", label: "Select next occurrence", display: "Ctrl/Cmd+D" },
];

/** Simple, portable key for a "modifier held" check. */
export function isMod(event: KeyboardEvent): boolean {
  return event.metaKey || event.ctrlKey;
}

export function isShift(event: KeyboardEvent): boolean {
  return event.shiftKey;
}

export function isAlt(event: KeyboardEvent): boolean {
  return event.altKey;
}

/** Returns a stable handler id for a normalized chord, or null if unhandled. */
export function chordId(event: KeyboardEvent): string | null {
  const key = event.key.toLowerCase();
  if (!isMod(event)) return null;
  const s = isShift(event);
  const a = isAlt(event);
  const combo = `${s ? "s+" : ""}${a ? "a+" : ""}${key}`;
  const map: Record<string, string> = {
    "p": "command-palette",
    "s+p": "command-palette",
    "enter": "run",
    "s": "save",
    "z": "undo",
    "s+z": "redo",
    "w": "close-tab",
    "b": "toggle-sidebar",
    "j": "toggle-console",
    "1": "switch-preview",
    "2": "switch-editor",
    "d": "add-cursor",
    "s+f": "fullscreen",
    "a+f": "format",
    "a+z": "toggle-wordwrap",
    "a+m": "toggle-minimap",
  };
  return map[combo] ?? null;
}
