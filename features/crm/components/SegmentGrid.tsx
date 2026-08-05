import { segments } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function SegmentGrid() {
  return (
    <SectionCard title="Customer Segments" description="Revenue breakdown by segment">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {segments.map((s) => (
          <div key={s.name} className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800">
            <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${s.color} text-white text-sm font-bold`}>
              {s.name.charAt(0)}
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.name}</h3>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{s.count}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.revenue}</p>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{s.growth}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
