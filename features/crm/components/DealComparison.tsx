import { cn } from "@/lib/cn";
import { SectionCard } from "./SectionCard";

const deals = [
  { deal: "Acme Corp Platform", rep: "Sarah M.", size: "$45K", stage: "Negotiation", probability: "80%", age: "45 days" },
  { deal: "Hooli Enterprise", rep: "Eva M.", size: "$89K", stage: "Negotiation", probability: "65%", age: "62 days" },
  { deal: "Initech SaaS", rep: "Carol W.", size: "$62K", stage: "Proposal", probability: "55%", age: "28 days" },
  { deal: "Globex Migration", rep: "Bob S.", size: "$28K", stage: "Discovery", probability: "30%", age: "12 days" },
];

export function DealComparison() {
  return (
    <SectionCard title="Deal Comparison" description="Side-by-side deal analysis">
      <div className="space-y-3">
        {deals.map((d) => (
          <div
            key={d.deal}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{d.deal}</p>
              <p className="text-xs text-muted-foreground">{d.rep} · {d.stage}</p>
            </div>
            <div className="ml-4 flex items-center gap-4 text-sm">
              <span className="font-semibold text-foreground">{d.size}</span>
              <span className="text-xs text-muted-foreground/70">{d.probability}</span>
              <span className="text-xs text-muted-foreground/70">{d.age}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}