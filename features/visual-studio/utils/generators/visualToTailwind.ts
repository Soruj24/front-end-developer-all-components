import type { VisualProps } from "../../types/canvas";
import { colorToTailwind, pxToTailwind } from "./tailwind";

export function visualToTailwind(visual: VisualProps): string[] {
  const classes: string[] = [];
  const { padding, margin } = visual;

  if (padding.top) classes.push(`pt-[${padding.top}px]`);
  if (padding.right) classes.push(`pr-[${padding.right}px]`);
  if (padding.bottom) classes.push(`pb-[${padding.bottom}px]`);
  if (padding.left) classes.push(`pl-[${padding.left}px]`);
  if (padding.top && padding.right === padding.top && padding.bottom === padding.top && padding.left === padding.top) {
    classes.push(`p-[${padding.top}px]`);
  }

  if (margin.top) classes.push(`mt-[${margin.top}px]`);
  if (margin.right) classes.push(`mr-[${margin.right}px]`);
  if (margin.bottom) classes.push(`mb-[${margin.bottom}px]`);
  if (margin.left) classes.push(`ml-[${margin.left}px]`);
  if (margin.top && margin.right === margin.top && margin.bottom === margin.top && margin.left === margin.top) {
    classes.push(`m-[${margin.top}px]`);
  }

  if (visual.display) classes.push(visual.display);
  if (visual.flexDirection) classes.push(visual.flexDirection);
  if (visual.gap) classes.push(`gap-[${visual.gap}px]`);

  if (visual.background.color) classes.push(colorToTailwind(visual.background.color, "bg"));
  if (visual.background.gradientFrom || visual.background.gradientVia || visual.background.gradientTo) {
    classes.push(`bg-gradient-${visual.background.gradientDirection || "to-r"}`);
    if (visual.background.gradientFrom) classes.push(colorToTailwind(visual.background.gradientFrom, "from"));
    if (visual.background.gradientVia) classes.push(colorToTailwind(visual.background.gradientVia, "via"));
    if (visual.background.gradientTo) classes.push(colorToTailwind(visual.background.gradientTo, "to"));
  }

  if (visual.border.radius) classes.push(`rounded-[${visual.border.radius}px]`);
  if (visual.border.width) classes.push(`border-[${visual.border.width}px]`);
  if (visual.border.color) classes.push(colorToTailwind(visual.border.color, "border"));
  if (visual.border.style && visual.border.style !== "none") classes.push(visual.border.style);

  if (visual.typography.fontSize) classes.push(`text-[${visual.typography.fontSize}px]`);
  if (visual.typography.fontWeight) classes.push(`font-${visual.typography.fontWeight}`);
  if (visual.typography.fontFamily) classes.push(`font-${visual.typography.fontFamily}`);
  if (visual.typography.lineHeight) classes.push(`leading-[${visual.typography.lineHeight}]`);
  if (visual.typography.letterSpacing) classes.push(`tracking-[${visual.typography.letterSpacing}]`);
  if (visual.typography.textAlign) classes.push(visual.typography.textAlign);
  if (visual.typography.textTransform) classes.push(visual.typography.textTransform);
  if (visual.typography.textDecoration) classes.push(visual.typography.textDecoration);
  if (visual.typography.color) classes.push(colorToTailwind(visual.typography.color, "text"));

  if (visual.effects.shadow) classes.push(visual.effects.shadow);
  if (visual.effects.opacity !== undefined && visual.effects.opacity < 100) {
    classes.push(`opacity-${visual.effects.opacity}`);
  }
  if (visual.effects.blur) classes.push(`blur-[${visual.effects.blur}px]`);

  if (visual.hover.enabled) {
    if (visual.hover.backgroundColor) classes.push(`hover:${colorToTailwind(visual.hover.backgroundColor, "bg").replace("bg-", "")}`);
    if (visual.hover.textColor) classes.push(`hover:${colorToTailwind(visual.hover.textColor, "text").replace("text-", "")}`);
    if (visual.hover.scale) classes.push(`hover:scale-${visual.hover.scale}`);
    if (visual.hover.shadow) classes.push(`hover:${visual.hover.shadow}`);
  }

  if (visual.focus.enabled) {
    if (visual.focus.ringColor) classes.push(`focus:ring-[${visual.focus.ringColor}]`);
    if (visual.focus.ringWidth) classes.push(`focus:ring-[${visual.focus.ringWidth}px]`);
    classes.push("focus:outline-none");
  }

  if (visual.darkMode.enabled) {
    if (visual.darkMode.backgroundColor) classes.push(`dark:bg-[${visual.darkMode.backgroundColor}]`);
    if (visual.darkMode.textColor) classes.push(`dark:text-[${visual.darkMode.textColor}]`);
  }

  return classes.filter(Boolean);
}
