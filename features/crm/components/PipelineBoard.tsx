import { pipelineStages } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function PipelineBoard() {
  return (
    <SectionCard title="Deal Pipeline" description="Kanban view of sales stages">
      <div className="grid gap-4 overflow-x-auto md:grid-cols-5" style={{ minWidth: "800px" }}>
        {pipelineStages.map((stage) => (
          <div key={stage.name} className="flex flex-col gap-3">
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white ${stage.color}`}>
              <span>{stage.name}</span>
              <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs">{stage.deals.length}</span>
            </div>
            {stage.deals.map((deal) => (
              <div key={deal.title} className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{deal.title}</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{deal.value}</p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{deal.owner}</p>
              </div>
            ))}
            <button className="mt-auto rounded-lg border-2 border-dashed border-zinc-200 py-2 text-xs text-zinc-400 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-zinc-800 dark:hover:border-blue-500">
              + Add Deal
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
