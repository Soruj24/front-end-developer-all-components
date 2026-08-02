/**
 * Premium SaaS elevation system.
 *
 * Uses minimal, theme-aware shadows with OKLCH color space.
 * Shadows convey subtle depth — never heavy or distracting.
 */

export const shadows = {
  xs: "0 1px 2px 0 hsl(0 0% 56% / 0.05)",
  sm: "0 1px 3px 0 hsl(0 0% 56% / 0.08), 0 1px 2px -1px hsl(0 0% 56% / 0.05)",
  md: "0 4px 6px -1px hsl(0 0% 56% / 0.08), 0 2px 4px -2px hsl(0 0% 56% / 0.05)",
  lg:
    "0 10px 15px -3px hsl(0 0% 56% / 0.08), 0 4px 6px -4px hsl(0 0% 56% / 0.05)",
  xl: "0 20px 25px -5px hsl(0 0% 56% / 0.08), 0 8px 10px -6px hsl(0 0% 56% / 0.04)",
  card: "0 1px 2px 0 hsl(0 0% 56% / 0.04), 0 8px 24px -4px hsl(0 0% 20% / 0.08)",
  modal: "0 8px 16px -4px hsl(0 0% 20% / 0.12), 0 24px 64px -8px hsl(0 0% 20% / 0.24)",
  interactive:
    "0 4px 12px -2px hsl(0 0% 20% / 0.10), 0 16px 40px -8px hsl(0 0% 20% / 0.16)",
} as const;

export const shadowKeys = Object.keys(shadows) as (keyof typeof shadows)[];
export type ShadowKey = keyof typeof shadows;
