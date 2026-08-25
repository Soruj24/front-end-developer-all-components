import { cn } from "@/lib/cn";
import { segments } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function SegmentGrid() {
  return (
    <SectionCard title="Customer Segments" description="Revenue breakdown by segment">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {segments.map((s) => (
          <div
            key={s.name}
            className={cn(
              "rounded-lg border border-border/60 p-4 text-center",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${s.color} text-white text-sm font-bold`}>
              {s.name.charAt(0)}
            </div>
            <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
            <p className="mt-1 text-2xl font-bold text-foreground">{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.revenue}</p>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{s.growth}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}