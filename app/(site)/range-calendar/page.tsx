"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add range-calendar";

const usageCode = `import { RangeCalendar } from "@/components/ui";

export default function Example() {
  return <RangeCalendar onChange={(range) => console.log(range)} />;
}`;

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function RangeCalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [start, setStart] = useState<number | null>(10);
  const [end, setEnd] = useState<number | null>(20);
  const days = getDaysInMonth(year, month);

  const handleDayClick = (day: number) => {
    if (start === null || (start !== null && end !== null)) {
      setStart(day); setEnd(null);
    } else if (day > start) {
      setEnd(day);
    } else {
      setEnd(start); setStart(day);
    }
  };

  const inRange = (day: number) => start !== null && end !== null && day >= start && day <= end;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Range Calendar</h1>
          <Badge variant="primary">Scheduling</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Date range calendar picker with drag selection, preset ranges, and timezone-aware range calculations.
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
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="range-calendar-default">
            <div className="w-full max-w-sm">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {DAYS.map((d) => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => (
                  <button key={i} disabled={day === null} onClick={() => day && handleDayClick(day)} className={`h-8 rounded text-sm transition-colors ${day === null ? "" : inRange(day) ? "bg-primary/20 text-primary" : day === start || day === end ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"}`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Presets</h3>
          <ComponentPreview id="range-calendar-presets">
            <div className="flex w-full gap-4">
              <div className="w-32 space-y-1">
                {["Today", "Last 7 days", "Last 30 days", "This month"].map((label) => (
                  <button key={label} className="w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-muted">{label}</button>
                ))}
              </div>
              <div className="flex-1 rounded-lg border border-border p-3">
                <div className="grid grid-cols-7 gap-0.5">
                  {DAYS.map((d) => <div key={d} className="text-center text-[10px] text-muted-foreground">{d}</div>)}
                  {days.map((day, i) => (
                    <button key={i} disabled={day === null} onClick={() => day && handleDayClick(day)} className={`h-7 rounded text-xs ${day === null ? "" : inRange(day) ? "bg-primary/20" : day === start || day === end ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="range-calendar-interactive">
            <Card className="w-full max-w-md">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={() => setMonth((m) => (m - 1 + 12) % 12)}>←</Button>
                  <span className="text-sm font-medium">{months[month]} {year}</span>
                  <Button variant="ghost" size="sm" onClick={() => setMonth((m) => (m + 1) % 12)}>→</Button>
                </div>
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {DAYS.map((d) => <div key={d} className="text-center text-[10px] text-muted-foreground py-1">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {days.map((day, i) => (
                    <button key={i} disabled={!day} onClick={() => day && handleDayClick(day)} className={`h-8 rounded text-sm transition-all ${!day ? "" : inRange(day) ? "bg-primary/20 text-primary" : day === start || day === end ? "bg-primary text-primary-foreground font-medium rounded-sm" : "hover:bg-muted"}`}>
                      {day}
                    </button>
                  ))}
                </div>
                {start && end && <p className="mt-3 text-center text-xs text-muted-foreground">Selected: {months[month]} {start} – {months[month]} {end}</p>}
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(range: {`{ start: Date; end: Date }`}) =&gt; void</td>
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