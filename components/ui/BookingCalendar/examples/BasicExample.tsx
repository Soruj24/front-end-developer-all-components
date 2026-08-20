"use client";

import { BookingCalendar } from "../../BookingCalendar";

export default function BasicExample() {
  return (
    <div className="flex w-full justify-center py-2">
      <BookingCalendar
        onSelectDay={(i) => console.log("day:", i)}
        onSelectSlot={(id) => console.log("slot:", id)}
        onConfirm={(day, slot) => console.log("confirm:", day, slot)}
      />
    </div>
  );
}
