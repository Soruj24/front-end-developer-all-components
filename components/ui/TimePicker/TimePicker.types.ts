export type TimePickerFormat = "12h" | "24h";

export interface TimeValue {
  /** Hour (0-23 for 24h, 1-12 for 12h). */
  h: number;
  /** Minute (0-59). */
  m: number;
  /** Second (0-59). Only used when showSeconds is true. */
  s?: number;
  /** AM/PM period. Only used in 12h format. */
  period?: "AM" | "PM";
}

export interface TimePickerProps {
  /** Current time value. */
  value: TimeValue;
  /** Called when the time changes. */
  onChange: (value: TimeValue) => void;
  /** Time format. */
  format?: TimePickerFormat;
  /** Show seconds column. */
  showSeconds?: boolean;
  /** Disable all inputs. */
  disabled?: boolean;
  /** Show the colon separator between columns. */
  showSeparators?: boolean;
  /** Additional CSS classes for the root element. */
  className?: string;
  /** Accessible label. */
  label?: string;
  /** Helper text below the picker. */
  helperText?: string;
}
