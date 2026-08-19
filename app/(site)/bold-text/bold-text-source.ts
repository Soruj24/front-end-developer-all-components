export const BOLD_TEXT_SOURCE = `"use client";

export type BoldTextWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
export type BoldTextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const weights: Record<BoldTextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const sizes: Record<BoldTextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

interface BoldTextProps {
  children: React.ReactNode;
  weight?: BoldTextWeight;
  size?: BoldTextSize;
  className?: string;
}

export function BoldText({
  children,
  weight = "bold",
  size = "base",
  className,
}: BoldTextProps) {
  return (
    <span className={[weights[weight], sizes[size], className].join(" ")}>
      {children}
    </span>
  );
}`;

export const WEIGHT_EXAMPLE = `<BoldText weight="extrabold" size="2xl">
  The quick brown fox jumps over the lazy dog
</BoldText>`;

export const SCALE_EXAMPLE = `<BoldText size="sm">Heading Text</BoldText>
<BoldText size="lg">Heading Text</BoldText>
<BoldText size="4xl">Heading Text</BoldText>`;

export const HIERARCHY_EXAMPLE = `<h1 className="text-4xl font-extrabold tracking-tight">Page Title</h1>
<h2 className="text-2xl font-bold tracking-tight">Section Heading</h2>
<h3 className="text-xl font-semibold">Subsection</h3>
<p className="text-sm text-muted-foreground">Body text</p>`;

export const ARTICLE_EXAMPLE = `<h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
<p className="text-sm leading-relaxed text-muted-foreground">
  React Server Components represent a fundamental shift...
</p>
<li className="flex items-start gap-2">
  <Check className="h-4 w-4 text-emerald-500" />
  <span className="font-semibold text-foreground">Zero client-side JS</span>
</li>`;

export const CARDS_EXAMPLE = `<span className="text-sm font-medium">{card.title}</span>
<span className="text-3xl font-extrabold tabular-nums">{card.price}</span>
<span className="text-sm">{card.description}</span>`;

export const INLINE_EXAMPLE = `<span className="text-sm font-bold text-foreground">Bold Text</span>
<span className="text-sm italic text-foreground">Italic Text</span>
<span className="text-sm font-extrabold uppercase tracking-wider">Uppercase Bold</span>`;

export const LABEL_EXAMPLE = `<span className="rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">Primary</span>
<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">Success</span>
<span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">Error</span>`;