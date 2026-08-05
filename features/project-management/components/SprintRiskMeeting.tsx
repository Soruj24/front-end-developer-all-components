import { timeEntries, risks, sprints, meetings } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function TimeTracking() {
  return (
    <SectionCard title="Time Tracking" icon="⏱️">
      <div className="space-y-2">
        {timeEntries.map((e) => (
          <div key={e.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{e.task}</p>
              <p className="text-xs text-zinc-500">{e.user} · {e.date}</p>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{e.hours}h</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function RiskMatrix() {
  return (
    <SectionCard title="Risk Register" icon="⚠️">
      <div className="space-y-2">
        {risks.map((r) => (
          <div key={r.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.risk}</p>
              <div className="flex gap-1">
                <Badge variant={r.likelihood}>{r.likelihood}</Badge>
                <Badge variant={r.impact}>{r.impact}</Badge>
              </div>
            </div>
            <p className="mt-1 text-xs text-zinc-500">Owner: {r.owner}</p>
            <p className="mt-0.5 text-xs text-zinc-400">Mitigation: {r.mitigation}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function SprintBoard() {
  return (
    <SectionCard title="Sprints" icon="🏃">
      <div className="space-y-3">
        {sprints.map((s) => (
          <div key={s.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.name}</p>
                <p className="text-xs text-zinc-500">{s.goal}</p>
              </div>
              <Badge variant={s.status}>{s.status}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <span>{s.start} → {s.end}</span>
              <span>·</span>
              <span>{s.done}/{s.total} tasks</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full rounded-full bg-green-500" style={{ width: `${s.total > 0 ? (s.done / s.total) * 100 : 0}%` }} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function MeetingSchedule() {
  return (
    <SectionCard title="Meetings" icon="📅">
      <div className="space-y-2">
        {meetings.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{m.title}</p>
              <p className="text-xs text-zinc-500">{m.date} · {m.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">{m.attendees} people</span>
              <Badge variant={m.type}>{m.type}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
