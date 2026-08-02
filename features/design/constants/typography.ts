/**
 * Premium SaaS typography scale.
 *
 * A curated set of font-size, line-height, and font-weight combinations
 * optimized for readability, hierarchy, and vertical rhythm.
 */

export const fontSizes = {
  xs: { fontSize: "0.75rem", lineHeight: "1rem" },
  sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
  base: { fontSize: "1rem", lineHeight: "1.7" },
  lg: { fontSize: "1.125rem", lineHeight: "1.75" },
  xl: { fontSize: "1.25rem", lineHeight: "1.75" },
  "2xl": { fontSize: "1.5rem", lineHeight: "1.2" },
  "3xl": { fontSize: "1.875rem", lineHeight: "1.1" },
  "4xl": { fontSize: "2.25rem", lineHeight: "1.1" },
  "5xl": { fontSize: "3rem", lineHeight: "1.05" },
  "6xl": { fontSize: "3.75rem", lineHeight: "1" },
  "7xl": { fontSize: "4.5rem", lineHeight: "1" },
  "8xl": { fontSize: "6rem", lineHeight: "1" },
} as const;

export const fontWeights = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const fontFamilies = {
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, 'SF Mono', monospace",
} as const;

export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type FontFamily = keyof typeof fontFamilies;
