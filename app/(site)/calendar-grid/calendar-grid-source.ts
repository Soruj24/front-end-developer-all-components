export const CALENDARGRID_SOURCE = `"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarGridProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function CalendarGrid({ selected, onSelect, className = "" }: CalendarGridProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [internalSelected, setInternalSelected] = useState<Date | null>(selected ?? today);

  const active = selected ?? internalSelected;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    setInternalSelected(date);
    onSelect?.(date);
  };

  const dayClass = (day: number) => {
    if (active && active.getDate() === day && active.getMonth() === month && active.getFullYear() === year) {
      return "bg-foreground text-background font-semibold shadow-sm";
    }
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      return "bg-foreground/10 text-foreground font-semibold";
    }
    return "text-foreground hover:bg-muted";
  };

  return (
    <div className={"w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145] " + className}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1.5 text-center text-[10px] font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            type="button"
            disabled={day === null}
            onClick={() => day && handleSelect(day)}
            className={"flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all " + (day === null ? "" : dayClass(day))}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}`;