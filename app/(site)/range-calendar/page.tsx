"use client";

import { useState, useMemo } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { RangeCalendar } from "@/components/ui/RangeCalendar";
import type { DateRange } from "@/components/ui/RangeCalendar";

const RANGE_CALENDAR_SOURCE = `"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";

interface DateRange { start: Date | null; end: Date | null }
interface RangeCalendarPreset { label: string; range: DateRange }

interface RangeCalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  presets?: RangeCalendarPreset[];
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  return cells;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function RangeCalendar({ value, onChange, presets, minDate, maxDate, className }: RangeCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const days = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const handleDayClick = useCallback((day) => {
    const clicked = new Date(viewYear, viewMonth, day);
    const current = value || { start: null, end: null };
    let next;
    if (!current.start || (current.start && current.end)) next = { start: clicked, end: null };
    else if (clicked > current.start) next = { start: current.start, end: clicked };
    else next = { start: clicked, end: current.start };
    onChange?.(next);
  }, [viewYear, viewMonth, value, onChange]);

  const handlePrev = useCallback(() => { setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; }); }, []);
  const handleNext = useCallback(() => { setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; }); }, []);

  const start = value?.start; const end = value?.end;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {presets?.length > 0 && (
        <div className="flex flex-col gap-1">
          {presets.map((p) => (
            <button key={p.label} type="button" onClick={() => onChange?.(p.range)}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none">{p.label}</button>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button type="button" onClick={handlePrev} aria-label="Previous month"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none">‹</button>
          <span className="text-sm font-semibold text-foreground">{MONTHS[viewMonth]} {viewYear}</span>
          <button type="button" onClick={handleNext} aria-label="Next month"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none">›</button>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {WEEKDAYS.map((d) => <div key={d} className="py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">{d}</div>)}
          {days.map((day, i) => {
            if (day === null) return <div key={\`empty-\${i}\`} />;
            const date = new Date(viewYear, viewMonth, day);
            const isStart = start && isSameDay(date, start);
            const isEnd = end && isSameDay(date, end);
            const isInRange = start && end && date > start && date < end;
            const isToday = isSameDay(date, today);
            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
            return (
              <button key={\`\${viewMonth}-\${day}\`} type="button" disabled={isDisabled} onClick={() => handleDayClick(day)}
                className={cn("relative flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                  isDisabled && "pointer-events-none text-muted-foreground/30",
                  !isStart && !isEnd && !isInRange && !isDisabled && "hover:bg-muted",
                  isInRange && !isStart && !isEnd && "bg-primary/10 text-primary",
                  (isStart || isEnd) && "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
                  isToday && !isStart && !isEnd && "ring-1 ring-primary/30")}>
                {day}
              </button>
            );
          })}
        </div>
        {start && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            {end ? (<><span>→</span><span className="font-medium text-foreground">{end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></>) : <span className="text-muted-foreground/50">Select end date</span>}
          </div>
        )}
      </div>
    </div>
  );
}`;

function todayAt(daysOffset: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d;
}

export default function RangeCalendarPage() {
  const [range, setRange] = useState<DateRange>({
    start: todayAt(-10),
    end: todayAt(10),
  });

  const presets = useMemo(() => [
    { label: "Today", range: { start: new Date(), end: new Date() } },
    { label: "Last 7 days", range: { start: todayAt(-7), end: new Date() } },
    { label: "Last 30 days", range: { start: todayAt(-30), end: new Date() } },
    { label: "This month", range: { start: todayAt(-todayAt(0).getDate() + 1), end: todayAt(0) } },
  ], []);

  return (
    <ComponentDocPage
      name="Range Calendar"
      category="Scheduling"
      description="Date range picker with calendar grid, presets, keyboard navigation, and month navigation."
    >
      <PreviewPanel filename="range-calendar-preview.tsx">
        <div className="w-full max-w-sm">
          <RangeCalendar value={range} onChange={setRange} presets={presets} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={RANGE_CALENDAR_SOURCE}
        filename="components/ui/RangeCalendar/RangeCalendar.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Simple range calendar with month navigation."
          code={`import { RangeCalendar } from "@/components/ui/RangeCalendar";\n\n<RangeCalendar value={range} onChange={setRange} />`}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <RangeCalendar value={range} onChange={setRange} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Presets"
          description="Quick-select date range presets."
          code={`const presets = [\n  { label: "Today", range: { start: new Date(), end: new Date() } },\n  { label: "Last 7 days", range: { start: todayAt(-7), end: new Date() } },\n  { label: "Last 30 days", range: { start: todayAt(-30), end: new Date() } },\n];\n\n<RangeCalendar value={range} onChange={setRange} presets={presets} />`}
          filename="with-presets.tsx"
        >
          <div className="w-full max-w-sm">
            <RangeCalendar value={range} onChange={setRange} presets={presets} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Date Constraints"
          description="Restrict selectable dates with min/max."
          code={`<RangeCalendar\n  minDate={todayAt(-14)}\n  maxDate={todayAt(14)}\n  value={range}\n  onChange={setRange}\n/>`}
          filename="constraints.tsx"
        >
          <div className="w-full max-w-sm">
            <RangeCalendar
              minDate={todayAt(-14)}
              maxDate={todayAt(14)}
              value={range}
              onChange={setRange}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Uncontrolled"
          description="Use without managing state."
          code={`<RangeCalendar onChange={(r) => console.log(r)} />`}
          filename="uncontrolled.tsx"
        >
          <div className="w-full max-w-sm">
            <RangeCalendar onChange={() => {}} />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">DateRange</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(range: DateRange) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">presets</td>
                <td className="px-4 py-3 text-muted-foreground">RangeCalendarPreset[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">minDate</td>
                <td className="px-4 py-3 text-muted-foreground">Date</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">maxDate</td>
                <td className="px-4 py-3 text-muted-foreground">Date</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">DateRange</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">start</td>
                <td className="px-4 py-3 text-muted-foreground">Date | null</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">end</td>
                <td className="px-4 py-3 text-muted-foreground">Date | null</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
