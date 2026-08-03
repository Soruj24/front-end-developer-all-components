import * as React from "react";
import { cn } from "@/lib/cn";
import type { DatePickerProps, DatePickerPreset } from "./DatePicker.types";
import { DATE_PICKER_STYLES, DATE_PICKER_PRESETS } from "./DatePicker.constants";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function DatePickerInput({ value, onChange, placeholder, variant, size, error, helperText, onFocus, disabled }: DatePickerProps & { onFocus: () => void }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value ? formatDate(value) : ""}
        onChange={(e) => {}}
        placeholder={placeholder ?? "Pick a date"}
        onFocus={onFocus}
        disabled={disabled}
        className={cn(
          DATE_PICKER_STYLES.base, DATE_PICKER_STYLES.input,
          DATE_PICKER_STYLES[variant ?? "default"],
          DATE_PICKER_STYLES[size ?? "md"],
          error && DATE_PICKER_STYLES.error,
        )}
        readOnly
      />
      <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
    </svg>
  );
}

export function DatePicker({ value, defaultValue, onChange, placeholder, variant = "default", size = "md", presets = true, range = false, minDate, maxDate, disabled, error, helperText }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Date | null>(value ?? defaultValue ?? null);
  const [rangeStart, setRangeStart] = React.useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = React.useState<Date | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDateSelect = (date: Date) => {
    if (range) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        setRangeEnd(date);
        setSelected(date);
        onChange?.(date);
        setIsOpen(false);
      }
    } else {
      setSelected(date);
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handlePreset = (preset: DatePickerPreset) => {
    const now = new Date();
    let d: Date;
    switch (preset) {
      case "today": d = now; break;
      case "yesterday": d = new Date(now.setDate(now.getDate() - 1)); break;
      case "last7days": d = new Date(now.setDate(now.getDate() - 7)); break;
      case "last30days": d = new Date(now.setDate(now.getDate() - 30)); break;
      case "thisMonth": d = new Date(now.getFullYear(), now.getMonth(), 1); break;
      case "thisYear": d = new Date(now.getFullYear(), 0, 1); break;
      default: d = now;
    }
    setSelected(d);
    onChange?.(d);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={panelRef}>
      <DatePickerInput {...{ value: selected, onChange, placeholder, variant, size, error, helperText, disabled, onFocus: () => setIsOpen(true) }} />
      {isOpen && (
        <div className={DATE_PICKER_STYLES.panel}>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const d = new Date(2024, 0, i + 1);
              const isCurrent = selected && d.toDateString() === selected.toDateString();
              const isDisabled = (minDate && d < minDate) || (maxDate && d > maxDate);
              return (
                <button
                  key={i}
                  onClick={() => !isDisabled && handleDateSelect(d)}
                  disabled={isDisabled}
                  className={cn("h-8 w-8 rounded text-sm", isCurrent ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800")}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          {presets && (
            <div className="mt-2 border-t pt-2">
              {DATE_PICKER_PRESETS.map((p) => (
                <button key={p.key} className={DATE_PICKER_STYLES.preset} onClick={() => handlePreset(p.key as DatePickerPreset)}>
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
