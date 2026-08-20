"use client";

import { useState, useCallback } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import type { BookingDay, TimeSlot } from "@/components/ui/BookingCalendar";

const BOOKING_CALENDAR_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface TimeSlot {
  id: string;
  time: string;
  booked?: boolean;
}

interface BookingDay {
  label: string;
  date: number;
  disabled?: boolean;
}

interface BookingCalendarProps {
  days?: BookingDay[];
  timeSlots?: TimeSlot[];
  selectedDay?: number | null;
  selectedSlot?: string | null;
  onSelectDay?: (index: number) => void;
  onSelectSlot?: (slotId: string) => void;
  onConfirm?: (day: number, slotId: string) => void;
  maxSlotsPerRow?: 3 | 4;
  className?: string;
}

export function BookingCalendar({ ... }: BookingCalendarProps) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-sm" role="group" aria-label="Booking calendar">
      {/* Header with selected badge */}
      <div className="border-b border-border px-5 pt-5 pb-4">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">Select a Time Slot</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Pick a day, then choose an available slot</p>
      </div>

      {/* Day selector with radio group */}
      <div className="border-b border-border px-5 py-4">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Choose a day</p>
        <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Select a day">
          {days.map((day, i) => (
            <button key={...} role="radio" aria-checked={isSelected} aria-disabled={isDisabled}
              className="group/day relative flex flex-col items-center gap-1 rounded-xl border p-2.5 ...">
              <span className="text-[11px] font-medium">{day.label}</span>
              <span className="text-base font-semibold leading-none">{day.date}</span>
              {isSelected && <span className="absolute -bottom-1 ... rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots grid */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Select a time slot">
          {timeSlots.map((slot) => (
            <button role="radio" aria-checked={isSelected} aria-disabled={isBooked} disabled={isBooked}
              className="rounded-xl border px-2.5 py-2.5 text-sm font-medium transition-all ...">
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm footer */}
      <div className="border-t border-border px-5 py-4">
        <button disabled={!selectedSlot || selectedDay === null}
          className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ...">
          {selectedSlot ? "Confirm Booking" : "Select a day and time slot"}
        </button>
      </div>
    </div>
  );
}`;

const BASIC_EXAMPLE = `import { BookingCalendar } from "@/components/ui/BookingCalendar";

<BookingCalendar
  onSelectDay={(i) => console.log("day:", i)}
  onSelectSlot={(id) => console.log("slot:", id)}
  onConfirm={(day, slot) => console.log("confirm:", day, slot)}
/>`;

const CONTROLLED_EXAMPLE = `import { useState } from "react";
import { BookingCalendar } from "@/components/ui/BookingCalendar";

function ControlledBooking() {
  const [day, setDay] = useState<number | null>(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>(["10:00 AM"]);

  return (
    <BookingCalendar
      selectedDay={day}
      selectedSlot={slot}
      onSelectDay={setDay}
      onSelectSlot={setSlot}
      onConfirm={(_day, slotId) => {
        setBooked((prev) => [...prev, slotId]);
        setSlot(null);
      }}
    />
  );
}`;

const ALL_BOOKED_EXAMPLE = `const days = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13, disabled: true },
  { label: "Wed", date: 14 },
];

const slots = [
  { id: "d1", time: "9:00 AM", booked: true },
  { id: "d2", time: "9:30 AM", booked: true },
  { id: "d3", time: "10:00 AM" },
];

<BookingCalendar days={days} timeSlots={slots} />`;

const PLAYGROUND_EXAMPLE = `<BookingCalendar
  days={days.map((d, i) => ({ ...d, disabled: i === 1 || i === 3 }))}
  timeSlots={slots.map((s) => ({ ...s, booked: bookedIds.includes(s.id) }))}
  maxSlotsPerRow={4}
  onConfirm={(day, slotId) => {
    setBooked((prev) => [...prev, slotId]);
  }}
/>`;

function ControlledDemo() {
  const [day, setDay] = useState<number | null>(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>(["s3", "s8"]);

  const allSlots: TimeSlot[] = [
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
  ];

  const handleConfirm = useCallback(
    (_day: number, slotId: string) => {
      setBooked((prev) => [...prev, slotId]);
      setSlot(null);
    },
    [],
  );

  return (
    <BookingCalendar
      timeSlots={allSlots.map((s) => ({
        ...s,
        booked: booked.includes(s.id),
      }))}
      selectedDay={day}
      selectedSlot={slot}
      onSelectDay={setDay}
      onSelectSlot={setSlot}
      onConfirm={handleConfirm}
    />
  );
}

const playgroundDays: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13, disabled: true },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15, disabled: true },
  { label: "Fri", date: 16 },
];

const playgroundSlots: TimeSlot[] = [
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

function PlaygroundDemo() {
  const [booked, setBooked] = useState<string[]>(["p3", "p8"]);
  const [log, setLog] = useState<string[]>([]);

  const handleConfirm = useCallback((_day: number, slotId: string) => {
    setBooked((prev) => [...prev, slotId]);
    const slot = playgroundSlots.find((s) => s.id === slotId);
    const dayLabel = playgroundDays[_day]?.label;
    setLog((prev) => [...prev.slice(-4), `Booked ${slot?.time} on ${dayLabel}`]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <BookingCalendar
        days={playgroundDays}
        timeSlots={playgroundSlots.map((s) => ({ ...s, booked: booked.includes(s.id) }))}
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

const weekendDays: BookingDay[] = [
  { label: "Sat", date: 20 },
  { label: "Sun", date: 21 },
];

const weekendSlots: TimeSlot[] = [
  { id: "wk1", time: "10:00 AM" },
  { id: "wk2", time: "11:00 AM" },
  { id: "wk3", time: "1:00 PM" },
  { id: "wk4", time: "2:00 PM" },
  { id: "wk5", time: "3:00 PM" },
];

const restrictedDays: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13, disabled: true },
  { label: "Wed", date: 14 },
  { label: "Thu", date: 15, disabled: true },
  { label: "Fri", date: 16 },
];

const restrictedSlots: TimeSlot[] = [
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

const mobileDays: BookingDay[] = [
  { label: "Mon", date: 12 },
  { label: "Tue", date: 13 },
  { label: "Wed", date: 14 },
];

const mobileSlots: TimeSlot[] = [
  { id: "m1", time: "9:00 AM" },
  { id: "m2", time: "10:00 AM" },
  { id: "m3", time: "11:00 AM" },
  { id: "m4", time: "1:00 PM" },
  { id: "m5", time: "2:00 PM" },
  { id: "m6", time: "3:00 PM" },
];

export default function BookingCalendarPage() {
  return (
    <ComponentDocPage
      name="Booking Calendar"
      category="Forms"
      description="Appointment calendar with time slot selection, availability checking, and conflict detection."
    >
      <PreviewPanel filename="booking-calendar.tsx">
        <div className="flex w-full justify-center py-2">
          <BookingCalendar />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BOOKING_CALENDAR_SOURCE}
        filename="components/ui/BookingCalendar/BookingCalendar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Default"
          description="Out-of-the-box calendar with weekday selector and 12 time slots."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <BookingCalendar
              onSelectDay={(i) => console.log("day:", i)}
              onSelectSlot={(id) => console.log("slot:", id)}
              onConfirm={(day, slot) => console.log("confirm:", day, slot)}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="External state drives selection with booked slot tracking."
          code={CONTROLLED_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <ControlledDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Weekend Hours"
          description="Custom days and 3-column slot layout for shorter schedules."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <BookingCalendar
              days={weekendDays}
              timeSlots={weekendSlots}
              maxSlotsPerRow={3}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Restricted Access"
          description="Some days disabled, most slots booked."
          code={ALL_BOOKED_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <BookingCalendar
              days={restrictedDays}
              timeSlots={restrictedSlots}
              maxSlotsPerRow={4}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Mobile Layout"
          description="3-column grid with 3 days for narrow screens."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <BookingCalendar
              days={mobileDays}
              timeSlots={mobileSlots}
              maxSlotsPerRow={3}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Full interactive demo with activity log."
          code={PLAYGROUND_EXAMPLE}
        >
          <div className="flex w-full justify-center py-2">
            <PlaygroundDemo />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
