"use client";

import { Heart } from "lucide-react";
import { HeartbeatRenderer } from "./heartbeat-renderer";

export function PatientStatusDemo() {
  const patients = [
    { name: "John Smith", room: "101", bpm: 68, status: "stable" },
    { name: "Sarah Jones", room: "102", bpm: 92, status: "monitoring" },
    { name: "Mike Davis", room: "103", bpm: 110, status: "critical" },
  ];
  const statusColors = {
    stable: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    monitoring: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    critical: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Patient Monitor</h3>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {patients.map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              <HeartbeatRenderer bpm={p.bpm} size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{p.name}</p>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Room {p.room}</span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{p.bpm} BPM</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[p.status as keyof typeof statusColors]}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
