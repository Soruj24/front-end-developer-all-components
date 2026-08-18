"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Video,
  Plus,
} from "lucide-react";

const installCommand = `npx component-library@latest add calendar-grid`;
const usageCode = `import { CalendarGrid } from "@/components/calendar-grid";

<CalendarGrid
  selected={new Date()}
  onSelect={(date) => setSelectedDate(date)}
/>`;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function FullCalendarDemo() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [selected, setSelected] = useState<Date | null>(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isSelected = (d: number) =>
    selected?.getDate() === d && selected?.getMonth() === month && selected?.getFullYear() === year;

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate(new Date(year, month - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        </div>
        <button
          onClick={() => setViewDate(new Date(year, month + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1.5 text-center text-[10px] font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && setSelected(new Date(year, month, day))}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all ${
              day === null
                ? ""
                : isSelected(day)
                ? "bg-foreground text-background font-semibold shadow-sm"
                : isToday(day)
                ? "bg-foreground/10 text-foreground font-semibold"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          Selected: {MONTHS[selected.getMonth()]} {selected.getDate()}, {selected.getFullYear()}
        </div>
      )}
    </div>
  );
}

function MiniCalendarDemo() {
  const today = new Date();
  const [selected, setSelected] = useState<Date | null>(today);
  const cells = useMemo(() => {
    const days = getDaysInMonth(today.getFullYear(), today.getMonth());
    const first = getFirstDayOfMonth(today.getFullYear(), today.getMonth());
    const arr: (number | null)[] = [];
    for (let i = 0; i < first; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(d);
    return arr;
  }, []);

  return (
    <div className="rounded-xl border border-black/[.08] bg-card p-3 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold">{MONTHS[today.getMonth()]} {today.getFullYear()}</p>
        <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">Today</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[8px] font-medium text-muted-foreground/60">
            {d.charAt(0)}
          </div>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && setSelected(new Date(today.getFullYear(), today.getMonth(), day))}
            className={`flex h-7 w-7 items-center justify-center rounded-md text-[11px] transition-all ${
              day === null
                ? ""
                : selected?.getDate() === day
                ? "bg-foreground text-background font-semibold"
                : day === today.getDate()
                ? "bg-foreground/10 text-foreground font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function MonthSelectorDemo() {
  const [month, setMonth] = useState(new Date().getMonth());
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Select Month</span>
        <span className="text-xs text-muted-foreground">{MONTHS[month]}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMonth(i)}
            className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
              i === month
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}

function DateRangeDemo() {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [viewDate, setViewDate] = useState(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const isInRange = (day: number) => {
    if (!startDate) return false;
    const date = new Date(year, month, day);
    const end = endDate || (hoveredDate ? new Date(year, month, hoveredDate) : null);
    if (!end) return false;
    return date >= startDate && date <= end;
  };

  const formatDate = (d: Date | null) =>
    d ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}` : "---";

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2">
          <span className="text-[10px] font-medium text-muted-foreground">Start</span>
          <p className="text-xs font-semibold">{formatDate(startDate)}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
        <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2">
          <span className="text-[10px] font-medium text-muted-foreground">End</span>
          <p className="text-xs font-semibold">{formatDate(endDate)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(new Date(year, month - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs font-semibold">{MONTHS[month]} {year}</span>
        <button
          onClick={() => setViewDate(new Date(year, month + 1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[9px] font-medium text-muted-foreground/60">
            {d.charAt(0)}
          </div>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && handleSelect(day)}
            onMouseEnter={() => day && setHoveredDate(day)}
            onMouseLeave={() => setHoveredDate(null)}
            className={`flex h-8 items-center justify-center rounded-md text-xs transition-all ${
              day === null
                ? ""
                : startDate?.getDate() === day && startDate?.getMonth() === month
                ? "bg-foreground text-background font-semibold rounded-r-none"
                : endDate?.getDate() === day && endDate?.getMonth() === month
                ? "bg-foreground text-background font-semibold rounded-l-none"
                : isInRange(day)
                ? "bg-foreground/10 text-foreground rounded-none"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {startDate && endDate && (
        <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days selected
        </div>
      )}
    </div>
  );
}

function EventCalendarDemo() {
  const today = new Date();
  const events: Record<number, { label: string; color: string }[]> = {
    3: [{ label: "Team Standup", color: "bg-blue-500" }],
    7: [{ label: "Design Review", color: "bg-purple-500" }, { label: "Lunch", color: "bg-emerald-500" }],
    12: [{ label: "Sprint Planning", color: "bg-orange-500" }],
    15: [{ label: "All Hands", color: "bg-red-500" }],
    20: [{ label: "1:1 Meeting", color: "bg-blue-500" }],
    24: [{ label: "Release", color: "bg-emerald-500" }],
    25: [{ label: "Retrospective", color: "bg-purple-500" }],
  };

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <button className="flex h-7 items-center gap-1 rounded-lg bg-foreground px-3 text-xs font-medium text-background">
          <Plus className="h-3 w-3" /> Add Event
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={`flex min-h-[4.5rem] flex-col rounded-lg border border-black/[.04] p-1 dark:border-white/[.06] ${
            day === today.getDate() ? "border-foreground/30 bg-foreground/5" : ""
          }`}>
            {day && (
              <>
                <span className={`mb-1 text-right text-[10px] font-medium ${
                  day === today.getDate() ? "text-foreground font-bold" : "text-muted-foreground"
                }`}>
                  {day}
                </span>
                <div className="space-y-0.5">
                  {(events[day] || []).slice(0, 2).map((ev, j) => (
                    <div key={j} className={`truncate rounded px-1 py-0.5 text-[8px] font-medium text-white ${ev.color}`}>
                      {ev.label}
                    </div>
                  ))}
                  {(events[day] || []).length > 2 && (
                    <span className="text-[8px] text-muted-foreground">+{(events[day] || []).length - 2} more</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingCalendarDemo() {
  const today = new Date();
  const [selected, setSelected] = useState<Date | null>(null);
  const unavailable = [5, 6, 12, 13, 19, 20, 26, 27];
  const limited = [3, 4, 10, 11, 17, 18, 24, 25];

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-4">
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <p className="text-xs text-muted-foreground">Select a date for your appointment</p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const isUnavailable = day ? unavailable.includes(day) : false;
          const isLimited = day ? limited.includes(day) : false;
          return (
            <button
              key={i}
              disabled={day === null || isUnavailable || day < today.getDate()}
              onClick={() => day && setSelected(new Date(year, month, day))}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs transition-all ${
                day === null
                  ? ""
                  : selected?.getDate() === day && selected?.getMonth() === month
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : isUnavailable || day < today.getDate()
                  ? "text-muted-foreground/30 line-through cursor-not-allowed"
                  : isLimited
                  ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:text-yellow-400"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          Available
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          Limited
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          Unavailable
        </div>
      </div>
    </div>
  );
}

function WeekViewDemo() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const events: Record<string, { title: string; start: number; duration: number; color: string }> = {
    [`${weekDays[1].getDate()}-10`]: { title: "Standup", start: 9, duration: 0.5, color: "bg-blue-500" },
    [`${weekDays[1].getDate()}-14`]: { title: "Design Review", start: 14, duration: 1, color: "bg-purple-500" },
    [`${weekDays[2].getDate()}-10`]: { title: "1:1 Meeting", start: 10, duration: 0.5, color: "bg-emerald-500" },
    [`${weekDays[3].getDate()}-11`]: { title: "Sprint Planning", start: 11, duration: 1.5, color: "bg-orange-500" },
    [`${weekDays[4].getDate()}-9`]: { title: "Team Lunch", start: 12, duration: 1, color: "bg-pink-500" },
  };

  const isToday = (d: Date) =>
    d.getDate() === today.getDate() && d.getMonth() === today.getMonth();

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">Week {Math.ceil(today.getDate() / 7)}</span>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background">Today</button>
          <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">+ Add</button>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-px">
        <div />
        {weekDays.map((d, i) => (
          <div key={i} className={`pb-2 text-center ${
            isToday(d) ? "text-foreground font-bold" : "text-muted-foreground"
          }`}>
            <div className="text-[10px] font-medium">{DAYS[d.getDay()]}</div>
            <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs ${
              isToday(d) ? "bg-foreground text-background" : ""
            }`}>
              {d.getDate()}
            </div>
          </div>
        ))}
        {hours.map((hour) => (
          <div key={hour} className="contents">
            <div className="py-1 text-right text-[10px] text-muted-foreground/60 pr-2">
              {hour > 12 ? hour - 12 : hour}{hour >= 12 ? "pm" : "am"}
            </div>
            {weekDays.map((d, j) => {
              const key = `${d.getDate()}-${hour}`;
              const ev = events[key];
              return (
                <div key={j} className="h-10 border border-black/[.04] dark:border-white/[.06]">
                  {ev && (
                    <div className={`mx-0.5 mt-0.5 rounded px-1 py-0.5 text-[8px] font-medium text-white ${ev.color}`}
                      style={{ height: `${ev.duration * 40 - 4}px` }}>
                      {ev.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingEventsDemo() {
  const events = [
    { title: "Team Standup", time: "9:00 AM", date: "Today", location: "Zoom", attendees: 8, color: "border-l-blue-500" },
    { title: "Design Review", time: "2:00 PM", date: "Today", location: "Room A", attendees: 4, color: "border-l-purple-500" },
    { title: "Sprint Planning", time: "11:00 AM", date: "Tomorrow", location: "Conference", attendees: 12, color: "border-l-orange-500" },
    { title: "1:1 with Manager", time: "3:30 PM", date: "Wednesday", location: "Zoom", attendees: 2, color: "border-l-emerald-500" },
  ];

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Upcoming Events</span>
        <span className="text-xs text-muted-foreground">{events.length} events</span>
      </div>
      <div className="space-y-2">
        {events.map((ev, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-lg border border-l-4 border-black/[.04] bg-muted/30 p-3 ${ev.color} dark:border-white/[.06]`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
              {ev.location === "Zoom" ? (
                <Video className="h-4 w-4 text-muted-foreground" />
              ) : (
                <MapPin className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{ev.title}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{ev.time}</span>
                <span>\u00b7</span>
                <span>{ev.date}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" />
                <span>{ev.location}</span>
                <span>\u00b7</span>
                <Users className="h-2.5 w-2.5" />
                <span>{ev.attendees} attendees</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalendarGridPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Calendar Grid
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive calendar grid with month navigation, date selection, today highlighting,
          and mini compact variant.
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
          <h3 className="text-lg font-medium text-foreground">Full Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Interactive month view with navigation, date selection, and today indicator.
          </p>
          <ComponentPreview id="calendar-full">
            <FullCalendarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Mini Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Compact sidebar calendar with single-letter day headers.
          </p>
          <ComponentPreview id="calendar-mini">
            <MiniCalendarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Month Selector</h3>
          <p className="text-sm text-muted-foreground">
            Quick month picker grid for jumping to any month.
          </p>
          <ComponentPreview id="calendar-month">
            <MonthSelectorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Date Range Picker</h3>
          <p className="text-sm text-muted-foreground">
            Start and end date selection with range highlight and day count.
          </p>
          <ComponentPreview id="calendar-range">
            <DateRangeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Event Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Month view with event dots, color-coded labels, and add event button.
          </p>
          <ComponentPreview id="calendar-events">
            <EventCalendarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Booking Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Available, limited, and unavailable dates for appointment booking.
          </p>
          <ComponentPreview id="calendar-booking">
            <BookingCalendarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Week View</h3>
          <p className="text-sm text-muted-foreground">
            Horizontal week view with time slots and scheduled events.
          </p>
          <ComponentPreview id="calendar-week">
            <WeekViewDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Upcoming Events</h3>
          <p className="text-sm text-muted-foreground">
            Event list with time, location, attendee count, and left border color.
          </p>
          <ComponentPreview id="calendar-upcoming">
            <UpcomingEventsDemo />
          </ComponentPreview>
        </div>
      </section>

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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">selected</td>
                <td className="px-4 py-3 text-muted-foreground">Date | null</td>
                <td className="px-4 py-3 text-muted-foreground">null</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">{"(date: Date) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">minDate</td>
                <td className="px-4 py-3 text-muted-foreground">Date</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">events</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ date: Date; label: string }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
