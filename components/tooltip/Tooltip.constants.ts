export const TOOLTIP_DEFAULTS = {
  placement: "top",
  arrowOffset: 8,
  contentOffset: 8,
  arrowSize: 8,
  portal: true,
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
  animationDuration: 150,
  animationEase: "ease-out",
  zIndex: 50,
} as const;

export const TOOLTIP_PLACEMENTS = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
] as const;

export const TOOLTIP_ANIMATION_EASING = {
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;
