"use client";

import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function generateDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function MiniCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);

  const cells = useMemo(() => generateDays(year, month), [year, month]);

  return (
    <div className="w-full max-w-72 rounded-xl border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); }} className="rounded p-1 hover:bg-muted dark:hover:bg-muted">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
        <button onClick={() => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); }} className="rounded p-1 hover:bg-muted dark:hover:bg-muted">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1 text-center text-xs font-medium text-muted-foreground/70">{DAYS.map(d => <div key={d} className="py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          const isToday = day !== null && `${year}-${month}-${day}` === `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
          return (
            <div key={i} className="py-0.5">
              {day !== null && (
                <button onClick={() => setSelected(new Date(year, month, day))} className={`h-7 w-7 rounded-full text-xs ${isToday ? "bg-foreground text-background font-semibold" : "hover:bg-muted dark:hover:bg-muted text-muted-foreground"}`}>
                  {day}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {selected && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {selected.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
    </div>
  );
}
