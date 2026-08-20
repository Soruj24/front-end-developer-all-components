"use client";

import { BookingCalendar } from "../../BookingCalendar";
import type { BookingDay, TimeSlot } from "../../BookingCalendar.types";

const days: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13, disabled: true },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15, disabled: true },
  { label: "Fri", date: 16 },
];

const slots: TimeSlot[] = [
  { id: "d1", time: "9:00 AM", booked: true },
  { id: "d2", time: "9:30 AM", booked: true },
  { id: "d3", time: "10:00 AM", booked: true },
  { id: "d4", time: "10:30 AM" },
  { id: "d5", time: "11:00 AM" },
  { id: "d6", time: "1:00 PM", booked: true },
  { id: "d7", time: "1:30 PM" },
  { id: "d8", time: "2:00 PM", booked: true },
  { id: "d9", time: "2:30 PM" },
  { id: "d10", time: "3:00 PM" },
  { id: "d11", time: "3:30 PM", booked: true },
  { id: "d12", time: "4:00 PM" },
];

export default function AllBookedExample() {
  return (
    <div className="flex w-full justify-center py-2">
      <BookingCalendar days={days} timeSlots={slots} maxSlotsPerRow={4} />
    </div>
  );
}
