"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export function EventAlert() {
  const [events, setEvents] = useState([
    { id: 1, title: "Team Standup", time: "9:00 AM", reminder: true },
    { id: 2, title: "Client Demo", time: "2:00 PM", reminder: true },
    { id: 3, title: "Sprint Review", time: "4:30 PM", reminder: false },
  ]);

  const toggleReminder = (id: number) => setEvents(events.map((e) => (e.id === id ? { ...e, reminder: !e.reminder } : e)));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Bell className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Event Alert</h3>
      </div>
      <div className="space-y-1.5">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <div className="w-12 text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{event.time.split(":")[0]}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{event.time.split(" ")[1]}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{event.title}</p>
            </div>
            <button onClick={() => toggleReminder(event.id)} className={`rounded-lg p-2 transition-all ${event.reminder ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"}`}>
              <Bell className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
