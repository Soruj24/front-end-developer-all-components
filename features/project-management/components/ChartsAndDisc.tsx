"use client";

import { burndownData, priorityMatrix, projectComments, pmNotifications } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function BurndownChart() {
  const maxVal = Math.max(...burndownData.map((d) => Math.max(d.planned, d.actual)));

  return (
    <SectionCard title="Sprint Burndown" icon="📉">
      <div className="flex items-end gap-2" style={{ height: "160px" }}>
        {burndownData.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-end gap-0.5" style={{ height: "140px" }}>
              <div className="flex-1 rounded-t bg-zinc-200 dark:bg-zinc-700" style={{ height: `${(d.planned / maxVal) * 100}%` }} />
              <div className="flex-1 rounded-t bg-blue-500" style={{ height: `${(d.actual / maxVal) * 100}%` }} />
            </div>
            <span className="text-[10px] text-zinc-500">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-zinc-200 dark:bg-zinc-700" /><span className="text-zinc-500">Planned</span></div>
        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-blue-500" /><span className="text-zinc-500">Actual</span></div>
      </div>
    </SectionCard>
  );
}

export function PriorityMatrixView() {
  return (
    <SectionCard title="Priority Matrix" icon="🎯">
      <div className="grid grid-cols-2 gap-2">
        {(["Do First", "Schedule", "Delegate", "Eliminate"] as const).map((q) => (
          <div key={q} className={`rounded-lg border p-3 ${q === "Do First" ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20" : q === "Schedule" ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20" : q === "Delegate" ? "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20" : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50"}`}>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{q}</p>
            <div className="mt-2 space-y-1">
              {priorityMatrix.filter((p) => p.quadrant === q).map((p) => (
                <p key={p.id} className="text-[11px] text-zinc-600 dark:text-zinc-300">• {p.item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function CommentThread() {
  return (
    <SectionCard title="Discussion" icon="💬">
      <div className="space-y-3">
        {projectComments.map((c) => (
          <div key={c.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.user.name}</span>
              <span className="text-[10px] text-zinc-400">{c.time}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{c.text}</p>
            <p className="mt-1 text-[10px] text-zinc-400">{c.replies} replies</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function NotificationList() {
  return (
    <SectionCard title="Notifications" icon="🔔">
      <div className="space-y-1">
        {pmNotifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${n.unread ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{n.text}</p>
              <p className="text-xs text-zinc-400">{n.time}</p>
            </div>
            {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
