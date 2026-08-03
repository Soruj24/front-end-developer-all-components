export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
