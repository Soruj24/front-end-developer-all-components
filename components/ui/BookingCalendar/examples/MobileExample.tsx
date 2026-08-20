"use client";

import { BookingCalendar } from "../../BookingCalendar";
import type { BookingDay, TimeSlot } from "../../BookingCalendar.types";

const days: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13 },
  { label: "Wed", date: 14 },
];

const slots: TimeSlot[] = [
  { id: "m1", time: "9:00 AM" },
  { id: "m2", time: "10:00 AM" },
  { id: "m3", time: "11:00 AM" },
  { id: "m4", time: "1:00 PM" },
  { id: "m5", time: "2:00 PM" },
  { id: "m6", time: "3:00 PM" },
];

export default function MobileExample() {
  return (
    <div className="flex w-full justify-center py-2">
      <BookingCalendar days={days} timeSlots={slots} maxSlotsPerRow={3} />
    </div>
  );
}
