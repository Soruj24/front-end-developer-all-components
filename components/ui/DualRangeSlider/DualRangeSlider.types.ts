type DualRangeSliderSize = "sm" | "md" | "lg";

export interface DualRangeSliderProps {
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment. */
  step?: number;
  /** Current range as [min, max]. */
  value: [number, number];
  /** Called when the range changes. */
  onChange: (value: [number, number]) => void;
  /** Format the displayed label for a value. */
  formatLabel?: (value: number) => string;
  /** Visual size. */
  size?: DualRangeSliderSize;
  /** Show value labels above the track. */
  showLabels?: boolean;
  /** Show min/max labels below the track. */
  showMinMax?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Disable the entire slider. */
  disabled?: boolean;
  /** Accessible label for the slider group. */
  label?: string;
}
