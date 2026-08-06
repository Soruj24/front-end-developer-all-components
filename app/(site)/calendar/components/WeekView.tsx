"use client";

import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const eventColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  deadline: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  personal: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
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

export function WeekView() {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const cells = useMemo(() => generateDays(year, month), [year, month]);
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const weekDays = useMemo(() => {
    if (!selectedDate) return [];
    const first = new Date(year, month, selectedDate);
    const day = first.getDay();
    const start = new Date(first);
    start.setDate(start.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [selectedDate, year, month]);

  const sampleEvents: Record<number, { title: string; type: string }[]> = {
    3: [{ title: "Team Standup", type: "meeting" }],
    5: [{ title: "Project Review", type: "meeting" }],
    10: [{ title: "Sprint Planning", type: "meeting" }],
  };

  return (
    <div className="rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
      <div className="mb-3 text-sm font-semibold">Click a date to view its week</div>
      <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-muted-foreground/70">
        {DAYS.map(d => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          const isToday = day !== null && `${year}-${month}-${day}` === todayStr;
          const isSelected = day === selectedDate;
          return (
            <div key={i} onClick={() => day !== null && setSelectedDate(day)}
              className={`min-h-[48px] p-1 border-b border-r border-border cursor-pointer hover:bg-muted/50 ${isSelected ? "bg-blue-50 dark:bg-blue-950/40" : ""}`}>
              {day !== null && (
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday ? "bg-foreground text-background font-semibold" : "text-muted-foreground"}`}>
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {selectedDate && weekDays.length > 0 && (
        <div className="mt-4 border-t border-border pt-4 dark:border-border">
          <p className="mb-2 text-xs text-muted-foreground/70">Week of {weekDays[0]?.toLocaleDateString()}</p>
          <div className="grid grid-cols-7 text-center text-xs">
            {weekDays.map((d, i) => {
              const dayNum = d.getDate();
              const dayEvs = d.getMonth() === month ? sampleEvents[dayNum] || [] : [];
              return (
                <div key={i} className="border-r border-border p-1 last:border-r-0">
                  <span className="font-medium">{dayNum}</span>
                  {dayEvs.slice(0, 1).map((ev, ei) => (
                    <div key={ei} className={`mt-1 truncate rounded px-0.5 text-[9px] ${eventColors[ev.type]}`}>{ev.title}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
