export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}
