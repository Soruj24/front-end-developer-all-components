export interface Shade {
  weight: number;
  hex: string;
}

export const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const full = hex.replace("#", "");
  const safe = /^[0-9a-fA-F]{6}$/.test(full) ? full : "000000";
  return {
    r: parseInt(safe.slice(0, 2), 16),
    g: parseInt(safe.slice(2, 4), 16),
    b: parseInt(safe.slice(4, 6), 16),
  };
}

export function generateShades(hex: string): Shade[] {
  const { r, g, b } = hexToRgb(hex);
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => {
    const factor = 1 - (weight - 500) / 1000;
    const nr = Math.round(r * factor + (255 - r) * (1 - factor) * 0.3);
    const ng = Math.round(g * factor + (255 - g) * (1 - factor) * 0.3);
    const nb = Math.round(b * factor + (255 - b) * (1 - factor) * 0.3);
    return {
      weight,
      hex: `#${[nr, ng, nb].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")}`,
    };
  });
}

export const CHECKER_BACKGROUND =
  `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23ccc'/%3E%3Crect x='5' y='5' width='5' height='5' fill='%23ccc'/%3E%3C/svg%3E")`;
