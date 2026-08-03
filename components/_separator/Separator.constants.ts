export const SEPARATOR_ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;

export type SeparatorOrientation = "horizontal" | "vertical";

export const SEPARATOR_STYLES: Record<string, string> = {
  base: "shrink-0 bg-border",
  horizontal: "h-px w-full",
  vertical: "h-full w-px",
};
