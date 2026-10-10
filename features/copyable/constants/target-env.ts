export const TARGET_ENV = {
  framework: "Next.js 16 (App Router) or React 19",
  react: "react@^19",
  typescript: "typescript@^5",
  tailwind: "tailwindcss@^4 (@tailwindcss/postcss)",
} as const;

export const CN_SOURCE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export const CN_INSTALL = "npm install clsx tailwind-merge";

export const SETUP_NOTES: string[] = [
  "Tailwind v4 design tokens (bg-background, text-foreground, border-border, ...) must exist in your theme.",
  "Components support light and dark mode via the `dark` class.",
  'Add `"use client"` at the top of the file when the component uses state, effects, or browser APIs.',
];
