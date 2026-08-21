export interface PasswordStrengthProps {
  value?: string;
  onChange?: (value: string) => void;
  showToggle?: boolean;
  showChecklist?: boolean;
  placeholder?: string;
  className?: string;
}

export interface StrengthResult {
  score: number;
  label: string;
  color: string;
}

export interface Requirement {
  label: string;
  test: (pw: string) => boolean;
}
