import type { Breakpoint } from "../types";

export const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  { id: "base", label: "Base", minWidth: 0 },
  { id: "sm", label: "SM", minWidth: 640 },
  { id: "md", label: "MD", minWidth: 768 },
  { id: "lg", label: "LG", minWidth: 1024 },
];

export const BASE_BREAKPOINT = DEFAULT_BREAKPOINTS[0];

export function breakpointIndex(bps: Breakpoint[], id: string): number {
  const index = bps.findIndex((bp) => bp.id === id);
  return index < 0 ? 0 : index;
}
