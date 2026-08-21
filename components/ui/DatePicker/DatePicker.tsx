"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  if (format === "PPP")
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewYear, setViewYear] = useState(
    value?.getFullYear() ?? new Date().getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    value?.getMonth() ?? new Date().getMonth(),
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        close();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  function toggleOpen() {
    if (!open && value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
    setOpen((o) => !o);
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  function select(day: number) {
    onValueChange?.(new Date(viewYear, viewMonth, day));
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const today = new Date();

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full text-sm", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={value ? `Selected date: ${formatDisplay(value, format)}` : placeholder}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-left text-sm text-foreground shadow-sm transition-colors",
          "hover:border-muted-foreground/30",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          disabled && "cursor-not-allowed opacity-50",
          !value && "text-muted-foreground",
        )}
      >
        <span className="truncate">{formatDisplay(value, format) || placeholder}</span>
        <svg
          className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className={cn(
            "absolute z-50 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-sm font-semibold text-foreground">
              {new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                value?.getDate() === day &&
                value?.getMonth() === viewMonth &&
                value?.getFullYear() === viewYear;
              const isToday =
                today.getDate() === day &&
                today.getMonth() === viewMonth &&
                today.getFullYear() === viewYear;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => select(day)}
                  aria-label={`${new Date(viewYear, viewMonth, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors",
                    "hover:bg-muted",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20",
                    isSelected &&
                      "bg-primary font-medium text-primary-foreground hover:bg-primary/90",
                    isToday &&
                      !isSelected &&
                      "font-semibold text-primary",
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
