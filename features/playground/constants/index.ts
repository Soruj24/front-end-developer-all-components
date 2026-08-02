import type { DevicePreset, LanguageId } from "../types";

/** Device presets for the live preview, from phones to ultra-wide. */
export const DEVICES: DevicePreset[] = [
  { id: "phone-375", label: "375px", width: 375, height: 812, chrome: "mobile" },
  { id: "phone-430", label: "430px", width: 430, height: 932, chrome: "mobile" },
  { id: "tablet-768", label: "768px", width: 768, height: 1024, chrome: "tablet" },
  { id: "laptop-1024", label: "1024px", width: 1024, height: 768, chrome: "browser" },
  { id: "laptop-1280", label: "1280px", width: 1280, height: 800, chrome: "browser" },
  { id: "desktop-1920", label: "1920px", width: 1920, height: 1080, chrome: "browser" },
];

export const DEFAULT_DEVICE_ID = "laptop-1280";

/** Zoom levels for the preview pane. */
export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const DEFAULT_FONT_SIZE = 13;
export const DEFAULT_TAB_SIZE = 2;
export const AUTOSAVE_KEY = "playground:project";
export const AUTOSAVE_DEBOUNCE_MS = 800;
export const AUTO_RUN_DELAY_MS = 650;

export const DEFAULT_SETTINGS = {
  fontSize: DEFAULT_FONT_SIZE,
  tabSize: DEFAULT_TAB_SIZE,
  wordWrap: false,
  minimap: true,
  bracketPairs: true,
  stickyScroll: true,
};

/** Language metadata keyed by file extension (without the dot). */
export const LANGUAGES: Record<string, { id: LanguageId; label: string; icon: string; color: string }> = {
  tsx: { id: "tsx", label: "TypeScript JSX", icon: "t", color: "#3178c6" },
  ts: { id: "ts", label: "TypeScript", icon: "t", color: "#3178c6" },
  jsx: { id: "jsx", label: "JavaScript JSX", icon: "j", color: "#f7df1e" },
  js: { id: "js", label: "JavaScript", icon: "j", color: "#f7df1e" },
  css: { id: "css", label: "CSS", icon: "#", color: "#42a5f5" },
  json: { id: "json", label: "JSON", icon: "{", color: "#8bc34a" },
  md: { id: "md", label: "Markdown", icon: "M", color: "#78909c" },
};

export const ENTRY_FILE = "App.tsx";

/** Regexes used to detect structural markers for sticky scroll and folding. */
export const FOLD_MARKERS: Partial<Record<LanguageId, RegExp>> = {
  tsx: /^(export )?(default )?function |^(export )?const [A-Za-z0-9_$]+\s*=\s*(\(|\{|[A-Za-z0-9_$]+ )?=>|^class /,
  ts: /^(export )?(default )?function |^export (interface|type|const|class)|^(interface|type|class) /,
  css: /^@media|^[.#][^{]+\{/,
  md: /^#{1,3} /,
  json: /^"[\w-]+": \{/,
};

export const STICKY_MARKERS: Partial<Record<LanguageId, RegExp>> = {
  tsx: /^(export )?(default )?function [A-Za-z0-9_$]+|^const [A-Za-z0-9_$]+\s*=\s*\([^)]*\)\s*=>/,
  ts: /^(export )?(default )?function [A-Za-z0-9_$]+|^export (interface|type|class) [A-Za-z0-9_$]+/,
  css: /^@media|^[.#][^{]+\{/,
  md: /^#{1,3} /,
};
