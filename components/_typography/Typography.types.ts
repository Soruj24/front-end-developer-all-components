import type { ReactNode, ElementType } from "react";

export type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p" | "span" | "blockquote" | "code" | "pre" | "label" | "small";

export interface TypographyProps {
  as?: ElementType;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
}
