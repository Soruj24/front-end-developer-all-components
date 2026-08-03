export interface DatePickerProps {
  value?: Date | null;
  onValueChange?: (date: Date | null) => void;
  placeholder?: string;
  format?: string;
  locale?: string;
  disabled?: boolean;
  className?: string;
}
