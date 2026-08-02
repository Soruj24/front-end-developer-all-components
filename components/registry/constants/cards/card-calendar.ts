import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardCalendar: RegistryEntry = entry({
    id: "card-calendar",
    title: "Calendar Event Card",
    description: "Events with a date block, time, and location.",
    source: `const events = [
  { date: "15", month: "JUL", title: "Team Standup", time: "10:00 AM", loc: "Conference Room A", type: "meeting" },
  { date: "22", month: "JUL", title: "Product Launch", time: "2:00 PM", loc: "Main Auditorium", type: "deadline" },
  { date: "28", month: "JUL", title: "Team Outing", time: "11:00 AM", loc: "Central Park", type: "personal" },
];

export default function CardCalendar() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-3">
      {events.map((event, i) => (
        <div key={i} className="flex gap-4 rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
          <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-zinc-100 py-2 dark:bg-zinc-800">
            <span className="text-xs font-medium uppercase text-zinc-500">{event.month}</span>
            <span className="text-xl font-bold">{event.date}</span>
          </div>
          <div className="flex-1">
            <div className={\`mb-1 h-2 w-2 rounded-full \${event.type === "meeting" ? "bg-blue-500" : event.type === "deadline" ? "bg-red-500" : "bg-green-500"}\`} />
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-xs text-zinc-500">{event.time}</p>
            <p className="text-xs text-zinc-400">{event.loc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
