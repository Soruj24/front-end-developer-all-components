export const ASPECT_RATIO_PRESETS: Record<string, number> = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "1:1": 1,
  "2:3": 2 / 3,
  "3:4": 3 / 4,
  "9:16": 9 / 16,
};

export const ASPECT_RATIO_STYLES: Record<string, string> = {
  base: "relative w-full overflow-hidden rounded-lg",
  object: "absolute inset-0 h-full w-full",
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};
