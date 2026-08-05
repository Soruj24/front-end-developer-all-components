import Image from "next/image";
import { kanbanColumns } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function KanbanBoard() {
  return (
    <SectionCard title="Kanban Board" icon="📋">
      <div className="grid gap-4 overflow-x-auto md:grid-cols-4" style={{ minWidth: "700px" }}>
        {kanbanColumns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white ${col.color}`}>
              <span>{col.title}</span>
              <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs">{col.tasks.length}</span>
            </div>
            {col.tasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{task.title}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant={task.priority}>{task.priority}</Badge>
                  <div className="flex items-center gap-1">
                    <Image src={task.image} alt={task.assignee} width={20} height={20} className="rounded-full object-cover" />
                    <span className="text-[10px] text-zinc-500">{task.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="mt-auto rounded-lg border-2 border-dashed border-zinc-200 py-2 text-xs text-zinc-400 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-zinc-800 dark:hover:border-blue-500">
              + Add Task
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
