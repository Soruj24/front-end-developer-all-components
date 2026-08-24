interface TrafficChartProps {
  range: string;
}

export function TrafficChart({ range }: TrafficChartProps) {
  return (
    <div className="h-64 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">Traffic chart for {range}</p>
      <div className="mt-4 flex h-40 items-end gap-2">
        {[40, 65, 45, 80, 55, 70, 60, 85, 50, 75, 65, 90].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-blue-500/20 transition-all"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}