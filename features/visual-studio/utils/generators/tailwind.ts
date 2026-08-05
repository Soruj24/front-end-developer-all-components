import type { CanvasNode, VisualProps } from "../../types/canvas";
import { getComponentDef } from "../../constants/components";
import {
  spacingToTailwind, borderRadiusToTailwind, shadowToTailwind,
  variantToTailwind, sizeToTailwind, borderWidthToTailwind,
  textAlignToTailwind, fontWeightToTailwind, flexDirectionToTailwind,
  alignItemsToTailwind, justifyContentToTailwind,
} from "../tailwindMap";
import { visualToTailwind } from "./visualToTailwind";

export function pxToTailwind(px: number): string | null {
  const rem = px / 4;
  if (rem === 0) return null;
  if (rem % 1 !== 0) return `[${px}px]`;
  const map: Record<number, string> = {
    0.25: "0.5", 0.5: "1", 0.75: "1.5", 1: "2", 1.25: "2.5", 1.5: "3",
    2: "4", 2.5: "5", 3: "6", 3.5: "7", 4: "8", 5: "10", 6: "12",
    7: "14", 8: "16", 9: "20", 10: "24", 12: "28", 14: "32", 16: "36",
  };
  return map[rem] ?? `[${px}px]`;
}

export function colorToTailwind(color: string, prefix: string): string {
  if (color.startsWith("#")) return `${prefix}-[${color}]`;
  if (color.startsWith("rgb")) return `${prefix}-[${color}]`;
  return `${prefix}-${color}`;
}

function dedupeClasses(classes: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const cls of classes) {
    if (!cls || seen.has(cls)) continue;
    const base = cls.replace(/^(hover|focus|dark|sm|md|lg|xl|2xl):/, "");
    if (seen.has(base)) continue;
    seen.add(base);
    result.push(cls);
  }
  return result;
}

export function nodeToTailwindClasses(node: CanvasNode): string {
  const def = getComponentDef(node.componentName);
  if (!def) return "";
  const classes: string[] = [];
  const p = node.props;

  if (typeof p.variant === "string") {
    const v = variantToTailwind(node.componentName, p.variant);
    if (v) classes.push(v);
  }
  if (typeof p.size === "string" && node.componentName !== "progress") {
    const s = sizeToTailwind(node.componentName, p.size);
    if (s) classes.push(s);
  }
  if (typeof p.borderRadius === "number") {
    const r = borderRadiusToTailwind(p.borderRadius);
    if (r) classes.push(r);
  }
  if (typeof p.shadow === "string") {
    const s = shadowToTailwind(p.shadow);
    if (s) classes.push(s);
  }
  if (typeof p.borderWidth === "number" && typeof p.borderStyle === "string") {
    const bw = borderWidthToTailwind(p.borderWidth, p.borderStyle, p.borderColor as string || "");
    if (bw) classes.push(bw);
  }
  if (typeof p.backgroundColor === "string" && p.backgroundColor) {
    classes.push(colorToTailwind(p.backgroundColor, "bg"));
  }
  if (typeof p.color === "string" && p.color) {
    classes.push(colorToTailwind(p.color, "text"));
  }
  if (typeof p.fontSize === "number") classes.push(`text-[${p.fontSize}px]`);
  if (typeof p.fontWeight === "string") {
    const fw = fontWeightToTailwind(p.fontWeight);
    if (fw) classes.push(fw);
  }
  if (typeof p.textAlign === "string") {
    const ta = textAlignToTailwind(p.textAlign);
    if (ta) classes.push(ta);
  }
  if (typeof p.lineHeight === "number") classes.push(`leading-[${p.lineHeight}]`);
  if (typeof p.display === "string" && p.display === "flex") {
    classes.push("flex");
    if (typeof p.flexDirection === "string") classes.push(flexDirectionToTailwind(p.flexDirection));
    if (typeof p.alignItems === "string") classes.push(alignItemsToTailwind(p.alignItems));
    if (typeof p.justifyContent === "string") classes.push(justifyContentToTailwind(p.justifyContent));
  }
  if (typeof p.gap === "number" && p.gap > 0) {
    const gapVal = pxToTailwind(p.gap as number);
    if (gapVal) classes.push(`gap-${gapVal}`);
  }
  classes.push(...spacingToTailwind(p));
  if (typeof p.disabled === "boolean" && p.disabled) classes.push("disabled:pointer-events-none disabled:opacity-50");
  if (typeof p.objectFit === "string") classes.push(`object-${p.objectFit}`);
  if (typeof p.textDecoration === "string" && p.textDecoration === "underline") classes.push("underline");

  classes.push(...visualToTailwind(node.visual));
  return dedupeClasses(classes).join(" ");
}
