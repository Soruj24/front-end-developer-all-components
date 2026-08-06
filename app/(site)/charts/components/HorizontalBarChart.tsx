const barData = [
  { label: "Mon", value: 60 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 55 },
  { label: "Sat", value: 70 },
  { label: "Sun", value: 85 },
];

export function HorizontalBarChart() {
  const maxVal = Math.max(...barData.map((d) => d.value));

  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Horizontal Bar Chart</h2>
      <div className="flex flex-col gap-2">
        {barData.slice().reverse().map((d, i) => (
          <div key={i} className="group relative flex items-center gap-2">
            <span className="w-8 text-right text-xs text-muted-foreground">{d.label}</span>
            <div className="flex-1 h-5 rounded bg-muted dark:bg-muted">
              <div
                className="h-full rounded transition-all group-hover:opacity-80"
                style={{ width: `${(d.value / maxVal) * 100}%`, background: "linear-gradient(to right, #22d3ee, #67e8f9)" }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
