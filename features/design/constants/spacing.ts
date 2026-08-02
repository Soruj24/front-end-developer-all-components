/**
 * Premium SaaS spacing system.
 * Base unit: 4px (0.25rem). Scale follows a 1.25x ratio for visual rhythm.
 */

export const space = {
  "0": "0",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
} as const;

export const radii = {
  xs: "0.125rem",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.5rem",
  "4xl": "2rem",
  full: "9999px",
} as const;

export const layout = {
  maxWidth: {
    sm: "38rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "88rem",
    "3xl": "96rem",
    "4xl": "104rem",
    "5xl": "120rem",
    "6xl": "1400px",
  },
  container: {
    padding: {
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
    },
  },
  breakpoints: {
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "88rem",
  } as const,
} as const;

export type SpaceKey = keyof typeof space;
export type RadiusKey = keyof typeof radii;
