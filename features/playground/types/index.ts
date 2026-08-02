/** Shared types for the Playground IDE. */

export interface PlaygroundFile {
  /** File path relative to the project root, e.g. "Button.tsx" or "src/Button.tsx". */
  name: string;
  source: string;
}

export type LanguageId = "tsx" | "ts" | "jsx" | "js" | "css" | "json" | "md";

export interface DevicePreset {
  id: string;
  label: string;
  width: number;
  height: number;
  /** Device chrome to draw around the frame (browser bar / phone notch). */
  chrome: "browser" | "mobile" | "tablet" | "none";
}

export type SidebarView =
  | "explorer"
  | "open-files"
  | "search"
  | "registry"
  | "assets"
  | "templates"
  | "ai"
  | "history"
  | "bookmarks";

export type BottomTab =
  | "console"
  | "problems"
  | "terminal"
  | "build"
  | "logs"
  | "ai"
  | "quality";

export interface ConsoleEntry {
  id: number;
  kind: "log" | "info" | "debug" | "warn" | "error";
  args: unknown[];
  ts: number;
}

export interface BuildEntry {
  id: number;
  kind: "info" | "success" | "error" | "warn";
  message: string;
  ts: number;
}

export interface Problem {
  id: number;
  severity: "error" | "warning" | "info";
  file: string;
  line: number;
  column: number;
  message: string;
  source: "compiler" | "lint";
}

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  bracketPairs: boolean;
  stickyScroll: boolean;
}

export interface QualityScores {
  accessibility: number;
  performance: number;
  typeSafety: number;
  responsive: number;
  tailwind: number;
  complexity: number;
  issues: Array<{ severity: "error" | "warning" | "info"; label: string }>;
}

export interface HistorySnapshot {
  id: string;
  ts: number;
  label: string;
  files: PlaygroundFile[];
}

export interface Bookmark {
  id: string;
  file: string;
  line: number;
  label: string;
  ts: number;
}

export interface DiffResult {
  lines: Array<{ type: "same" | "add" | "remove"; text: string }>;
}
