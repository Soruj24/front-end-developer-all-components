"use client";

import { useState, useEffect } from "react";
import { AlarmClock } from "lucide-react";

export function AlarmClockDemo() {
  const [time, setTime] = useState(new Date());
  const [alarmHour, setAlarmHour] = useState(8);
  const [alarmMin, setAlarmMin] = useState(0);
  const [alarmSet, setAlarmSet] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isAlarm = alarmSet && time.getHours() === alarmHour && time.getMinutes() === alarmMin;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <AlarmClock className={`h-4 w-4 ${alarmSet ? "text-primary" : "text-muted-foreground"}`} />
        <span className="text-sm text-muted-foreground">Alarm: {String(alarmHour).padStart(2, "0")}:{String(alarmMin).padStart(2, "0")}</span>
        <button onClick={() => setAlarmSet(!alarmSet)} className={`px-3 py-1 rounded-full text-xs font-medium ${alarmSet ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {alarmSet ? "On" : "Off"}
        </button>
      </div>
      {isAlarm && <span className="text-sm font-medium text-red-500">Alarm ringing!</span>}
    </div>
  );
}
