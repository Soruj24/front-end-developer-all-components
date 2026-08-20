export type ColorPickerSize = "sm" | "md" | "lg";

export interface ColorPickerProps {
  defaultColor?: string;
  onChange?: (color: string) => void;
  size?: ColorPickerSize;
  className?: string;
}
