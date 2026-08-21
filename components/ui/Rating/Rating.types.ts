export type RatingSize = "sm" | "md" | "lg";

export type RatingColor = "amber" | "yellow" | "emerald" | "rose" | "primary";

export interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  color?: RatingColor;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}
