export type SeparatorVariant = "solid" | "dashed" | "dotted" | "gradient";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  variant?: SeparatorVariant;
  className?: string;
}
