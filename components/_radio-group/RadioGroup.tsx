import * as React from "react";
import { cn } from "@/lib/cn";
import type { RadioGroupProps, RadioGroupValue } from "./RadioGroup.types";
import { RADIO_GROUP_STYLES } from "./RadioGroup.constants";

export function RadioGroup({ options, value, defaultValue, onValueChange, label, orientation = "vertical", error, className }: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? null);
  const isControlled = value !== undefined;
  const current = isControlled ? value! : internalValue;

  const handleChange = (val: RadioGroupValue) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <div className={cn(RADIO_GROUP_STYLES.base, orientation === "vertical" ? RADIO_GROUP_STYLES.vertical : RADIO_GROUP_STYLES.horizontal, className)}>
      {label && <span className="mb-2 block text-sm font-medium">{label}</span>}
      {options.map((opt) => (
        <label key={String(opt.value)} className={cn(RADIO_GROUP_STYLES.option, opt.disabled && "opacity-50 cursor-not-allowed")}>
          <input
            type="radio"
            value={String(opt.value)}
            checked={current === opt.value}
            onChange={() => handleChange(opt.value)}
            disabled={opt.disabled}
            className={cn(RADIO_GROUP_STYLES.input, error && "border-red-500")}
            aria-describedby={opt.description ? `${opt.value}-desc` : undefined}
          />
          <div className="flex-1">
            <span className={cn(RADIO_GROUP_STYLES.label)}>{opt.label}</span>
            {opt.description && <p id={`${opt.value}-desc`} className={cn(RADIO_GROUP_STYLES.description)}>{opt.description}</p>}
          </div>
          {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
        </label>
      ))}
    </div>
  );
}
