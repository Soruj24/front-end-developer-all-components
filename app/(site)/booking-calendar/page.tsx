"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add booking-calendar";

const usageCode = `import { BookingCalendar } from "@/components/ui";

export default function Example() {
  return <BookingCalendar onSelect={(slot) => console.log(slot)} />;
}`;

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = [12, 13, 14, 15, 16];

export default function BookingCalendarPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>(["10:00 AM", "2:00 PM"]);

  const handleBook = () => {
    if (selectedSlot) setBooked((prev) => [...prev, selectedSlot]);
    setSelectedSlot(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Booking Calendar</h1>
          <Badge variant="primary">Scheduling</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Appointment calendar with time slot selection, availability checking, and conflict detection.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Date Selection</h3>
          <ComponentPreview id="booking-calendar-default">
            <div className="flex w-full gap-2">
              {daysOfWeek.map((day, i) => (
                <button key={i} onClick={() => setSelectedDay(i)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-3 transition-all ${selectedDay === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}>
                  <span className="text-xs">{day}</span>
                  <span className="text-lg font-semibold">{dates[i]}</span>
                </button>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Time Slots</h3>
          <ComponentPreview id="booking-calendar-slots">
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
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Full Booking Flow</h3>
          <ComponentPreview id="booking-calendar-interactive">
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
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(slot: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}