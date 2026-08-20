"use client";

import { useState } from "react";
import { BookingCalendar } from "../../BookingCalendar";
import type { BookingDay, TimeSlot } from "../../BookingCalendar.types";

const days: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13 },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15 },
  { label: "Fri", date: 16 },
];

const allSlots: TimeSlot[] = [
  { id: "c1", time: "9:00 AM" },
  { id: "c2", time: "9:30 AM" },
  { id: "c3", time: "10:00 AM", booked: true },
  { id: "c4", time: "10:30 AM" },
  { id: "c5", time: "11:00 AM" },
  { id: "c6", time: "1:00 PM" },
  { id: "c7", time: "1:30 PM" },
  { id: "c8", time: "2:00 PM", booked: true },
  { id: "c9", time: "2:30 PM" },
  { id: "c10", time: "3:00 PM" },
];

export default function ControlledExample() {
  const [day, setDay] = useState<number | null>(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>(["c3", "c8"]);

  const currentSlots = allSlots.map((s) => ({
    ...s,
    booked: booked.includes(s.id),
  }));

  const handleConfirm = (_day: number, slotId: string) => {
    setBooked((prev) => [...prev, slotId]);
    setSlot(null);
  };

  return (
    <div className="flex w-full justify-center py-2">
      <BookingCalendar
        days={days}
        timeSlots={currentSlots}
        selectedDay={day}
        selectedSlot={slot}
        onSelectDay={setDay}
        onSelectSlot={setSlot}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
