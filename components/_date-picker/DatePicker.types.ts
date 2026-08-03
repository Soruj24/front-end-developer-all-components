import type { ReactNode } from "react";

export type DatePickerVariant = "default" | "outlined";
export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerPreset = "today" | "yesterday" | "last7days" | "last30days" | "thisMonth" | "thisYear";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  onPresetSelect?: (preset: DatePickerPreset) => Date;
  placeholder?: string;
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  presets?: boolean;
  range?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
}
