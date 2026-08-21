import type { ReactNode } from "react";

export interface IconPickerIcon {
  name: string;
  label: string;
  svg: ReactNode;
}

export interface IconPickerProps {
  icons?: IconPickerIcon[];
  value?: string | null;
  onSelect?: (name: string) => void;
  searchPlaceholder?: string;
  columns?: number;
  showPreview?: boolean;
  className?: string;
}
