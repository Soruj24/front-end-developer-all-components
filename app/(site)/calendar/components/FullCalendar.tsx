"use client";

import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const eventColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  deadline: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  personal: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  reminder: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const sampleEvents: Record<number, { title: string; type: string }[]> = {
  1: [{ title: "New Year Planning", type: "meeting" }],
  3: [{ title: "Team Standup", type: "meeting" }, { title: "Dentist", type: "personal" }],
  5: [{ title: "Project Review", type: "meeting" }],
  8: [{ title: "Submit Report", type: "deadline" }],
  10: [{ title: "Sprint Planning", type: "meeting" }],
  15: [{ title: "Quarterly Review", type: "meeting" }],
  20: [{ title: "Client Meeting", type: "meeting" }],
  25: [{ title: "Submit Invoice", type: "deadline" }],
};

function generateDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function FullCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const cells = useMemo(() => generateDays(year, month), [year, month]);
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); setSelectedDate(null); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); setSelectedDate(null); };

  const eventList = selectedDate ? sampleEvents[selectedDate] || [] : [];

  return (
    <div className="rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border">
        <button onClick={prevMonth} className="rounded p-1.5 hover:bg-muted dark:hover:bg-muted">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-lg font-semibold">{MONTHS[month]} {year}</h2>
        <button onClick={nextMonth} className="rounded p-1.5 hover:bg-muted dark:hover:bg-muted">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-muted-foreground/70">
          {DAYS.map((d) => <div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
          {cells.map((day, i) => {
            const dateStr = day !== null ? `${year}-${month}-${day}` : null;
            const isToday = dateStr === todayStr;
            const isSelected = day === selectedDate;
            const dayEvs = day !== null ? sampleEvents[day] || [] : [];
            return (
              <div key={i} onClick={() => day !== null && setSelectedDate(day)}
                className={`min-h-[72px] p-1 border-b border-r border-border ${day !== null ? "cursor-pointer hover:bg-muted/50" : ""} ${isSelected ? "bg-blue-50 dark:bg-blue-950/40" : ""} ${!day ? "bg-muted/40" : ""}`}>
                {day !== null && (
                  <div className="flex flex-col h-full">
                    <span className={`inline-flex items-center justify-center h-6 w-6 text-xs rounded-full ${isToday ? "bg-foreground text-background font-semibold" : isSelected ? "bg-blue-500 text-white font-semibold" : "text-muted-foreground"}`}>
                      {day}
                    </span>
                    <div className="mt-0.5 flex flex-col gap-0.5 flex-1">
                      {dayEvs.slice(0, 2).map((ev, ei) => (
                        <div key={ei} className={`truncate rounded px-1 py-0.5 text-[10px] leading-tight ${eventColors[ev.type] || eventColors.reminder}`}>
                          {ev.title}
                        </div>
                      ))}
                      {dayEvs.length > 2 && <span className="text-[10px] text-muted-foreground/70">+{dayEvs.length - 2}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {selectedDate && eventList.length > 0 && (
        <div className="border-t border-border p-4 dark:border-border">
          <h3 className="mb-2 text-sm font-semibold">{MONTHS[month]} {selectedDate}, {year}</h3>
          <div className="flex flex-col gap-1">
            {eventList.map((ev, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2 text-sm dark:border-border">
                <div className={`h-2 w-2 rounded-full ${ev.type === "meeting" ? "bg-blue-500" : ev.type === "deadline" ? "bg-red-500" : "bg-green-500"}`} />
                {ev.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
