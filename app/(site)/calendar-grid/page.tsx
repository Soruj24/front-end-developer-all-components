"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const installCommand = `npx component-library@latest add calendar-grid`;
const usageCode = `import { CalendarGrid } from "@/components/calendar-grid";

<CalendarGrid
  selected={new Date()}
  onSelect={(date) => setSelectedDate(date)}
/>`;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function CalendarGridDemo() {
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

  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isSelected = (d: number) => selected?.getDate() === d && selected?.getMonth() === month && selected?.getFullYear() === year;

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewDate(new Date(year, month - 1))} className="rounded-md p-1 hover:bg-muted">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1))} className="rounded-md p-1 hover:bg-muted">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-medium text-muted-foreground">{d}</div>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && setViewDate(new Date(year, month, day))}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
              day === null ? "" :
              isSelected(day) ? "bg-primary text-primary-foreground" :
              isToday(day) ? "bg-primary/10 text-primary font-semibold" :
              "text-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
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
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <p className="text-xs font-semibold mb-2">{MONTHS[today.getMonth()]} {today.getFullYear()}</p>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && setSelected(new Date(today.getFullYear(), today.getMonth(), day))}
            className={`flex h-6 w-6 items-center justify-center rounded text-[10px] ${
              day === null ? "" :
              selected?.getDate() === day ? "bg-primary text-primary-foreground" :
              day === today.getDate() ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
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
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <span className="text-xs font-semibold">Select Month</span>
      <div className="grid grid-cols-4 gap-1">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMonth(i)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              i === month ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {m.slice(0, 3)}
          </button>
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calendar Grid</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive calendar grid with month navigation, date selection, today highlighting, and mini compact variant.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Full Calendar</h2>
        <ComponentPreview>
          <CalendarGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Mini Calendar</h2>
        <ComponentPreview>
          <MiniCalendarDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Month Selector</h2>
        <ComponentPreview>
          <MonthSelectorDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">selected</td><td className="px-4 py-3 text-muted-foreground">Date | null</td><td className="px-4 py-3 text-muted-foreground">null</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onSelect</td><td className="px-4 py-3 text-muted-foreground">(date: Date) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">minDate</td><td className="px-4 py-3 text-muted-foreground">Date</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
