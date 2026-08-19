"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const BOOKING_CALENDAR_SOURCE = `"use client";

import { useState } from "react";

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM",
];

interface BookingCalendarProps {
  onSelect?: (slot: string) => void;
}

export function BookingCalendar({ onSelect }: BookingCalendarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (slot: string) => {
    setSelected((current) => (current === slot ? null : slot));
    onSelect?.(slot);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold">Select a Time Slot</h3>
      <div className="grid grid-cols-4 gap-2">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSelect(slot)}
            className={[
              "rounded-lg border px-3 py-2 text-sm transition-all",
              selected === slot
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:bg-primary/5",
            ].join(" ")}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}`;

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = [12, 13, 14, 15, 16];

const DATE_EXAMPLE = `<div className="flex w-full gap-2">
  {daysOfWeek.map((day, i) => (
    <button
      key={i}
      onClick={() => setSelectedDay(i)}
      className={selectedDay === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
    >
      <span>{day}</span>
      <span>{dates[i]}</span>
    </button>
  ))}
</div>`;

const SLOTS_EXAMPLE = `<button
  disabled={booked.includes(slot)}
  onClick={() => setSelectedSlot(selectedSlot === slot ? null : slot)}
  className={booked.includes(slot)
    ? "cursor-not-allowed bg-muted/50 text-muted-foreground line-through"
    : selectedSlot === slot
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border hover:border-primary"}
>
  {slot}
</button>`;

const FLOW_EXAMPLE = `<BookingCalendar onSelect={(slot) => console.log(slot)} />`;

export default function BookingCalendarPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>(["10:00 AM", "2:00 PM"]);

  const handleBook = () => {
    if (selectedSlot) setBooked((prev) => [...prev, selectedSlot]);
    setSelectedSlot(null);
  };

  return (
    <ComponentDocPage
      name="Booking Calendar"
      category="Forms"
      description="Appointment calendar with time slot selection, availability checking, and conflict detection."
    >
      <PreviewPanel filename="booking-calendar.tsx">
        <div className="flex w-full gap-2">
          {daysOfWeek.map((day, i) => (
            <button key={i} onClick={() => setSelectedDay(i)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-3 transition-all ${selectedDay === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}>
              <span className="text-xs">{day}</span>
              <span className="text-lg font-semibold">{dates[i]}</span>
            </button>
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BOOKING_CALENDAR_SOURCE} filename="components/ui/BookingCalendar/BookingCalendar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Date Selection" description="Pick an available day from the current work week." code={DATE_EXAMPLE}>
          <div className="flex w-full gap-2">
            {daysOfWeek.map((day, i) => (
              <button key={i} onClick={() => setSelectedDay(i)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-3 transition-all ${selectedDay === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}>
                <span className="text-xs">{day}</span>
                <span className="text-lg font-semibold">{dates[i]}</span>
              </button>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Time Slots" description="Available slots with booked times disabled and struck through." code={SLOTS_EXAMPLE}>
          <div className="grid w-full grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const isBooked = booked.includes(slot);
              const isSelected = selectedSlot === slot;
              return (
                <button key={slot} disabled={isBooked} onClick={() => setSelectedSlot(isSelected ? null : slot)} className={`rounded-lg border px-3 py-2 text-sm transition-all ${isBooked ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through" : isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary hover:bg-primary/5"}`}>
                  {slot}
                </button>
              );
            })}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Full Booking Flow" description="Combine date and slot selection with a confirm button that marks a slot as booked." code={FLOW_EXAMPLE}>
          <Card className="w-full max-w-md">
            <CardContent className="p-4">
              <div className="mb-3 flex gap-2">
                {daysOfWeek.map((day, i) => (
                  <button key={i} onClick={() => setSelectedDay(i)} className={`flex flex-1 flex-col items-center gap-1 rounded-md border p-2 text-xs transition-all ${selectedDay === i ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                    <span>{day}</span><span className="font-semibold">{dates[i]}</span>
                  </button>
                ))}
              </div>
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {timeSlots.map((slot) => {
                  const isBooked = booked.includes(slot);
                  const isSelected = selectedSlot === slot;
                  return (
                    <button key={slot} disabled={isBooked} onClick={() => setSelectedSlot(isSelected ? null : slot)} className={`rounded-md border px-2 py-1.5 text-xs transition-all ${isBooked ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through" : isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                      {slot}
                    </button>
                  );
                })}
              </div>
              <Button className="w-full" disabled={!selectedSlot} onClick={handleBook}>
                {selectedSlot ? `Book ${selectedSlot}` : "Select a time slot"}
              </Button>
            </CardContent>
          </Card>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}