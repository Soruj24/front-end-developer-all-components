interface TrafficSourcesProps {
  range: string;
}

const sources = [
  { name: "Direct", value: 42, color: "bg-blue-500" },
  { name: "Organic", value: 28, color: "bg-green-500" },
  { name: "Referral", value: 18, color: "bg-purple-500" },
  { name: "Social", value: 12, color: "bg-orange-500" },
];

export function TrafficSources({ range }: TrafficSourcesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">Traffic sources for {range}</p>
      <div className="mt-4 space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${source.color}`} />
            <span className="flex-1 text-sm">{source.name}</span>
            <span className="text-sm font-medium">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}