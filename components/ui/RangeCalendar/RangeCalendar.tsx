"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { RangeCalendarProps, DateRange } from "./RangeCalendar.types";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  return cells;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function RangeCalendar({
  value,
  onChange,
  presets,
  minDate,
  maxDate,
  className,
}: RangeCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const handleDayClick = useCallback((day: number) => {
    const clicked = new Date(viewYear, viewMonth, day);
    const current = value || { start: null, end: null };

    let next: DateRange;
    if (!current.start || (current.start && current.end)) {
      next = { start: clicked, end: null };
    } else if (clicked > current.start) {
      next = { start: current.start, end: clicked };
    } else {
      next = { start: clicked, end: current.start };
    }
    onChange?.(next);
  }, [viewYear, viewMonth, value, onChange]);

  const handlePrev = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const start = value?.start;
  const end = value?.end;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {presets && presets.length > 0 && (
        <div className="flex flex-col gap-1">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange?.(p.range)}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm font-medium",
                "transition-colors duration-150",
                "hover:bg-muted",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous month"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
              "text-muted-foreground transition-colors duration-150",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            )}
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-foreground">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next month"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
              "text-muted-foreground transition-colors duration-150",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            )}
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const date = new Date(viewYear, viewMonth, day);
            const isStart = start && isSameDay(date, start);
            const isEnd = end && isSameDay(date, end);
            const isInRange = start && end && date > start && date < end;
            const isToday = isSameDay(date, today);
            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);

            return (
              <button
                key={`${viewMonth}-${day}`}
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150",
                  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                  isDisabled && "pointer-events-none text-muted-foreground/30",
                  !isStart && !isEnd && !isInRange && !isDisabled && "hover:bg-muted",
                  isInRange && !isStart && !isEnd && "bg-primary/10 text-primary",
                  (isStart || isEnd) && "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
                  isToday && !isStart && !isEnd && "ring-1 ring-primary/30",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {start && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            {end ? (
              <>
                <span>→</span>
                <span className="font-medium text-foreground">
                  {end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground/50">Select end date</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
