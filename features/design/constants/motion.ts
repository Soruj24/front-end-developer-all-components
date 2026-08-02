/**
 * Premium SaaS motion system.
 *
 * Subtle, purposeful animations inspired by Vercel's fluid transitions.
 * Everything feels responsive without being distracting.
 */

export const durations = {
  instant: "0ms",
  fast: "150ms",
  base: "200ms",
  slow: "400ms",
  slower: "600ms",
} as const;

export const easings = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
} as const;

export const transitions = {
  quick: `150ms ${easings.standard}`,
  smooth: `200ms ${easings.out}`,
  elastic: `400ms ${easings.spring}`,
  standard: `200ms ${easings.standard}`,
} as const;

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Transition = keyof typeof transitions;
