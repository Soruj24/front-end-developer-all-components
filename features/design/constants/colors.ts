/**
 * Premium SaaS color palette — OKLCH-based, theme-aware.
 *
 * Every value maps to a CSS custom property defined in `styles/globals.css`.
 * Components should import from this module rather than hardcoding values,
 * ensuring the design system stays the single source of truth.
 */

export const colors = {
  // — Surfaces
  background: "hsl(0 0% 100%)",
  foreground: "hsl(0 0% 6%) / 0.95",
  surface: "hsl(0 0% 100%)",
  muted: "hsl(0 0% 96.5%)",
  "muted-foreground": "hsl(0 0% 56%)",
  subtle: "hsl(0 0% 62%)",

  // — Lines & focus
  border: "hsl(0 0% 93%)",
  input: "hsl(0 0% 88%)",
  ring: "hsl(280 23% 56% / 0.65)",
  "ring-offset": "hsl(0 0% 100%)",

  // — Brand (primary)
  primary: "hsl(280 23% 56%)",
  "primary-foreground": "hsl(0 0% 96%)",
  "primary-soft": "hsl(280 23% 56% / 0.1)",

  // — Secondary
  secondary: "hsl(280 2% 9.8%)",
  "secondary-foreground": "hsl(0 0% 96%)",

  // — Status
  success: "hsl(340 36% 42%)",
  "success-foreground": "hsl(0 0% 96%)",
  "success-soft": "hsl(340 36% 42% / 0.12)",

  warning: "hsl(75 76% 56%)",
  "warning-foreground": "hsl(0 0% 96%)",
  "warning-soft": "hsl(75 64% 56% / 0.16)",

  danger: "hsl(18 84% 48%)",
  "danger-foreground": "hsl(0 0% 96%)",
  "danger-soft": "hsl(18 84% 48% / 0.12)",

  info: "hsl(225 72% 56%)",
  "info-foreground": "hsl(0 0% 96%)",
  "info-soft": "hsl(225 72% 56% / 0.12)",

  // — Shadows
  "shadow-xs": "0 1px 2px 0 hsl(0 0% 56% / 0.06)",
  "shadow-sm": "0 1px 3px 0 hsl(0 0% 56% / 0.10), 0 1px 2px -1px hsl(0 0% 56% / 0.10)",
  "shadow-card": "0 1px 2px 0 hsl(0 0% 56% / 0.06), 0 8px 24px -4px hsl(0 0% 20% / 0.08)",
  "shadow-modal":
    "0 8px 16px -4px hsl(0 0% 20% / 0.18), 0 24px 64px -8px hsl(0 0% 20% / 0.28)",
} as const;

export type ColorToken = keyof typeof colors;

export const colorKeys = Object.keys(colors) as ColorToken[];
