import type { ReactNode } from "react";

export interface CommandGroup {
  heading?: string;
  items: CommandOption[];
}

export interface CommandOption {
  value: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface CommandProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  children: ReactNode | ((search: string) => ReactNode);
}
