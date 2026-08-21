"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DatePicker } from "@/components/ui/DatePicker";

const DATEPICKER_SOURCE = `"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDisplay(date: Date | null, format: string): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  if (format === "PPP") return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  if (format === "yyyy-MM-dd") return \`\${y}-\${m}-\${d}\`;
  if (format === "dd/MM/yyyy") return \`\${d}/\${m}/\${y}\`;
  return \`\${m}/\${d}/\${y}\`;
}

export function DatePicker({ value = null, onValueChange, placeholder = "Pick a date", format = "PPP", disabled = false, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? new Date().getMonth());

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("mousedown", onClickOutside); document.removeEventListener("keydown", onKeyDown); };
  }, [open, close]);

  function toggleOpen() {
    if (!open && value) { setViewYear(value.getFullYear()); setViewMonth(value.getMonth()); }
    setOpen((o) => !o);
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  function select(day: number) { onValueChange?.(new Date(viewYear, viewMonth, day)); setOpen(false); }
  function prevMonth() { if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); } else setViewMonth((m) => m - 1); }
  function nextMonth() { if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); } else setViewMonth((m) => m + 1); }
  const today = new Date();

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full text-sm", className)}>
      <button type="button" disabled={disabled} onClick={toggleOpen} aria-haspopup="dialog" aria-expanded={open}
        className={cn("flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-left text-sm text-foreground shadow-sm transition-colors",
          "hover:border-muted-foreground/30", "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          disabled && "cursor-not-allowed opacity-50", !value && "text-muted-foreground")}>
        <span className="truncate">{formatDisplay(value, format) || placeholder}</span>
        <svg className="h-4 w-4 flex-shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {open && (
        <div role="dialog" aria-label="Choose date" className="absolute z-50 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          <div className="mb-2 flex items-center justify-between">
            <button type="button" onClick={prevMonth} aria-label="Previous month" className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-sm font-semibold text-foreground">{new Date(viewYear, viewMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            <button type="button" onClick={nextMonth} aria-label="Next month" className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="mb-1 grid grid-cols-7">
            {DAYS.map((d) => <div key={d} className="py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={\`empty-\${i}\`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value?.getDate() === day && value?.getMonth() === viewMonth && value?.getFullYear() === viewYear;
              const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
              return (
                <button key={day} type="button" onClick={() => select(day)}
                  className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20",
                    isSelected && "bg-primary font-medium text-primary-foreground hover:bg-primary/90",
                    isToday && !isSelected && "font-semibold text-primary")}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}`;

const PPP_CODE = `import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker placeholder="Pick a date" />`;

const ISO_CODE = `import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker format="yyyy-MM-dd" placeholder="yyyy-MM-dd" />`;

const EU_CODE = `import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker format="dd/MM/yyyy" placeholder="dd/MM/yyyy" />`;

const US_CODE = `import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker format="MM/dd/yyyy" placeholder="MM/dd/yyyy" />`;

const DISABLED_CODE = `import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker disabled />`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { DatePicker } from "@/components/ui/DatePicker";

function ControlledExample() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={date} onValueChange={setDate} />
      <p className="text-xs text-muted-foreground">
        {date ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "No date selected"}
      </p>
    </div>
  );
}`;

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [isoDate, setIsoDate] = useState<Date | null>(null);
  const [euDate, setEuDate] = useState<Date | null>(null);
  const [usDate, setUsDate] = useState<Date | null>(null);
  const [controlledDate, setControlledDate] = useState<Date | null>(null);

  return (
    <ComponentDocPage
      name="Date Picker"
      category="Forms"
      description="A calendar-based date picker with month navigation, keyboard dismissal, multiple date formats, today highlight, and accessible dialog."
    >
      <PreviewPanel filename="date-picker-preview.tsx">
        <div className="flex w-full max-w-xs flex-col gap-4">
          <DatePicker value={date} onValueChange={setDate} placeholder="Pick a date" />
          {date && (
            <p className="text-xs text-muted-foreground">
              Selected:{" "}
              <span className="font-medium text-foreground">
                {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </p>
          )}
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DATEPICKER_SOURCE} filename="components/ui/DatePicker/DatePicker.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Default" description="Long-form date display (PPP format)." code={PPP_CODE} filename="default.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker placeholder="Pick a date" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="ISO Format" description="Displays the selected date as yyyy-MM-dd." code={ISO_CODE} filename="iso.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker value={isoDate} onValueChange={setIsoDate} format="yyyy-MM-dd" placeholder="yyyy-MM-dd" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="European Format" description="Displays the selected date as dd/MM/yyyy." code={EU_CODE} filename="eu.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker value={euDate} onValueChange={setEuDate} format="dd/MM/yyyy" placeholder="dd/MM/yyyy" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="US Format" description="Displays the selected date as MM/dd/yyyy." code={US_CODE} filename="us.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker value={usDate} onValueChange={setUsDate} format="MM/dd/yyyy" placeholder="MM/dd/yyyy" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description="Non-interactive with reduced opacity." code={DISABLED_CODE} filename="disabled.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker disabled />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Controlled" description="Control the value externally and display the current selection." code={CONTROLLED_CODE} filename="controlled.tsx">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <DatePicker value={controlledDate} onValueChange={setControlledDate} />
            <p className="text-xs text-muted-foreground">
              {controlledDate
                ? controlledDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : "No date selected"}
            </p>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
