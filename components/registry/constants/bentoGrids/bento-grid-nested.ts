import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bentoGridNested: RegistryEntry = entry({
    id: "bento-grid-nested",
    title: "Nested Grids",
    description:
      "The same component composes — an outer bento hosts a full inner grid (with its own columns, row height, and gap), including a two-level nest.",
    source: `import { BentoGrid, type BentoCard } from "@/components/ui";

const mini: BentoCard[] = [
  { id: "open", content: <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]"><p className="text-[10px] uppercase tracking-wider opacity-60">Open rate</p><p className="text-lg font-semibold leading-none">42%</p></div> },
  { id: "click", content: <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]"><p className="text-[10px] uppercase tracking-wider opacity-60">Click rate</p><p className="text-lg font-semibold leading-none">18%</p></div> },
  { id: "unsub", content: <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]"><p className="text-[10px] uppercase tracking-wider opacity-60">Unsub</p><p className="text-lg font-semibold leading-none">0.9%</p></div> },
  { id: "bounce", content: <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]"><p className="text-[10px] uppercase tracking-wider opacity-60">Bounces</p><p className="text-lg font-semibold leading-none">2.1%</p></div> },
];

const nested: BentoCard[] = [
  { id: "n1", content: <div className="flex h-full items-center justify-center rounded-xl bg-black/[0.04] text-lg font-semibold dark:bg-white/[0.06]">5.2k</div> },
  { id: "n2", content: <div className="flex h-full items-center justify-center rounded-xl bg-black/[0.04] text-lg font-semibold dark:bg-white/[0.06]">1.8k</div> },
];

const cards: BentoCard[] = [
  {
    id: "campaign",
    title: "Campaign metrics",
    span: { cols: 2, rows: 2 },
    content: (
      <div className="flex h-full flex-col gap-2 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Campaign metrics</p>
        <div className="flex flex-1 items-center">
          <BentoGrid cards={mini} columns={2} tabletColumns={2} mobileColumns={2} rowHeight={50} gap={8} draggable={false} resizable={false} ariaLabel="Campaign metrics grid" />
        </div>
      </div>
    ),
  },
  {
    id: "summary",
    title: "Summary",
    span: { cols: 1, rows: 2 },
    className: "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white",
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Summary</p>
        <div>
          <p className="text-3xl font-semibold leading-none">+23%</p>
          <p className="mt-1 text-xs opacity-70">revenue vs last month</p>
        </div>
        <div className="flex h-8 items-end gap-1">
          {[30, 45, 40, 60, 55, 75, 70, 90].map((v, i) => (
            <div key={i} className="flex-1 rounded-full bg-white/70" style={{ height: v + "%" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "emails",
    title: "Emails sent",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">Emails sent</p>
        <p className="text-3xl font-semibold leading-none">12,4k</p>
      </div>
    ),
  },
  {
    id: "nested",
    title: "Two-level nest",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full items-center p-2">
        <BentoGrid cards={nested} columns={1} mobileColumns={1} rowHeight={22} gap={4} draggable={false} resizable={false} ariaLabel="Nested summary grid" />
      </div>
    ),
  },
];

export default function BentoGridNested() {
  return <BentoGrid cards={cards} columns={3} tabletColumns={2} mobileColumns={1} ariaLabel="Nested bento grid" />;
}`,
  });
