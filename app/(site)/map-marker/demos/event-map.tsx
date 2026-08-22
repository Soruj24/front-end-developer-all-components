"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export function EventMap() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const events = [
    { id: 1, name: "Tech Conference", date: "Mar 15", attendees: 250, x: 20, y: 30 },
    { id: 2, name: "Design Workshop", date: "Mar 20", attendees: 50, x: 65, y: 45 },
    { id: 3, name: "Startup Meetup", date: "Mar 25", attendees: 120, x: 40, y: 70 },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <MapPin className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Event Map</h3>
      </div>
      <div className="relative h-48 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <path d="M10,50 Q30,30 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          </svg>
        </div>
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`absolute z-0 transform -translate-x-1/2 -translate-y-1/2 transition-all ${
              selectedEvent === event.id ? "z-10 scale-110" : "hover:scale-105"
            }`}
            style={{ left: `${event.x}%`, top: `${event.y}%` }}
          >
            <div className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
              {event.name}
            </div>
          </button>
        ))}
      </div>
      {selectedEvent && (
        <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
          {(() => {
            const event = events.find((e) => e.id === selectedEvent);
            if (!event) return null;
            return (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{event.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{event.date} &middot; {event.attendees} attending</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                  RSVP
                </span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
