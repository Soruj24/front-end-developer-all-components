import type { BoxValue, WidthHeightValue } from "../types";
import { getShadowPreset } from "../constants";

/** Renders a four-side box value as a CSS shorthand (px). */
export function boxToCss(box: BoxValue | undefined, fallback = 0): string {
  if (!box) return `${fallback}px`;
  const { top, right, bottom, left } = box;
  return `${top}px ${right}px ${bottom}px ${left}px`;
}

/** Renders a width/height value as a CSS size string. */
export function sizeToCss(value: WidthHeightValue | undefined): string | undefined {
  if (!value || value.auto) return undefined;
  return `${value.value}${value.unit}`;
}

/** Maps a stored shadow id to its CSS shadow value. */
export function shadowToCss(id: string | undefined): string {
  if (!id) return "none";
  return getShadowPreset(id).css;
}

/** React.CSSProperties for a box value (padding/margin/borderRadius). */
export function boxStyle(kind: "padding" | "margin" | "borderRadius", box: BoxValue | undefined) {
  const css = boxToCss(box);
  return kind === "padding"
    ? { padding: css }
    : kind === "margin"
      ? { margin: css }
      : { borderRadius: css };
}
