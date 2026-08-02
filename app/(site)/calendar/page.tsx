"use client";

import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const eventColors: Record<string, string> = {
  meeting: "bg-primary-soft text-primary",
  deadline: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  personal: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  reminder: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  holiday: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const sampleEvents: Record<string, Record<number, { title: string; type: string }[]>> = {
  "2026-7": {
    1: [{ title: "New Year Planning", type: "meeting" }],
    3: [{ title: "Team Standup", type: "meeting" }, { title: "Dentist Appointment", type: "personal" }],
    5: [{ title: "Project Review", type: "meeting" }],
    7: [{ title: "Lunch with Sarah", type: "personal" }],
    8: [{ title: "Submit Report", type: "deadline" }],
    10: [{ title: "Sprint Planning", type: "meeting" }, { title: "Code Review", type: "meeting" }, { title: "Update Docs", type: "reminder" }],
    12: [{ title: "Pay Bills", type: "deadline" }],
    14: [{ title: "Team Outing", type: "personal" }],
    15: [{ title: "Quarterly Review", type: "meeting" }],
    17: [{ title: "Doctor Appointment", type: "personal" }],
    19: [{ title: "Demo Day", type: "meeting" }],
    20: [{ title: "Client Meeting", type: "meeting" }, { title: "Contract Renewal", type: "deadline" }],
    22: [{ title: "Product Launch", type: "deadline" }],
    24: [{ title: "Coffee with Mike", type: "personal" }, { title: "Design Review", type: "meeting" }],
    26: [{ title: "Submit Timesheet", type: "reminder" }],
    28: [{ title: "Team Retro", type: "meeting" }],
    30: [{ title: "End of Month Reports", type: "deadline" }],
    31: [{ title: "Plan Next Sprint", type: "meeting" }, { title: "Clean Inbox", type: "reminder" }],
  },
  "2026-8": {
    3: [{ title: "Back to Work", type: "reminder" }],
    5: [{ title: "Sprint Planning", type: "meeting" }],
    7: [{ title: "Client Presentation", type: "meeting" }],
    10: [{ title: "Dentist", type: "personal" }],
    12: [{ title: "Code Freeze", type: "deadline" }],
    14: [{ title: "Release v3.0", type: "deadline" }, { title: "Celebration Lunch", type: "personal" }],
    18: [{ title: "Team Standup", type: "meeting" }],
    21: [{ title: "Performance Review", type: "meeting" }],
    25: [{ title: "Submit Invoice", type: "deadline" }],
    28: [{ title: "End of Month Sync", type: "meeting" }],
  },
  "2026-9": {
    1: [{ title: "Start New Sprint", type: "meeting" }],
    5: [{ title: "Design Workshop", type: "meeting" }],
    7: [{ title: "Labor Day", type: "holiday" }],
    10: [{ title: "Hackathon Day 1", type: "meeting" }, { title: "Pizza Night", type: "personal" }],
    12: [{ title: "Hackathon Day 2", type: "meeting" }],
    15: [{ title: "Submit Q3 Report", type: "deadline" }],
    18: [{ title: "Team Building", type: "personal" }],
    22: [{ title: "Product Demo", type: "meeting" }],
    25: [{ title: "Doctor Checkup", type: "personal" }],
    28: [{ title: "Quarterly Planning", type: "meeting" }],
    30: [{ title: "End of Quarter", type: "deadline" }],
  },
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

function CalendarGrid({ year, month, events, onDateClick, selectedDate, compact }: {
  year: number; month: number; events?: Record<number, { title: string; type: string }[]>;
  onDateClick?: (day: number) => void; selectedDate?: number | null; compact?: boolean;
}) {
  const cells = useMemo(() => generateDays(year, month), [year, month]);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const key = `${year}-${month}`;
  const monthEvents = events || {};

  return (
    <div>
      <div className={`grid grid-cols-7 ${compact ? "mb-0" : "mb-2"} text-center text-xs font-medium text-muted-foreground/70`}>
        {DAYS.map((d) => (
          <div key={d} className={compact ? "py-0.5 text-[10px]" : "py-1"}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          const dateStr = day !== null ? `${year}-${month}-${day}` : null;
          const isToday = dateStr === todayStr;
          const isSelected = day === selectedDate;
          const dayEvs = day !== null ? monthEvents[day] || [] : [];
          return (
            <div key={i} onClick={() => day !== null && onDateClick?.(day)}
              className={`${compact ? "min-h-[32px] p-0.5" : "min-h-[72px] p-1"} border-b border-r border-border ${day !== null ? "cursor-pointer hover:bg-muted/50" : ""} ${isSelected ? "bg-primary-soft" : ""} ${!day ? "bg-muted/40" : ""}`}>
              {day !== null && (
                <div className="flex flex-col h-full">
                  <span className={`inline-flex items-center justify-center ${compact ? "h-5 w-5 text-[10px]" : "h-6 w-6 text-xs"} rounded-full ${isToday ? "bg-foreground text-background font-semibold" : isSelected ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"}`}>
                    {day}
                  </span>
                  {!compact && (
                    <div className="mt-0.5 flex flex-col gap-0.5 flex-1">
                      {dayEvs.slice(0, compact ? 0 : 2).map((ev, ei) => (
                        <div key={ei} className={`truncate rounded px-1 py-0.5 text-[10px] leading-tight ${eventColors[ev.type] || eventColors.reminder}`}>
                          {ev.title}
                        </div>
                      ))}
                      {dayEvs.length > 2 && <span className="text-[10px] text-muted-foreground/70">+{dayEvs.length - 2}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DatePicker({ onSelect }: { onSelect: (d: Date) => void }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);
  const cells = useMemo(() => generateDays(year, month), [year, month]);

  return (
    <div className="w-72 rounded-xl border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
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
          const today = new Date();
          const isToday = day !== null && `${year}-${month}-${day}` === `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
          return (
            <div key={i} className="py-0.5">
              {day !== null && (
                <button onClick={() => onSelect(new Date(year, month, day))} className={`h-7 w-7 rounded-full text-xs ${isToday ? "bg-foreground text-background font-semibold" : "hover:bg-muted dark:hover:bg-muted text-muted-foreground"}`}>
                  {day}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{ day: number; title: string; type: string } | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);

  const key = `${year}-${month}`;
  const currentEvents = sampleEvents[key] || {};

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); setSelectedDate(null); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); setSelectedDate(null); };
  const goToday = () => { const d = new Date(); setYear(d.getFullYear()); setMonth(d.getMonth()); setSelectedDate(d.getDate()); };

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

  const eventList = selectedDate ? currentEvents[selectedDate] || [] : [];
  const allEventsFlat = Object.entries(currentEvents).flatMap(([day, evs]) => evs.map(e => ({ day: parseInt(day), ...e })));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calendar</h1>
          <p className="text-muted-foreground">Multiple calendar examples and views.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={goToday} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">Today</button>
          <div className="flex rounded-lg border border-border dark:border-border overflow-hidden">
            <button onClick={() => setView("month")} className={`px-3 py-1.5 text-sm font-medium ${view === "month" ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : "hover:bg-muted dark:hover:bg-muted"}`}>Month</button>
            <button onClick={() => setView("week")} className={`px-3 py-1.5 text-sm font-medium ${view === "week" ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : "hover:bg-muted dark:hover:bg-muted"}`}>Week</button>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border">
          <button onClick={prevMonth} className="rounded p-1.5 hover:bg-muted dark:hover:bg-muted">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-lg font-semibold">{MONTHS[month]} {year}</h2>
          <button onClick={nextMonth} className="rounded p-1.5 hover:bg-muted dark:hover:bg-muted">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {view === "month" ? (
          <div className="p-2">
            <CalendarGrid year={year} month={month} events={currentEvents} onDateClick={setSelectedDate} selectedDate={selectedDate} />
          </div>
        ) : (
          <div className="p-4">
            {selectedDate ? (
              <div className="space-y-1">
                <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-muted-foreground/70">
                  {DAYS.map(d => <div key={d} className="py-1">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 text-center text-sm">
                  {weekDays.map((d, i) => {
                    const dayNum = d.getDate();
                    const isSel = d.getMonth() === month && d.getDate() === selectedDate;
                    const isToday = `${d.getFullYear()}-${d.getMonth()}-${dayNum}` === `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
                    const dayEvs = d.getMonth() === month ? currentEvents[dayNum] || [] : [];
                    return (
                      <div key={i} className={`border-r border-b border-black/[.04] p-1 dark:border-white/[.06] ${isSel ? "bg-primary-soft" : ""}`}>
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday ? "bg-foreground text-background font-semibold" : "text-muted-foreground"}`}>{dayNum}</span>
                        <div className="mt-0.5 flex flex-col gap-0.5">
                          {dayEvs.slice(0, 1).map((ev, ei) => (
                            <div key={ei} className={`truncate rounded px-0.5 text-[9px] leading-tight ${eventColors[ev.type] || eventColors.reminder}`}>{ev.title}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground/70">Showing week of {weekDays[0]?.toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground/70">Click a date to view its week</p>
            )}
          </div>
        )}
      </section>

      {selectedDate && (
        <section className="rounded-xl border border-border p-4 dark:border-border">
          <h2 className="mb-3 text-lg font-semibold">{MONTHS[month]} {selectedDate}, {year} — Events</h2>
          {eventList.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events on this day.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {eventList.map((ev, i) => (
                <div key={i} onClick={() => setSelectedEvent(selectedEvent?.day === selectedDate && selectedEvent?.title === ev.title ? null : { day: selectedDate, ...ev })}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${selectedEvent?.day === selectedDate && selectedEvent?.title === ev.title ? "border-primary bg-primary-soft" : "border-border hover:border-foreground/20"}`}>
                  <div className={`h-3 w-3 rounded-full ${ev.type === "meeting" ? "bg-primary" : ev.type === "deadline" ? "bg-danger" : ev.type === "personal" ? "bg-success" : ev.type === "holiday" ? "bg-purple-500" : "bg-warning"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ev.title}</p>
                    <p className="text-xs capitalize text-muted-foreground">{ev.type}</p>
                  </div>
                  {selectedEvent?.day === selectedDate && selectedEvent?.title === ev.title && (
                    <div className="rounded-full bg-primary p-1">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="rounded-xl border border-border p-6 dark:border-border">
        <h2 className="mb-4 text-lg font-semibold">Event Summary</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Meetings", count: allEventsFlat.filter(e => e.type === "meeting").length, color: "bg-primary" },
            { label: "Deadlines", count: allEventsFlat.filter(e => e.type === "deadline").length, color: "bg-danger" },
            { label: "Personal", count: allEventsFlat.filter(e => e.type === "personal").length, color: "bg-success" },
            { label: "Reminders", count: allEventsFlat.filter(e => e.type === "reminder").length, color: "bg-warning" },
          ].map(s => (
            <div key={s.label} className="rounded-lg border border-border p-4 text-center dark:border-border">
              <div className={`mx-auto mb-2 h-3 w-12 rounded-full ${s.color}`} />
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">More Calendar Examples</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold">Mini Calendar (Date Picker)</h3>
            <DatePicker onSelect={(d) => setSelectedDate2(d)} />
            {selectedDate2 && (
              <p className="mt-3 text-sm text-muted-foreground">Selected: {selectedDate2.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold">This Month Overview</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{MONTHS[month]} {year}</span>
              <span className="text-xs text-muted-foreground">{Object.keys(currentEvents).length} days with events</span>
            </div>
            <CalendarGrid year={year} month={month} events={currentEvents} compact />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { monthOffset: 1, label: "Next Month" },
            { monthOffset: 2, label: "In 2 Months" },
            { monthOffset: 3, label: "In 3 Months" },
          ].map(({ monthOffset, label }) => {
            const m = (month + monthOffset) % 12;
            const y = year + Math.floor((month + monthOffset) / 12);
            const k = `${y}-${m}`;
            const evs = sampleEvents[k] || {};
            return (
              <div key={label} className="rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
                <h3 className="mb-2 text-sm font-semibold">{MONTHS[m]} {y}</h3>
                <CalendarGrid year={y} month={m} events={evs} compact />
                <p className="mt-2 text-xs text-muted-foreground/70">{Object.keys(evs).length} events scheduled</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border p-5 dark:border-border">
        <h2 className="mb-3 text-lg font-semibold">Legend</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Meeting", type: "meeting", color: "bg-primary" },
            { label: "Deadline", type: "deadline", color: "bg-danger" },
            { label: "Personal", type: "personal", color: "bg-success" },
            { label: "Reminder", type: "reminder", color: "bg-warning" },
            { label: "Holiday", type: "holiday", color: "bg-purple-500" },
            { label: "Today", type: "", color: "bg-foreground" },
            { label: "Selected", type: "", color: "bg-primary" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`h-3 w-3 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
