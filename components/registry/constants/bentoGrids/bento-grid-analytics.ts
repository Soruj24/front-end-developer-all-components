import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bentoGridAnalytics: RegistryEntry = entry({
    id: "bento-grid-analytics",
    title: "Analytics Bento",
    description:
      "A dashboard-style bento — cards of every size pack into a compact grid. Drag to reorder, pull a corner to resize, and watch the layout glide into place.",
    source: `import { BentoGrid, type BentoCard } from "@/components/ui";

function Sparkline({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 40" preserveAspectRatio="none" className={"h-10 w-full " + (className ?? "")} aria-hidden="true">
      <path d={d + " L120 40 L0 40 Z"} fill="currentColor" opacity={0.12} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function Stat({ label, value, delta, d }: { label: string; value: string; delta?: string; d: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">{label}</p>
        {delta && <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500 dark:text-emerald-300">{delta}</span>}
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold leading-none">{value}</p>
        <Sparkline d={d} />
      </div>
    </div>
  );
}

const cards: BentoCard[] = [
  {
    id: "traffic",
    title: "Traffic",
    span: { cols: 2, rows: 2 },
    className: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider opacity-80">Traffic</p>
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">+18%</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="text-4xl font-semibold leading-none">48,290</p>
          <Sparkline d="M0 34 L18 28 L36 30 L54 22 L72 24 L90 14 L108 16 L120 8" className="h-12 w-28" />
        </div>
        <p className="text-xs opacity-80">visits this month</p>
      </div>
    ),
  },
  {
    id: "channels",
    title: "Top channels",
    span: { cols: 2, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between gap-3 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Top channels</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Search", value: 62 },
            { label: "Direct", value: 48 },
            { label: "Referral", value: 31 },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs opacity-70">{row.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: row.value + "%" }} />
              </div>
              <span className="w-8 shrink-0 text-right text-xs tabular-nums opacity-70">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "followers",
    title: "Followers",
    span: { cols: 1, rows: 1 },
    content: <Stat label="Followers" value="8,214" delta="+4.2%" d="M0 30 L24 26 L48 28 L72 20 L96 22 L120 12" />,
  },
  {
    id: "views",
    title: "Views",
    span: { cols: 1, rows: 1 },
    content: <Stat label="Views" value="129k" delta="+9%" d="M0 34 L24 30 L48 32 L72 18 L96 20 L120 10" />,
  },
  {
    id: "streak",
    title: "Streak",
    span: { cols: 1, rows: 2 },
    className: "bg-gradient-to-b from-amber-400/90 to-orange-500/90 text-white",
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Streak</p>
          <span className="text-lg">🔥</span>
        </div>
        <div>
          <p className="text-3xl font-semibold leading-none">12</p>
          <p className="mt-1 text-xs opacity-70">days in a row</p>
        </div>
      </div>
    ),
  },
  {
    id: "target",
    title: "Monthly target",
    span: { cols: 2, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between gap-2 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Monthly target</p>
          <span className="text-xs tabular-nums opacity-70">68%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>
        <p className="text-xs opacity-60">34 of 50 milestones delivered</p>
      </div>
    ),
  },
  {
    id: "devices",
    title: "Devices",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Devices</p>
        <div className="flex h-full items-end gap-1">
          {[55, 80, 38].map((v, i) => (
            <div key={i} className="flex-1 rounded-full bg-zinc-400 dark:bg-zinc-500" style={{ height: v + "%" }} />
          ))}
        </div>
        <div className="flex justify-between text-[10px] opacity-60">
          <span>iOS</span>
          <span>Web</span>
          <span>Android</span>
        </div>
      </div>
    ),
  },
  {
    id: "speed",
    title: "Speed",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Speed</p>
        <p className="text-3xl font-semibold leading-none">
          0.8<span className="text-base font-normal opacity-70">s</span>
        </p>
        <p className="text-xs text-emerald-500 dark:text-emerald-400">p95 load</p>
      </div>
    ),
  },
];

export default function BentoGridAnalytics() {
  return <BentoGrid cards={cards} ariaLabel="Analytics bento grid" />;
}`,
  });
