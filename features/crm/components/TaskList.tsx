import { tasks } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function TaskList() {
  return (
    <SectionCard title="Task Manager" description="Pending and in-progress tasks">
      <div className="space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <input type="checkbox" defaultChecked={t.status === "Done"} className="h-4 w-4 rounded border-zinc-300 text-blue-600 dark:border-zinc-700" />
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${t.status === "Done" ? "text-zinc-400 line-through" : "text-zinc-900 dark:text-zinc-100"}`}>{t.title}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>Due {t.due}</span>
                <span>·</span>
                <span>{t.assignee}</span>
              </div>
            </div>
            <Badge variant={t.priority}>{t.priority}</Badge>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
