"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import Calendar from "@/components/ui/Calendar";

const CALENDAR_SOURCE = `import { useMemo } from "react";

interface CalendarEvent {
  title: string;
  type?: string;
}

export interface CalendarProps {
  month: Date;
  events?: Record<number, CalendarEvent[]>;
  onDateClick?: (day: number) => void;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({
  month,
  events = {},
  onDateClick,
  className = "",
}: CalendarProps) => {
  const grid = useMemo(() => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const first = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [month]);

  const today = new Date();
  const todayStr = \`\${today.getFullYear()}-\${today.getMonth()}-\${today.getDate()}\`;

  return (
    <div className={className}>
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {grid.map((day, i) => {
          const dateStr =
            day !== null
              ? \`\${month.getFullYear()}-\${month.getMonth()}-\${day}\`
              : null;
          const isToday = dateStr === todayStr;
          const dayEvents = day !== null ? events[day] || [] : [];
          return (
            <div
              key={i}
              onClick={() => day !== null && onDateClick?.(day)}
              className={\`relative min-h-[56px] border-b border-r border-border p-1 \${
                day !== null ? "cursor-pointer hover:bg-muted" : ""
              }\`}
            >
              {day !== null && (
                <>
                  <span
                    className={\`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs \${
                      isToday
                        ? "bg-foreground text-background font-semibold"
                        : "text-foreground"
                    }\`}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((ev, ei) => (
                      <div
                        key={ei}
                        className="truncate rounded bg-muted px-1 py-0.5 text-[10px] leading-tight text-foreground"
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
export { Calendar };
export type { CalendarProps, CalendarEvent };`;

const DEMO_MONTH = new Date(2026, 7, 1);

const DEMO_EVENTS: Record<number, { title: string; type?: string }[]> = {
  5: [{ title: "Sprint Review" }, { title: "Lunch" }],
  12: [{ title: "Design Sync" }],
  15: [{ title: "Team Standup" }, { title: "1:1 Meeting" }, { title: "Happy Hour" }],
  20: [{ title: "Release Planning" }],
  25: [{ title: "Retrospective" }],
};

const BASIC_EXAMPLE = `<Calendar month={new Date(2026, 7, 1)} />`;

const EVENTS_EXAMPLE = `<Calendar
  month={new Date(2026, 7, 1)}
  events={{
    5: [{ title: "Sprint Review" }],
    15: [{ title: "Team Standup" }, { title: "Happy Hour" }],
    25: [{ title: "Retrospective" }],
  }}
  onDateClick={(day) => console.log("Clicked day:", day)}
/>`;

const CLICKABLE_EXAMPLE = `<Calendar
  month={new Date(2026, 7, 1)}
  onDateClick={(day) => alert(\`Day \${day} clicked!\`)}
/>`;

const CUSTOM_CLASS_EXAMPLE = `<Calendar
  month={new Date(2026, 7, 1)}
  className="w-full max-w-sm rounded-lg border p-4"
/>`;

export default function CalendarPage() {
  return (
    <ComponentDocPage
      name="Calendar"
      category="Data Display"
      description="A monthly calendar grid that displays days with optional event markers. Supports date click handling and custom styling for scheduling and date-oriented interfaces."
    >
      <PreviewPanel filename="calendar-preview">
        <Calendar month={DEMO_MONTH} events={DEMO_EVENTS} className="w-full max-w-sm" />
      </PreviewPanel>

      <SourceCodeViewer source={CALENDAR_SOURCE} filename="Calendar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Calendar" description="A simple calendar showing the current month grid." code={BASIC_EXAMPLE}>
          <Calendar month={DEMO_MONTH} className="w-full max-w-sm" />
        </ExampleBlock>

        <ExampleBlock title="With Events" description="Calendar displaying event markers on specific days." code={EVENTS_EXAMPLE}>
          <Calendar month={DEMO_MONTH} events={DEMO_EVENTS} className="w-full max-w-sm" />
        </ExampleBlock>

        <ExampleBlock title="Clickable Dates" description="Calendar with date click handling for interaction." code={CLICKABLE_EXAMPLE}>
          <Calendar
            month={DEMO_MONTH}
            onDateClick={(day) => alert(`Day ${day} clicked!`)}
            className="w-full max-w-sm"
          />
        </ExampleBlock>

        <ExampleBlock title="Custom Styling" description="Calendar with custom wrapper classes for layout control." code={CUSTOM_CLASS_EXAMPLE}>
          <Calendar month={DEMO_MONTH} className="w-full max-w-sm rounded-lg border p-4" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
