import { forwardRef } from "react";

type RatingSize = "sm" | "md" | "lg";

const sizeClasses: Record<RatingSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value, max = 5, size = "md", onChange, disabled }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-0.5 ${sizeClasses[size]} ${disabled ? "opacity-60" : ""}`}
        role={onChange ? "radiogroup" : "img"}
        aria-label={`Rating: ${value} out of ${max}`}
      >
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(value);
          const half = !filled && i < value;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || !onChange}
              onClick={() => onChange?.(i + 1)}
              className={`transition-colors ${onChange && !disabled ? "cursor-pointer hover:scale-110" : "cursor-default"} ${filled ? "text-warning" : half ? "text-warning" : "text-subtle"}`}
              aria-label={`${i + 1} star${i + 1 > 1 ? "s" : ""}`}
              role={onChange ? "radio" : undefined}
              aria-checked={onChange ? i < value : undefined}
            >
              {filled ? "★" : half ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export default Rating;
export { Rating };
