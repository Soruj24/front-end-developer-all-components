import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const calendarFull: RegistryEntry = entry({
  id: "calendar-full",
  title: "Full Calendar",
  description: "Full monthly calendar with event dots and date selection.",
  source: `"use client";
import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const events = { 1: "Team Meeting", 5: "Project Review", 10: "Sprint Planning", 15: "Quarterly Review", 20: "Client Call", 25: "Deadline" };

function generateDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function FullCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);
  const cells = useMemo(() => generateDays(year, month), [year, month]);
  const todayStr = \`\${today.getFullYear()}-\${today.getMonth()}-\${today.getDate()}\`;

  return (
    <div className="rounded-xl border bg-white p-2">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <button onClick={() => month === 0 ? (setYear(y => y - 1), setMonth(11)) : setMonth(m => m - 1)} className="rounded p-1.5 hover:bg-muted">◀</button>
        <h2 className="font-semibold">{MONTHS[month]} {year}</h2>
        <button onClick={() => month === 11 ? (setYear(y => y + 1), setMonth(0)) : setMonth(m => m + 1)} className="rounded p-1.5 hover:bg-muted">▶</button>
      </div>
      <div className="grid grid-cols-7 mb-2 text-center text-xs text-muted-foreground">{DAYS.map(d => <div key={d} className="py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          const isToday = day !== null && \`\${year}-\${month}-\${day}\` === todayStr;
          return (
            <div key={i} onClick={() => day && setSelected(day)} className={\`min-h-[72px] p-1 border-b border-r cursor-pointer hover:bg-muted/50 \${day === selected ? "bg-blue-50" : ""} \${!day ? "bg-muted/40" : ""}\`}>
              {day && <span className={\`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs \${isToday ? "bg-foreground text-background font-semibold" : "text-muted-foreground"}\`}>{day}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
});

export const calendarMini: RegistryEntry = entry({
  id: "calendar-mini",
  title: "Mini Calendar (Date Picker)",
  description: "Compact date picker calendar.",
  source: `"use client";
import { useState, useMemo } from "react";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function generateDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function MiniCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);
  const cells = useMemo(() => generateDays(year, month), [year, month]);

  return (
    <div className="w-full max-w-72 rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => month === 0 ? (setYear(y => y - 1), setMonth(11)) : setMonth(m => m - 1)} className="rounded p-1 hover:bg-muted">◀</button>
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <button onClick={() => month === 11 ? (setYear(y => y + 1), setMonth(0)) : setMonth(m => m + 1)} className="rounded p-1 hover:bg-muted">▶</button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">{DAYS.map(d => <div key={d} className="py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          const isToday = day !== null && \`\${year}-\${month}-\${day}\` === \`\${today.getFullYear()}-\${today.getMonth()}-\${today.getDate()}\`;
          return (
            <div key={i} className="py-0.5">
              {day && <button onClick={() => setSelected(new Date(year, month, day))} className={\`h-7 w-7 rounded-full text-xs \${isToday ? "bg-foreground text-background font-semibold" : "hover:bg-muted text-muted-foreground"}\`}>{day}</button>}
            </div>
          );
        })}
      </div>
      {selected && <p className="mt-3 text-center text-sm text-muted-foreground">{selected.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>}
    </div>
  );
}`,
});

export const calendarWeekView: RegistryEntry = entry({
  id: "calendar-week-view",
  title: "Week View",
  description: "Weekly calendar view with event display.",
  source: `"use client";
import { useState, useMemo } from "react";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function generateDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function WeekView() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);
  const cells = useMemo(() => generateDays(year, month), [year, month]);

  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="mb-3 text-sm text-muted-foreground">Click a date to view its week</p>
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">{DAYS.map(d => <div key={d} className="py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => (
          <div key={i} onClick={() => day && setSelected(day)} className={\`min-h-[48px] p-1 border-b border-r cursor-pointer hover:bg-muted/50 \${day === selected ? "bg-blue-50" : ""}\`}>
            {day && <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground">{day}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const calendarEventSummary: RegistryEntry = entry({
  id: "calendar-event-summary",
  title: "Event Summary",
  description: "Event statistics summary cards.",
  source: `export default function EventSummary() {
  const stats = [
    { label: "Meetings", count: 12, color: "bg-blue-500" },
    { label: "Deadlines", count: 5, color: "bg-red-500" },
    { label: "Personal", count: 4, color: "bg-green-500" },
    { label: "Reminders", count: 3, color: "bg-amber-500" },
  ];
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Event Summary</h2>
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-lg border p-4 text-center">
            <div className={\`mx-auto mb-2 h-3 w-12 rounded-full \${s.color}\`} />
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const calendarLegend: RegistryEntry = entry({
  id: "calendar-legend",
  title: "Calendar Legend",
  description: "Color-coded legend for calendar events.",
  source: `export default function CalendarLegend() {
  const items = [
    { label: "Meeting", color: "bg-blue-500" },
    { label: "Deadline", color: "bg-red-500" },
    { label: "Personal", color: "bg-green-500" },
    { label: "Reminder", color: "bg-amber-500" },
    { label: "Today", color: "bg-foreground" },
    { label: "Selected", color: "bg-blue-500" },
  ];
  return (
    <div className="rounded-xl border p-5">
      <h2 className="mb-3 text-lg font-semibold">Legend</h2>
      <div className="flex flex-wrap gap-4">
        {items.map(l => (
          <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className={\`h-3 w-3 rounded-full \${l.color}\`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const calendar: RegistryEntry[] = [
  calendarFull,
  calendarMini,
  calendarWeekView,
  calendarEventSummary,
  calendarLegend,
];
