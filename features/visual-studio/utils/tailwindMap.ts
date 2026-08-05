function pxToTailwind(px: number): string | null {
  const rem = px / 4;
  if (rem === 0) return null;
  if (rem % 1 !== 0) return `[${px}px]`;
  const mapping: Record<number, string> = {
    0.25: "0.5", 0.5: "1", 0.75: "1.5", 1: "2", 1.25: "2.5", 1.5: "3",
    2: "4", 2.5: "5", 3: "6", 3.5: "7", 4: "8", 5: "10", 6: "12",
    7: "14", 8: "16", 9: "20", 10: "24", 12: "28", 14: "32", 16: "36",
  };
  return mapping[rem] ?? `[${px}px]`;
}

function spacingClass(prefix: string, value: number): string | null {
  if (value === 0) return null;
  const tw = pxToTailwind(value);
  return tw ? `${prefix}-${tw}` : null;
}

export function spacingToTailwind(props: Record<string, unknown>): string[] {
  const classes: string[] = [];
  const map: Record<string, string> = {
    paddingTop: "pt", paddingRight: "pr", paddingBottom: "pb", paddingLeft: "pl",
    marginTop: "mt", marginRight: "mr", marginBottom: "mb", marginLeft: "ml",
  };
  for (const [key, prefix] of Object.entries(map)) {
    const val = props[key];
    if (typeof val === "number" && val > 0) {
      const cls = spacingClass(prefix, val);
      if (cls) classes.push(cls);
    }
  }
  return classes;
}

export function borderRadiusToTailwind(value: number): string {
  if (value === 0) return "";
  if (value === 999) return "rounded-full";
  const tw = pxToTailwind(value);
  return tw ? `rounded-${tw}` : `rounded-[${value}px]`;
}

export function shadowToTailwind(value: string): string {
  if (!value || value === "none") return "";
  const map: Record<string, string> = {
    "0 1px 2px 0 rgb(0 0 0 / 0.05)": "shadow-xs",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)": "shadow-sm",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)": "shadow-md",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)": "shadow-lg",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)": "shadow-xl",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)": "shadow-2xl",
  };
  return map[value] ?? `shadow-[${value}]`;
}

export function variantToTailwind(componentId: string, variant: string): string {
  const maps: Record<string, Record<string, string>> = {
    button: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-background text-foreground hover:bg-muted",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      destructive: "bg-danger text-danger-foreground hover:bg-danger/90",
    },
    badge: {
      primary: "bg-primary/10 text-primary",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      danger: "bg-danger/10 text-danger",
      outline: "border border-border text-foreground",
    },
    alert: {
      info: "bg-info/10 text-info border-info/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      danger: "bg-danger/10 text-danger border-danger/20",
    },
  };
  return maps[componentId]?.[variant] ?? "";
}

export function sizeToTailwind(componentId: string, size: string): string {
  const maps: Record<string, Record<string, string>> = {
    button: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    },
    avatar: {
      sm: "h-8 w-8 text-xs",
      md: "h-12 w-12 text-sm",
      lg: "h-16 w-16 text-base",
      xl: "h-24 w-24 text-lg",
    },
  };
  return maps[componentId]?.[size] ?? "";
}

export function borderWidthToTailwind(width: number, style: string, _color: string): string {
  if (width === 0 || style === "none") return "";
  const widthMap: Record<number, string> = { 1: "border", 2: "border-2", 4: "border-4", 8: "border-8" };
  const cls = widthMap[width] ?? `border-[${width}px]`;
  const styleMap: Record<string, string> = { solid: "", dashed: "border-dashed", dotted: "border-dotted" };
  return `${cls} ${styleMap[style] ?? ""}`.trim();
}

export function textAlignToTailwind(align: string): string {
  const map: Record<string, string> = { left: "text-left", center: "text-center", right: "text-right" };
  return map[align] ?? "";
}

export function fontWeightToTailwind(weight: string): string {
  const map: Record<string, string> = {
    "300": "font-light", "400": "font-normal", "500": "font-medium",
    "600": "font-semibold", "700": "font-bold", "800": "font-extrabold", "900": "font-black",
  };
  return map[weight] ?? "";
}

export function flexDirectionToTailwind(dir: string): string {
  const map: Record<string, string> = {
    row: "flex-row", col: "flex-col",
    "row-reverse": "flex-row-reverse", "col-reverse": "flex-col-reverse",
  };
  return map[dir] ?? "";
}

export function alignItemsToTailwind(align: string): string {
  const map: Record<string, string> = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
  return map[align] ?? "";
}

export function justifyContentToTailwind(justify: string): string {
  const map: Record<string, string> = {
    "flex-start": "justify-start", center: "justify-center",
    "flex-end": "justify-end", "space-between": "justify-between",
  };
  return map[justify] ?? "";
}
