import { ReactNode } from "react";

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "code"
  | "lead"
  | "large"
  | "small"
  | "muted";

export interface TypographyProps {
  as?: TypographyElement;
  className?: string;
  children: ReactNode;
}
