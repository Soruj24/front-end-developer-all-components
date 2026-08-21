export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface RangeCalendarPreset {
  label: string;
  range: DateRange;
}

export interface RangeCalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  presets?: RangeCalendarPreset[];
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}
