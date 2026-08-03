export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}
