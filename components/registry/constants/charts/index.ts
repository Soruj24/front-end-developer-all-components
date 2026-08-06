import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const chartBar: RegistryEntry = entry({
  id: "chart-bar",
  title: "Bar Chart",
  description: "Vertical bar chart with hover tooltips.",
  source: `"use client";
import { useState } from "react";

export default function BarChart() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const data = [
    { label: "Mon", value: 60 }, { label: "Tue", value: 80 }, { label: "Wed", value: 45 },
    { label: "Thu", value: 90 }, { label: "Fri", value: 55 }, { label: "Sat", value: 70 }, { label: "Sun", value: 85 },
  ];
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Bar Chart</h2>
      <div className="flex h-40 w-full items-end gap-2">
        {data.map((d, i) => (
          <div key={i} className="group relative flex-1" onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
            <div className="w-full rounded-t transition-all group-hover:opacity-80" style={{ height: \`\${(d.value / maxVal) * 100}%\`, background: "linear-gradient(to top, #6366f1, #a78bfa)" }} />
            {hoveredBar === i && <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white">{d.label}: {d.value}</div>}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">{data.map((d, i) => <span key={i}>{d.label}</span>)}</div>
    </div>
  );
}`,
});

export const chartHorizontalBar: RegistryEntry = entry({
  id: "chart-horizontal-bar",
  title: "Horizontal Bar Chart",
  description: "Horizontal bar chart with gradient fill.",
  source: `export default function HorizontalBarChart() {
  const data = [
    { label: "Mon", value: 60 }, { label: "Tue", value: 80 }, { label: "Wed", value: 45 },
    { label: "Thu", value: 90 }, { label: "Fri", value: 55 }, { label: "Sat", value: 70 }, { label: "Sun", value: 85 },
  ];
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Horizontal Bar Chart</h2>
      <div className="flex flex-col gap-2">
        {data.slice().reverse().map((d, i) => (
          <div key={i} className="group relative flex items-center gap-2">
            <span className="w-8 text-right text-xs text-muted-foreground">{d.label}</span>
            <div className="flex-1 h-5 rounded bg-muted">
              <div className="h-full rounded transition-all group-hover:opacity-80" style={{ width: \`\${(d.value / maxVal) * 100}%\`, background: "linear-gradient(to right, #22d3ee, #67e8f9)" }} />
            </div>
            <span className="w-8 text-xs text-muted-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const chartArea: RegistryEntry = entry({
  id: "chart-area",
  title: "Area Chart",
  description: "Area chart with gradient fill and data points.",
  source: `export default function AreaChart() {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Area Chart</h2>
      <div className="relative h-40 w-full">
        <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M0 40 L0 32 L10 28 L20 30 L30 18 L40 24 L50 12 L60 16 L70 8 L80 14 L90 6 L100 10 L100 40 Z" fill="url(#areaGrad)" />
          <polyline points="0,32 10,28 20,30 30,18 40,24 50,12 60,16 70,8 80,14 90,6 100,10" fill="none" stroke="#6366f1" strokeWidth="2" />
          {[{ x: 10, y: 28 }, { x: 50, y: 12 }, { x: 90, y: 6 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill="#6366f1" className="cursor-pointer"><title>Value at {p.x}</title></circle>
          ))}
        </svg>
      </div>
    </div>
  );
}`,
});

export const chartPie: RegistryEntry = entry({
  id: "chart-pie",
  title: "Pie Chart",
  description: "Pie chart with legend and hover effects.",
  source: `export default function PieChart() {
  const data = [
    { label: "Direct", value: 35, color: "#6366f1" },
    { label: "Social", value: 25, color: "#22d3ee" },
    { label: "Organic", value: 20, color: "#f59e0b" },
    { label: "Referral", value: 20, color: "#10b981" },
  ];
  const size = 140, cx = size / 2, cy = size / 2, r = size / 2 - 10;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const path = \`M \${cx} \${cy} L \${x1} \${y1} A \${r} \${r} 0 \${largeArc} 1 \${x2} \${y2} Z\`;
    return { path, color: d.color, label: d.label, value: d.value };
  });
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Pie Chart</h2>
      <div className="flex items-center gap-4">
        <svg width={size} height={size} viewBox={\`0 0 \${size} \${size}\`}>
          {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80"><title>{s.label}: {s.value}%</title></path>)}
        </svg>
        <div className="flex flex-col gap-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-medium">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
});

export const chartDonut: RegistryEntry = entry({
  id: "chart-donut",
  title: "Donut Chart",
  description: "Donut chart with center label.",
  source: `export default function DonutChart() {
  const data = [
    { label: "Used", value: 75, color: "#6366f1" },
    { label: "Free", value: 25, color: "#e4e4e7" },
  ];
  const size = 140, cx = size / 2, cy = size / 2, r = size / 2 - 10, ir = r - 35;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
    const ix1 = cx + ir * Math.cos(startRad), iy1 = cy + ir * Math.sin(startRad);
    const ix2 = cx + ir * Math.cos(endRad), iy2 = cy + ir * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const path = \`M \${x1} \${y1} A \${r} \${r} 0 \${largeArc} 1 \${x2} \${y2} L \${ix2} \${iy2} A \${ir} \${ir} 0 \${largeArc} 0 \${ix1} \${iy1} Z\`;
    return { path, color: d.color, label: d.label, value: d.value };
  });
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Donut Chart</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg width={size} height={size} viewBox={\`0 0 \${size} \${size}\`}>
            {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80"><title>{s.label}: {s.value}%</title></path>)}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold">{data[0].value}%</span></div>
        </div>
        <div className="flex flex-col gap-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-medium">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
});

export const chartLine: RegistryEntry = entry({
  id: "chart-line",
  title: "Line Chart",
  description: "Multi-series line chart with legend.",
  source: `export default function LineChart() {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Line Chart</h2>
      <div className="relative h-40 w-full">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(34,211,238,0.2), transparent)", clipPath: "polygon(0 100%, 5% 70%, 15% 75%, 25% 40%, 35% 55%, 45% 25%, 55% 35%, 65% 15%, 75% 30%, 85% 10%, 95% 20%, 100% 0, 100% 100%)" }} />
        <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline points="0,40 5,28 15,30 25,16 35,22 45,10 55,14 65,6 75,12 85,4 95,8 100,0" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <polyline points="0,40 5,32 15,34 25,24 35,28 45,18 55,22 65,14 75,20 85,12 95,16 100,10" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-cyan-400" /> Series A</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-indigo-500" /> Series B</span>
      </div>
    </div>
  );
}`,
});

export const charts: RegistryEntry[] = [
  chartBar,
  chartHorizontalBar,
  chartArea,
  chartPie,
  chartDonut,
  chartLine,
];
