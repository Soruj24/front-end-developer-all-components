import type { TermTheme } from "./TerminalEmulator.types";

export const TERMINAL_THEMES: TermTheme[] = [
  { id: "term", label: "Terminal", bg: "#0b0e14", fg: "#cdd6e4", dim: "#5b6472", accent: "#7aa2f7", success: "#9ece6a", warn: "#e0af68", error: "#f7768e", border: "#1f2430", header: "#10141c" },
  { id: "matrix", label: "Matrix", bg: "#04120a", fg: "#3ceb8a", dim: "#1f7a4a", accent: "#3ceb8a", success: "#7dffb0", warn: "#ffd166", error: "#ff5d5d", border: "#0d2b1a", header: "#06180e" },
  { id: "light", label: "Light", bg: "#fafaf9", fg: "#1f2430", dim: "#9ca3af", accent: "#7c3aed", success: "#15803d", warn: "#b45309", error: "#dc2626", border: "#e4e4df", header: "#f1f1ee" },
  { id: "amber", label: "Amber", bg: "#161009", fg: "#f3d9a4", dim: "#8a744d", accent: "#ffb020", success: "#c8f09b", warn: "#ffd166", error: "#ff7b5c", border: "#2c2112", header: "#1d150c" },
  { id: "cyber", label: "Cyber", bg: "#150b22", fg: "#e7dcff", dim: "#7a6a8f", accent: "#ff2e88", success: "#4ade80", warn: "#fbbf24", error: "#ff4d4d", border: "#2d1a45", header: "#1c0f2e" },
  { id: "ocean", label: "Ocean", bg: "#0a1226", fg: "#c3d5ff", dim: "#5c6f96", accent: "#5b8cff", success: "#5eead4", warn: "#fcd34d", error: "#fb7185", border: "#182547", header: "#0d1730" },
];

export function resolveColor(color: string, theme: TermTheme): string {
  switch (color) {
    case "accent": return theme.accent;
    case "success": return theme.success;
    case "warn": return theme.warn;
    case "error": return theme.error;
    case "dim": return theme.dim;
    default: return color.startsWith("#") ? color : theme.fg;
  }
}
