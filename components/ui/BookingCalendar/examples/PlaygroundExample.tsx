"use client";

import { useState, useCallback } from "react";
import { BookingCalendar } from "../../BookingCalendar";
import type { BookingDay, TimeSlot } from "../../BookingCalendar.types";

const allDays: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13 },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15 },
  { label: "Fri", date: 16 },
];

const allSlots: TimeSlot[] = [
  { id: "p1", time: "9:00 AM" },
  { id: "p2", time: "9:30 AM" },
  { id: "p3", time: "10:00 AM" },
  { id: "p4", time: "10:30 AM" },
  { id: "p5", time: "11:00 AM" },
  { id: "p6", time: "1:00 PM" },
  { id: "p7", time: "1:30 PM" },
  { id: "p8", time: "2:00 PM" },
  { id: "p9", time: "2:30 PM" },
  { id: "p10", time: "3:00 PM" },
  { id: "p11", time: "3:30 PM" },
  { id: "p12", time: "4:00 PM" },
];

export default function PlaygroundExample() {
  const [booked, setBooked] = useState<string[]>(["p3", "p8"]);
  const [log, setLog] = useState<string[]>([]);

  const days = allDays.map((d, i) => ({
    ...d,
    disabled: i === 1 || i === 3,
  }));

  const slots = allSlots.map((s) => ({
    ...s,
    booked: booked.includes(s.id),
  }));

  const handleConfirm = useCallback(
    (_day: number, slotId: string) => {
      setBooked((prev) => [...prev, slotId]);
      const slot = allSlots.find((s) => s.id === slotId);
      const dayLabel = allDays[_day]?.label;
      setLog((prev) => [...prev.slice(-4), `Booked ${slot?.time} on ${dayLabel}`]);
    },
    [],
  );

  return (
    <div className="flex w-full flex-col items-center gap-4 py-2">
      <BookingCalendar
        days={days}
        timeSlots={slots}
        maxSlotsPerRow={4}
        onConfirm={handleConfirm}
      />
      {log.length > 0 && (
        <div className="w-full max-w-md rounded-xl border border-border bg-muted/30 p-3">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Activity Log
          </p>
          <div className="space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
