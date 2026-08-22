export const BASIC_EXAMPLE = `<DumbbellChart
  data={[
    { label: "Design", start: 20, end: 65 },
    { label: "Development", start: 45, end: 90 },
    { label: "Testing", start: 30, end: 70 },
    { label: "Deployment", start: 10, end: 55 },
  ]}
  className="w-full"
/>`;

export const VERTICAL_EXAMPLE = `<DumbbellChart
  data={[
    { label: "Jan", start: 25, end: 62 },
    { label: "Feb", start: 40, end: 78 },
    { label: "Mar", start: 35, end: 55 },
    { label: "Apr", start: 50, end: 88 },
  ]}
  orientation="vertical"
  className="w-full"
/>`;

export const COLOR_EXAMPLE = `<DumbbellChart
  data={[
    { label: "Frontend", start: 62, end: 88 },
    { label: "Backend", start: 54, end: 79 },
    { label: "DevOps", start: 41, end: 66 },
  ]}
  color="bg-emerald-500"
/>`;

export const SALES_EXAMPLE = `const quarters = [
  { label: "Q1", start: 42, end: 68 },
  { label: "Q2", start: 51, end: 74 },
  { label: "Q3", start: 63, end: 59 },
  { label: "Q4", start: 70, end: 91 },
];

<DumbbellChart data={quarters} color="bg-blue-500" max={100} />`;

export const TEAM_EXAMPLE = `<DumbbellChart
  data={[
    { label: "Ava", start: 18, end: 34 },
    { label: "Noah", start: 22, end: 30 },
    { label: "Mia", start: 12, end: 28 },
  ]}
  color="bg-purple-500"
/>`;

export const TIMELINE_EXAMPLE = `const phases = [
  { label: "Discovery", start: 0, end: 100 },
  { label: "Design", start: 15, end: 85 },
  { label: "Build", start: 40, end: 62 },
];

<DumbbellChart data={phases} color="bg-orange-500" />`;

export const BUDGET_EXAMPLE = `// Inverted ranges (spent < allocated) are handled correctly.
const budgets = [
  { label: "Engineering", start: 88, end: 92 },
  { label: "Operations", start: 62, end: 48 },
  { label: "Marketing", start: 30, end: 41 },
];

<DumbbellChart data={budgets} color="bg-rose-500" max={100} />`;

export const PLAYGROUND_EXAMPLE = `<DumbbellChart
  data={data}
  orientation={orientation}
  showValues={showValues}
  color="bg-emerald-500"
  className="w-full"
/>`;
