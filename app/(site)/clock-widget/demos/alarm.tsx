"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";

export function AlarmClockDemo() {
  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:00", label: "Wake up", enabled: true },
    { id: 2, time: "08:30", label: "Morning standup", enabled: true },
    { id: 3, time: "12:00", label: "Lunch break", enabled: false },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAlarm = (id: number) => setAlarms((a) => a.map((al) => (al.id === id ? { ...al, enabled: !al.enabled } : al)));
  const deleteAlarm = (id: number) => setAlarms((a) => a.filter((al) => al.id !== id));

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">Alarms</span>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {alarms.filter((a) => a.enabled).length} active
            </span>
          </div>
          <p className="mt-1 font-mono text-2xl font-bold tabular-nums">
            {String(currentTime.getHours()).padStart(2, "0")}:{String(currentTime.getMinutes()).padStart(2, "0")}
          </p>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {alarms.map((alarm) => (
            <div key={alarm.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1">
                <p className={`font-mono text-lg font-bold tabular-nums ${alarm.enabled ? "text-foreground" : "text-muted-foreground/50"}`}>{alarm.time}</p>
                <p className="text-[10px] text-muted-foreground">{alarm.label}</p>
              </div>
              <button onClick={() => deleteAlarm(alarm.id)} className="text-muted-foreground/40 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => toggleAlarm(alarm.id)} className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${alarm.enabled ? "bg-foreground" : "bg-muted"}`}>
                <div className={`h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${alarm.enabled ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
