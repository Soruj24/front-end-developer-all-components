import type { TimeRange, Kpi, TrafficSource, TopPage, Region, Device } from "../types/analytics";

export const timeRanges: TimeRange[] = ["1H", "24H", "7D", "30D", "90D", "1Y", "All"];

export const kpiData: Kpi[] = [
  {
    title: "Page Views",
    value: "284,730",
    change: "+12.5%",
    up: true,
    color: "#3b82f6",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    spark: [35, 42, 38, 55, 48, 62, 58, 70, 65, 78],
  },
  {
    title: "Unique Visitors",
    value: "124,580",
    change: "+8.3%",
    up: true,
    color: "#22c55e",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    spark: [40, 52, 48, 60, 55, 68, 62, 75, 72, 82],
  },
  {
    title: "Bounce Rate",
    value: "32.1%",
    change: "-2.1%",
    up: false,
    color: "#f59e0b",
    icon: "M7 11l5-5m0 0l5 5m-5-5v12",
    spark: [80, 75, 72, 68, 65, 60, 55, 50, 48, 42],
  },
  {
    title: "Avg Session Duration",
    value: "4m 32s",
    change: "+10s",
    up: true,
    color: "#8b5cf6",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    spark: [30, 35, 32, 40, 38, 45, 42, 50, 48, 55],
  },
  {
    title: "Pages / Session",
    value: "3.8",
    change: "+0.4",
    up: true,
    color: "#06b6d4",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    spark: [25, 30, 28, 35, 32, 38, 36, 42, 40, 45],
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    up: true,
    color: "#ec4899",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    spark: [20, 22, 18, 25, 28, 24, 30, 35, 32, 38],
  },
];

export const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthlyValues = [42000, 38000, 51000, 47000, 59000, 55000, 62000, 68000, 64000, 75000, 72000, 82000];

export const trafficSources: TrafficSource[] = [
  { source: "Organic", visitors: 48290, pct: 38.8, change: "+5.2%", up: true, color: "#22c55e" },
  { source: "Direct", visitors: 28140, pct: 22.6, change: "+2.1%", up: true, color: "#3b82f6" },
  { source: "Social", visitors: 19820, pct: 15.9, change: "+18.7%", up: true, color: "#f59e0b" },
  { source: "Referral", visitors: 15630, pct: 12.6, change: "-3.4%", up: false, color: "#8b5cf6" },
  { source: "Email", visitors: 12700, pct: 10.2, change: "+7.8%", up: true, color: "#ec4899" },
];

export const conicGradient = (() => {
  let cumulative = 0;
  const stops = trafficSources.map((t) => {
    const start = cumulative;
    cumulative += t.pct;
    return `${t.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
})();

export const topPagesData: TopPage[] = [
  { page: "/", views: 45280, unique: 38900, avgTime: "3m 12s", bounce: "28.4%" },
  { page: "/pricing", views: 18340, unique: 15200, avgTime: "4m 45s", bounce: "22.1%" },
  { page: "/features", views: 12560, unique: 10800, avgTime: "5m 02s", bounce: "19.7%" },
  { page: "/blog", views: 9870, unique: 8200, avgTime: "6m 30s", bounce: "35.2%" },
  { page: "/contact", views: 6540, unique: 5400, avgTime: "2m 15s", bounce: "42.8%" },
  { page: "/docs", views: 5210, unique: 4600, avgTime: "7m 10s", bounce: "18.5%" },
];

export const regions: Region[] = [
  { name: "USA", pct: 42.3 },
  { name: "UK", pct: 12.8 },
  { name: "Germany", pct: 8.5 },
  { name: "Canada", pct: 6.2 },
  { name: "Australia", pct: 4.1 },
  { name: "Japan", pct: 3.7 },
];

export const deviceData: Device[] = [
  { name: "Desktop", pct: 62.4, count: "179,240", color: "#3b82f6", icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" },
  { name: "Mobile", pct: 32.1, count: "92,180", color: "#22c55e", icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { name: "Tablet", pct: 5.5, count: "15,810", color: "#f59e0b", icon: "M12 18h.01M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" },
];

export const maxMonthly = Math.max(...monthlyValues);

export const linePoints = monthlyValues
  .map((v, i) => `${(i / (monthlyValues.length - 1)) * 100},${40 - (v / maxMonthly) * 35}`)
  .join(" ");
export const areaPoints = `${linePoints} 100,40 0,40`;
