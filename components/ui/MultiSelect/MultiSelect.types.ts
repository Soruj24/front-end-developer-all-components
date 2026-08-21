export interface MultiSelectOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  maxDisplay?: number;
  disabled?: boolean;
  className?: string;
}
