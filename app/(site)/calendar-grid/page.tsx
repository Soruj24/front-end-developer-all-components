"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CALENDARGRID_SOURCE } from "./calendar-grid-source";
import {
  FullCalendarDemo,
  MiniCalendarDemo,
  MonthSelectorDemo,
  DateRangeDemo,
  EventCalendarDemo,
  BookingCalendarDemo,
  WeekViewDemo,
  UpcomingEventsDemo,
} from "./calendar-grid-demos";

const FULL_CODE = `<CalendarGrid selected={selectedDate} onSelect={setSelectedDate} />`;

const MINI_CODE = `<CalendarGrid className="p-3 text-[11px]" />`;

const MONTH_CODE = `<div className="grid grid-cols-4 gap-1.5">
  {months.map((m) => (
    <button onClick={() => setMonth(m)}>{m}</button>
  ))}
</div>`;

const RANGE_CODE = `<CalendarGrid
  startDate={start}
  endDate={end}
  onSelectRange={setRange}
/>`;

const EVENTS_CODE = `<CalendarGrid events={[
  { date: new Date(2024, 7, 3), label: "Team Standup", color: "blue" },
  { date: new Date(2024, 7, 7), label: "Design Review", color: "purple" },
]} />`;

const BOOKING_CODE = `<CalendarGrid
  unavailable={[5, 6, 12, 13]}
  limited={[3, 4, 10, 11]}
/>`;

const WEEK_CODE = `<WeekView
  events={events}
  hours={8..20}
  startOfWeek="sunday"
/>`;

const UPCOMING_CODE = `<UpcomingEvents items={[
  { title: "Team Standup", time: "9:00 AM", location: "Zoom" },
  { title: "Design Review", time: "2:00 PM", location: "Room A" },
]} />`;

export default function CalendarGridPage() {
  return (
    <ComponentDocPage
      name="Calendar Grid"
      category="Data Display"
      description="Interactive calendar grid with month navigation, date selection, today highlighting, and mini compact variant."
    >
      <PreviewPanel filename="calendar-grid.tsx">
        <FullCalendarDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CALENDARGRID_SOURCE}
        filename="components/ui/CalendarGrid/CalendarGrid.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Mini Calendar" description="Compact sidebar calendar with single-letter day headers." code={MINI_CODE}>
          <MiniCalendarDemo />
        </ExampleBlock>
        <ExampleBlock title="Month Selector" description="Quick month picker grid for jumping to any month." code={MONTH_CODE}>
          <MonthSelectorDemo />
        </ExampleBlock>
        <ExampleBlock title="Date Range Picker" description="Start and end date selection with range highlight and day count." code={RANGE_CODE}>
          <DateRangeDemo />
        </ExampleBlock>
        <ExampleBlock title="Event Calendar" description="Month view with event dots, color-coded labels, and add event button." code={EVENTS_CODE}>
          <EventCalendarDemo />
        </ExampleBlock>
        <ExampleBlock title="Booking Calendar" description="Available, limited, and unavailable dates for appointment booking." code={BOOKING_CODE}>
          <BookingCalendarDemo />
        </ExampleBlock>
        <ExampleBlock title="Week View" description="Horizontal week view with time slots and scheduled events." code={WEEK_CODE}>
          <WeekViewDemo />
        </ExampleBlock>
        <ExampleBlock title="Upcoming Events" description="Event list with time, location, attendee count, and left border color." code={UPCOMING_CODE}>
          <UpcomingEventsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}