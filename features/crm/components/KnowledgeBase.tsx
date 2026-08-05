import { kbArticles } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function KnowledgeBase() {
  return (
    <SectionCard title="Knowledge Base" description="Top articles and documentation">
      <div className="grid gap-3">
        {kbArticles.map((a) => (
          <div key={a.title} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:border-blue-200 dark:border-zinc-800 dark:hover:border-blue-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{a.title}</p>
              <Badge variant="default">{a.category}</Badge>
            </div>
            <div className="ml-4 flex items-center gap-4 text-xs text-zinc-500">
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{a.views.toLocaleString()}</p>
                <p>Views</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-green-600 dark:text-green-400">{a.helpful}%</p>
                <p>Helpful</p>
              </div>
              <span className="text-zinc-400">Updated {a.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
