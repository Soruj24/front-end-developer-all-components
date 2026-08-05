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
          <div key={d.deal} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{d.deal}</p>
              <p className="text-xs text-zinc-500">{d.rep} · {d.stage}</p>
            </div>
            <div className="ml-4 flex items-center gap-4 text-sm">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{d.size}</span>
              <span className="text-xs text-zinc-400">{d.probability}</span>
              <span className="text-xs text-zinc-400">{d.age}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
