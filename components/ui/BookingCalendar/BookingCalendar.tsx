"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { BookingCalendarProps, BookingDay, TimeSlot } from "./BookingCalendar.types";

const DEFAULT_DAYS: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13 },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15 },
  { label: "Fri", date: 16 },
];

const DEFAULT_SLOTS: TimeSlot[] = [
  { id: "s1", time: "9:00 AM" },
  { id: "s2", time: "9:30 AM" },
  { id: "s3", time: "10:00 AM", booked: true },
  { id: "s4", time: "10:30 AM" },
  { id: "s5", time: "11:00 AM" },
  { id: "s6", time: "1:00 PM" },
  { id: "s7", time: "1:30 PM" },
  { id: "s8", time: "2:00 PM", booked: true },
  { id: "s9", time: "2:30 PM" },
  { id: "s10", time: "3:00 PM" },
  { id: "s11", time: "3:30 PM" },
  { id: "s12", time: "4:00 PM" },
];

export function BookingCalendar({
  days = DEFAULT_DAYS,
  timeSlots = DEFAULT_SLOTS,
  selectedDay: controlledDay,
  selectedSlot: controlledSlot,
  onSelectDay,
  onSelectSlot,
  onConfirm,
  maxSlotsPerRow = 4,
  className,
}: BookingCalendarProps) {
  const [internalDay, setInternalDay] = useState<number | null>(null);
  const [internalSlot, setInternalSlot] = useState<string | null>(null);

  const selectedDay = controlledDay ?? internalDay;
  const selectedSlot = controlledSlot ?? internalSlot;

  const handleSelectDay = useCallback(
    (index: number) => {
      if (days[index]?.disabled) return;
      if (controlledDay === undefined) setInternalDay(index === selectedDay ? null : index);
      onSelectDay?.(index);
    },
    [days, controlledDay, selectedDay, onSelectDay],
  );

  const handleSelectSlot = useCallback(
    (slotId: string) => {
      const slot = timeSlots.find((s) => s.id === slotId);
      if (!slot || slot.booked) return;
      const next = slotId === selectedSlot ? null : slotId;
      if (controlledSlot === undefined) setInternalSlot(next);
      onSelectSlot?.(slotId);
    },
    [timeSlots, controlledSlot, selectedSlot, onSelectSlot],
  );

  const handleConfirm = useCallback(() => {
    if (selectedDay !== null && selectedSlot) {
      onConfirm?.(selectedDay, selectedSlot);
      setInternalSlot(null);
    }
  }, [selectedDay, selectedSlot, onConfirm]);

  const cols = maxSlotsPerRow;

  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
      role="group"
      aria-label="Booking calendar"
    >
      {/* Header */}
      <div className="border-b border-border px-5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Select a Time Slot
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pick a day, then choose an available slot
            </p>
          </div>
          {selectedSlot && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Selected
            </span>
          )}
        </div>
      </div>

      {/* Day selector */}
      <div className="border-b border-border px-5 py-4">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Choose a day
        </p>
        <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Select a day">
          {days.map((day, i) => {
            const isSelected = selectedDay === i;
            const isDisabled = day.disabled;
            return (
              <button
                key={`${day.label}-${day.date}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                onClick={() => handleSelectDay(i)}
                className={cn(
                  "group/day relative flex flex-col items-center gap-1 rounded-xl border p-2.5 text-center transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isDisabled && "cursor-not-allowed opacity-40",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : !isDisabled
                      ? "border-border hover:border-primary/50 hover:bg-primary/5"
                      : "border-border",
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {day.label}
                </span>
                <span className="text-base font-semibold leading-none">{day.date}</span>
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Available times
          </p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Open
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              Booked
            </span>
          </div>
        </div>
        <div
          className={cn("grid gap-2", cols === 3 ? "grid-cols-3" : "grid-cols-4")}
          role="radiogroup"
          aria-label="Select a time slot"
        >
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot === slot.id;
            const isBooked = slot.booked;
            return (
              <button
                key={slot.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isBooked}
                disabled={isBooked}
                onClick={() => handleSelectSlot(slot.id)}
                className={cn(
                  "relative rounded-xl border px-2.5 py-2.5 text-center text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isBooked
                    ? "cursor-not-allowed border-border/50 bg-muted/40 text-muted-foreground/50 line-through"
                    : isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "border-border hover:border-primary/50 hover:bg-primary/5",
                )}
              >
                {slot.time}
                {isBooked && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-px w-3/4 bg-muted-foreground/20" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Confirm */}
      <div className="border-t border-border px-5 py-4">
        <button
          type="button"
          disabled={!selectedSlot || selectedDay === null}
          onClick={handleConfirm}
          className={cn(
            "relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            selectedSlot && selectedDay !== null
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
        >
          {selectedSlot
            ? `Confirm Booking`
            : "Select a day and time slot"}
        </button>
      </div>
    </div>
  );
}
