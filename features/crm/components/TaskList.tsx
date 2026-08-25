import { cn } from "@/lib/cn";
import { tasks } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function TaskList() {
  return (
    <SectionCard title="Task Manager" description="Pending and in-progress tasks">
      <div className="space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className={cn(
            "flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
          )}>
            <input type="checkbox" defaultChecked={t.status === "Done"} className="h-4 w-4 rounded border-border text-blue-600" />
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-medium", t.status === "Done" ? "text-muted-foreground line-through" : "text-foreground")}>{t.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
