interface GeographicProps {
  range: string;
}

const regions = [
  { name: "North America", visitors: 45200, percentage: 36 },
  { name: "Europe", visitors: 32100, percentage: 26 },
  { name: "Asia", visitors: 28400, percentage: 23 },
  { name: "Other", visitors: 18800, percentage: 15 },
];

export function Geographic({ range }: GeographicProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">Geographic data for {range}</p>
      <div className="mt-4 space-y-3">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="flex items-center justify-between">
              <span className="text-sm">{region.name}</span>
              <span className="text-sm text-muted-foreground">{region.visitors.toLocaleString()}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${region.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}