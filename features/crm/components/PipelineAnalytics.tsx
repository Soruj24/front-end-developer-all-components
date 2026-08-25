import { cn } from "@/lib/cn";
import { SectionCard } from "./SectionCard";

const pipelineData = [
  { stage: "Discovery → Proposal", rate: 62, value: "62%" },
  { stage: "Proposal → Negotiation", rate: 45, value: "45%" },
  { stage: "Negotiation → Closed Won", rate: 38, value: "38%" },
  { stage: "Overall Win Rate", rate: 34, value: "34%" },
];

export function PipelineAnalytics() {
  return (
    <SectionCard title="Pipeline Analytics" description="Conversion metrics across stages">
      <div className="flex flex-col gap-4">
        {pipelineData.map((m) => (
          <div key={m.stage} className="flex items-center gap-4">
            <span className="w-48 text-sm text-muted-foreground">{m.stage}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted/30">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${m.rate}%` }} />
            </div>
            <span className="w-12 text-right text-sm font-medium text-foreground">{m.value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}