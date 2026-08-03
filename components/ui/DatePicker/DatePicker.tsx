"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { DatePickerProps } from "./DatePicker.types";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDisplay(date: Date | null, format: string): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  if (format === "PPP") return `${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`;
  if (format === "yyyy-MM-dd") return `${y}-${m}-${d}`;
  if (format === "dd/MM/yyyy") return `${d}/${m}/${y}`;
  return `${m}/${d}/${y}`;
}

export function DatePicker({
  value = null,
  onValueChange,
  placeholder = "Pick a date",
  format = "PPP",
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? new Date().getMonth());

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggleOpen() {
    if (!open && value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
    setOpen(!open);
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  function select(day: number) {
    const selected = new Date(viewYear, viewMonth, day);
    onValueChange?.(selected);
    setOpen(false);
  }

  const today = new Date();

  return (
    <div ref={ref} className={cn("relative inline-block text-sm", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-left",
          "dark:bg-zinc-900 dark:border-zinc-700",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {formatDisplay(value, format) || placeholder}
        </span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-72 rounded-md border bg-white p-3 shadow-md dark:bg-zinc-900 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <button type="button" onClick={() => setViewMonth((m) => (m === 0 ? 11 : m - 1))} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">{"<"}</button>
            <span className="font-medium">
              {new Date(viewYear, viewMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button type="button" onClick={() => setViewMonth((m) => (m === 11 ? 0 : m + 1))} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">{">"}</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value?.getDate() === day && value?.getMonth() === viewMonth && value?.getFullYear() === viewYear;
              const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => select(day)}
                  className={cn(
                    "h-8 w-8 rounded-md text-center text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                    isToday && !isSelected && "font-bold",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
