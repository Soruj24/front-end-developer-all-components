function PieChart({ data, size = 160, innerRadius = 0 }: { data: { label: string; value: number; color: string }[]; size?: number; innerRadius?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const total = data.reduce((s, d) => s + d.value, 0);

  const slices = data.map((d, idx) => {
    const cumulativeBefore = data.slice(0, idx).reduce((s, item) => s + item.value, 0);
    const startAngle = (cumulativeBefore / total) * 360;
    const cumulativeAfter = cumulativeBefore + d.value;
    const endAngle = (cumulativeAfter / total) * 360;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    let path = "";
    if (innerRadius > 0) {
      const ir = r - innerRadius;
      const ix1 = cx + ir * Math.cos(startRad);
      const iy1 = cy + ir * Math.sin(startRad);
      const ix2 = cx + ir * Math.cos(endRad);
      const iy2 = cy + ir * Math.sin(endRad);
      path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
    } else {
      path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }

    return { path, color: d.color, label: d.label, value: d.value };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80 transition-opacity cursor-pointer">
          <title>{s.label}: {s.value}%</title>
        </path>
      ))}
    </svg>
  );
}

const pieData = [
  { label: "Direct", value: 35, color: "#6366f1" },
  { label: "Social", value: 25, color: "#22d3ee" },
  { label: "Organic", value: 20, color: "#f59e0b" },
  { label: "Referral", value: 20, color: "#10b981" },
];

export function PieChartComponent() {
  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Pie Chart</h2>
      <div className="flex items-center gap-4">
        <PieChart data={pieData} size={140} />
        <div className="flex flex-col gap-1.5">
          {pieData.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
