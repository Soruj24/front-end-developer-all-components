export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  size?: CheckboxSize;
  className?: string;
}
