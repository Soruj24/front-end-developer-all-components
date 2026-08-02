"use client";

import { useMemo } from "react";

interface CalendarEvent {
  title: string;
  type?: string;
}

export interface CalendarProps {
  month: Date;
  events?: Record<number, CalendarEvent[]>;
  onDateClick?: (day: number) => void;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({
  month,
  events = {},
  onDateClick,
  className = "",
}: CalendarProps) => {
  const grid = useMemo(() => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const first = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [month]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  return (
    <div className={className}>
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {grid.map((day, i) => {
          const dateStr =
            day !== null
              ? `${month.getFullYear()}-${month.getMonth()}-${day}`
              : null;
          const isToday = dateStr === todayStr;
          const dayEvents = day !== null ? events[day] || [] : [];
          return (
            <div
              key={i}
              onClick={() => day !== null && onDateClick?.(day)}
              className={`relative min-h-[56px] border-b border-r border-border p-1 ${
                day !== null
                  ? "cursor-pointer hover:bg-muted"
                  : ""
              }`}
            >
              {day !== null && (
                <>
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      isToday
                        ? "bg-foreground text-background font-semibold"
                        : "text-foreground"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((ev, ei) => (
                      <div
                        key={ei}
                        className="truncate rounded bg-muted px-1 py-0.5 text-[10px] leading-tight text-foreground"
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
