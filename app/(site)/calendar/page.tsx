"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
import { FullCalendar } from "./components/FullCalendar";
import { MiniCalendar } from "./components/MiniCalendar";
import { WeekView } from "./components/WeekView";
import { EventSummary } from "./components/EventSummary";
import { CalendarLegend } from "./components/CalendarLegend";

const STYLES: Array<{ label: string; Render: React.ComponentType; registryId: string }> = [
  { label: "Full Calendar", Render: FullCalendar, registryId: "calendar-full" },
  { label: "Mini Calendar", Render: MiniCalendar, registryId: "calendar-mini" },
  { label: "Week View", Render: WeekView, registryId: "calendar-week-view" },
  { label: "Event Summary", Render: EventSummary, registryId: "calendar-event-summary" },
  { label: "Legend", Render: CalendarLegend, registryId: "calendar-legend" },
];

export default function CalendarPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calendar</h1>
        <p className="text-muted-foreground">Multiple calendar examples and views.</p>
      </div>

      <section>
        <div className="mb-8 flex flex-wrap gap-2">
          {STYLES.map((s, i) => (
            <button
              key={s.registryId}
              onClick={() => setActiveStyle(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeStyle === i
                  ? "bg-blue-500 text-white shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ComponentPreview id={registryId}>
          <Active />
        </ComponentPreview>
      </section>
    </div>
  );
}
