import { forwardRef, InputHTMLAttributes } from "react";

type SliderSize = "sm" | "md" | "lg";

const sizeClasses: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbSizeClasses: Record<SliderSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SliderSize;
  showValue?: boolean;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", size = "md", showValue, value, ...props }, ref) => {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <input
          ref={ref}
          type="range"
          value={value}
          className={`w-full cursor-pointer appearance-none rounded-full bg-muted ${sizeClasses[size]}
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 ${thumbSizeClasses[size]}
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground ${thumbSizeClasses[size]}`}
          {...props}
        />
        {showValue && (
          <span className="min-w-[2.5rem] text-right text-sm tabular-nums text-muted-foreground">
            {value}
          </span>
        )}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export default Slider;
export { Slider };
