import * as React from "react";
import { cn } from "@/lib/cn";
import type { SliderProps } from "./Slider.types";
import { SLIDER_STYLES } from "./Slider.constants";

export function Slider({ value, min = 0, max = 100, step = 1, variant = "default", size = "md", disabled, label, onChange, className }: SliderProps) {
  const [internalValue, setInternalValue] = React.useState<number[]>(value ?? [min]);
  const values = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    const newV = [v];
    setInternalValue(newV);
    onChange?.(value ? value : newV);
  };

  const percent = ((values[0] - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && <div className="mb-1 text-sm">{label}</div>}
      <div className={cn("relative", SLIDER_STYLES.base, SLIDER_STYLES[size], disabled && "opacity-50", className)}>
        <div className={SLIDER_STYLES.track} />
        <div className={cn(SLIDER_STYLES.fill)} style={{ width: `${percent}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
          style={{ zIndex: 10 }}
        />
      </div>
    </div>
  );
}
