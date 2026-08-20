"use client";

import { BookingCalendar } from "../../BookingCalendar";
import type { BookingDay, TimeSlot } from "../../BookingCalendar.types";

const days: BookingDay[] = [
  { label: "Sat", date: 20 },
  { label: "Sun", date: 21 },
];

const slots: TimeSlot[] = [
  { id: "wk1", time: "10:00 AM" },
  { id: "wk2", time: "11:00 AM" },
  { id: "wk3", time: "1:00 PM" },
  { id: "wk4", time: "2:00 PM" },
  { id: "wk5", time: "3:00 PM" },
];

export default function WeekendExample() {
  return (
    <div className="flex w-full justify-center py-2">
      <BookingCalendar days={days} timeSlots={slots} maxSlotsPerRow={3} />
    </div>
  );
}
