export const TOKEN_RE = /\{\{\s*([\w.-]+)\s*\}\}/g;
export const MAX_HISTORY = 40;
export const DEFAULT_MAX_LENGTH = 4000;

export const editorBase =
  "min-h-[180px] w-full resize-none overflow-hidden bg-transparent px-3.5 py-3 font-mono text-[13px] leading-[1.6] whitespace-pre-wrap break-words outline-none";

export const SHORTCUTS: Array<{ keys: string; label: string }> = [
  { keys: "Ctrl / ⌘ + Enter", label: "Copy prompt" },
  { keys: "Ctrl / ⌘ + Z", label: "Undo" },
  { keys: "Ctrl / ⌘ + Shift + Z", label: "Redo" },
  { keys: "Ctrl / ⌘ + B", label: "Bold  **text**" },
  { keys: "Ctrl / ⌘ + I", label: "Italic  *text*" },
  { keys: "Ctrl / ⌘ + Shift + B", label: "Bullet list" },
  { keys: "Ctrl / ⌘ + K", label: "Toggle shortcuts" },
];

export const ICON = {
  copy: "M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1M16 3h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2M8 5h8M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2",
  check: "M5 13l4 4L19 7",
  undo: "M9 14L4 9l5-5M4 9h10.5a5.5 5.5 0 1 1 0 11H11",
  redo: "M15 14l5-5-5-5M20 9H9.5a5.5 5.5 0 1 0 0 11H13",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M4 21h16",
  upload: "M12 21V9m0 0l-4 4m4-4l4 4M4 3h16",
  reset: "M3 12a9 9 0 1 0 2.64-6.36L3 8M3 3v5h5",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01",
  plus: "M12 5v14M5 12h14",
  trash: "M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16",
  chevronUp: "M18 15l-6-6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  sparkles: "M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z",
};
