import type { CanvasNode } from "../../types/canvas";
import { pxToTailwind } from "./tailwind";

interface ResponsiveBreakpoint {
  prefix: string;
  minWidth: number;
}

const BREAKPOINTS: ResponsiveBreakpoint[] = [
  { prefix: "sm", minWidth: 640 },
  { prefix: "md", minWidth: 768 },
  { prefix: "lg", minWidth: 1024 },
  { prefix: "xl", minWidth: 1280 },
  { prefix: "2xl", minWidth: 1536 },
];

function generateResponsivePadding(
  prefix: string,
  value: number
): string {
  const tw = pxToTailwind(value);
  return tw ? `${prefix}:p-${tw}` : `${prefix}:p-[${value}px]`;
}

function generateResponsiveTypography(
  prefix: string,
  fontSize: number,
  fontWeight?: string
): string[] {
  const classes: string[] = [];
  const tw = pxToTailwind(fontSize);
  if (tw) classes.push(`${prefix}:text-${tw}`);
  if (fontWeight) classes.push(`${prefix}:font-${fontWeight}`);
  return classes;
}

function generateResponsiveLayout(
  prefix: string,
  display: string,
  gap?: number
): string[] {
  const classes: string[] = [`${prefix}:${display}`];
  if (gap) {
    const tw = pxToTailwind(gap);
    if (tw) classes.push(`${prefix}:gap-${tw}`);
  }
  return classes;
}

export function generateResponsiveClasses(nodes: Record<string, CanvasNode>): string[] {
  const responsiveClasses: string[] = [];

  for (const node of Object.values(nodes)) {
    if (!node.responsive) continue;

    for (const bp of BREAKPOINTS) {
      const override = node.responsive[bp.prefix as keyof typeof node.responsive];
      if (!override) continue;

      if (typeof override.width === "number" && override.width) {
        const tw = pxToTailwind(override.width);
        if (tw) responsiveClasses.push(`${bp.prefix}:w-${tw}`);
      }
      if (typeof override.height === "number" && override.height) {
        const tw = pxToTailwind(override.height);
        if (tw) responsiveClasses.push(`${bp.prefix}:h-${tw}`);
      }
    }
  }

  return [...new Set(responsiveClasses)];
}

export function generateResponsiveOutput(nodes: Record<string, CanvasNode>): string {
  const classes = generateResponsiveClasses(nodes);
  if (classes.length === 0) return "";

  const lines: string[] = [
    "/* Responsive Classes */",
    "/* Add these classes to your component for responsive behavior */",
    "",
  ];

  for (const bp of BREAKPOINTS) {
    const bpClasses = classes.filter((c) => c.startsWith(`${bp.prefix}:`));
    if (bpClasses.length > 0) {
      lines.push(`/* ${bp.prefix.toUpperCase()} (${bp.minWidth}px+) */`);
      lines.push(bpClasses.join(" "));
      lines.push("");
    }
  }

  return lines.join("\n");
}

export function generateMediaQueries(nodes: Record<string, CanvasNode>): string {
  const lines: string[] = [];

  for (const bp of BREAKPOINTS) {
    const hasOverride = Object.values(nodes).some(
      (n) => n.responsive?.[bp.prefix as keyof typeof n.responsive]
    );
    if (hasOverride) {
      lines.push(`@media (min-width: ${bp.minWidth}px) {`);
      lines.push("  /* Responsive styles */");
      lines.push("}");
      lines.push("");
    }
  }

  return lines.join("\n");
}
