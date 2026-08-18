"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FullCalendar } from "./components/FullCalendar";
import { MiniCalendar } from "./components/MiniCalendar";
import { WeekView } from "./components/WeekView";
import { EventSummary } from "./components/EventSummary";
import { CalendarLegend } from "./components/CalendarLegend";

const calendarProps = [
  { prop: "variant", type: "\"full\" | \"mini\" | \"week\" | \"summary\"", default: "\"full\"", required: "No" },
  { prop: "events", type: "CalendarEvent[]", default: "[]", required: "No" },
  { prop: "selectedDate", type: "Date", default: "-", required: "No" },
  { prop: "onDateSelect", type: "(date: Date) => void", default: "-", required: "No" },
  { prop: "showLegend", type: "boolean", default: "true", required: "No" },
];

const installCommand = `npx component-library@latest add calendar`;

const usageCode = `import { Calendar } from "@/components/calendar";

<Calendar
  events={calendarEvents}
  onDateSelect={handleDateSelect}
/>`;

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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calendar</h1>
          <Badge variant="primary">{STYLES.length} views</Badge>
        </div>
        <p className="text-muted-foreground">Multiple calendar examples and views.</p>
      </div>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

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

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {calendarProps.map((row, i) => (
                <tr key={row.prop} className={i < calendarProps.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                  <td className="px-4 py-3">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
