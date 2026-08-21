export const TIME_PICKER_SOURCE = `"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ChevronUp, ChevronDown } from "lucide-react";

type TimePickerFormat = "12h" | "24h";

interface TimeValue {
  h: number;
  m: number;
  s?: number;
  period?: "AM" | "PM";
}

interface TimePickerProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  format?: TimePickerFormat;
  showSeconds?: boolean;
  disabled?: boolean;
  showSeparators?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
}

const DIGIT_CLASSES = cn(
  "w-14 font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground select-none",
);

const BTN_CLASSES = cn(
  "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150",
  "hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
  "active:scale-90",
  "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:active:scale-100",
);

function wrap(val: number, min: number, max: number) {
  const range = max - min + 1;
  return min + ((val - min + range) % range);
}

function Spinner({
  value,
  min,
  max,
  onChange,
  disabled,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  disabled: boolean;
  label: string;
}) {
  const next = useCallback(() => onChange(wrap(value + 1, min, max)), [value, min, max, onChange]);
  const prev = useCallback(() => onChange(wrap(value - 1, min, max)), [value, min, max, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "ArrowUp") { e.preventDefault(); next(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); prev(); }
    },
    [disabled, next, prev],
  );

  return (
    <div className="flex flex-col items-center gap-0.5" role="group" aria-label={label}>
      <button
        type="button"
        onClick={next}
        disabled={disabled}
        className={BTN_CLASSES}
        aria-label={\`Increase \${label}\`}
        tabIndex={-1}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
      <span
        className={DIGIT_CLASSES}
        role="spinbutton"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={String(value).padStart(2, "0")}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        {String(value).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={prev}
        disabled={disabled}
        className={BTN_CLASSES}
        aria-label={\`Decrease \${label}\`}
        tabIndex={-1}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24h",
      showSeconds = false,
      disabled = false,
      showSeparators = true,
      className,
      label,
      helperText,
    },
    ref,
  ) => {
    const is12h = format === "12h";

    const setH = useCallback(
      (h: number) => onChange({ ...value, h }),
      [value, onChange],
    );
    const setM = useCallback(
      (m: number) => onChange({ ...value, m }),
      [value, onChange],
    );
    const setS = useCallback(
      (s: number) => onChange({ ...value, s }),
      [value, onChange],
    );

    const togglePeriod = useCallback(() => {
      if (disabled) return;
      const next = value.period === "AM" ? "PM" : "AM";
      onChange({ ...value, period: next });
    }, [value, onChange, disabled]);

    const colon = (
      <span className="pb-5 text-2xl font-bold text-muted-foreground/40 select-none" aria-hidden="true">:</span>
    );

    return (
      <div className={cn("w-full max-w-xs space-y-1.5", className)} ref={ref}>
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <div
          className={cn(
            "inline-flex items-center justify-center gap-1 rounded-xl border border-border/60 bg-background px-4 py-3 shadow-sm transition-all duration-200",
            "focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5",
            disabled && "opacity-50 pointer-events-none",
          )}
          role="group"
          aria-label={label || "Time picker"}
        >
          <Spinner
            value={value.h}
            min={is12h ? 1 : 0}
            max={is12h ? 12 : 23}
            onChange={setH}
            disabled={disabled}
            label="Hours"
          />

          {showSeparators && colon}

          <Spinner
            value={value.m}
            min={0}
            max={59}
            onChange={setM}
            disabled={disabled}
            label="Minutes"
          />

          {showSeconds && (
            <>
              {showSeparators && colon}
              <Spinner
                value={value.s ?? 0}
                min={0}
                max={59}
                onChange={setS}
                disabled={disabled}
                label="Seconds"
              />
            </>
          )}

          {is12h && (
            <>
              <div className="ml-1.5 w-px h-8 bg-border/40" aria-hidden="true" />
              <button
                type="button"
                onClick={togglePeriod}
                disabled={disabled}
                className={cn(
                  "ml-1 inline-flex h-10 w-12 items-center justify-center rounded-lg text-sm font-bold transition-all duration-150",
                  "bg-primary text-primary-foreground shadow-sm",
                  "hover:bg-primary/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  "active:scale-95",
                  "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
                )}
                aria-label={\`Switch to \${value.period === "AM" ? "PM" : "AM"}\`}
              >
                {value.period}
              </button>
            </>
          )}
        </div>

        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";

export default TimePicker;`;
