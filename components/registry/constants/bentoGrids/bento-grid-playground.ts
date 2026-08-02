import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bentoGridPlayground: RegistryEntry = entry({
    id: "bento-grid-playground",
    title: "Drag & Resize Playground",
    description:
      "Every card reports its live size, and every drop fires the callbacks — reorder, resize, and read the grid state through a minimal API.",
    source: `import { useState } from "react";
import { BentoGrid, type BentoCard } from "@/components/ui";

const base: BentoCard[] = [
  { id: "hero", title: "Hero", span: { cols: 2, rows: 2 } },
  { id: "side", title: "Side", span: { cols: 1, rows: 1 } },
  { id: "note", title: "Note", span: { cols: 1, rows: 1 } },
  { id: "wide", title: "Wide", span: { cols: 2, rows: 1 } },
  { id: "tall", title: "Tall", span: { cols: 1, rows: 2 } },
  { id: "small", title: "Small", span: { cols: 1, rows: 1 } },
];

const colors: Record<string, string> = {
  hero: "from-sky-400 to-indigo-500",
  side: "from-emerald-400 to-teal-500",
  note: "from-amber-400 to-orange-500",
  wide: "from-fuchsia-400 to-purple-500",
  tall: "from-rose-400 to-pink-500",
  small: "from-cyan-400 to-sky-500",
};

export default function BentoGridPlayground() {
  const [spans, setSpans] = useState<Record<string, { cols: number; rows: number }>>({});
  const [moves, setMoves] = useState(0);

  const cards = base.map((card) => ({
    ...card,
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-br p-3 text-center text-white">
        <span className="font-mono text-2xl font-semibold leading-none">
          {(spans[card.id]?.cols ?? card.span?.cols ?? 1)}x
          {(spans[card.id]?.rows ?? card.span?.rows ?? 1)}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider opacity-80">{card.title}</span>
      </div>
    ),
    className: "border-transparent " + (colors[card.id] ?? ""),
  }));

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <BentoGrid
        cards={cards}
        onResize={(id, span) => setSpans((prev) => ({ ...prev, [id]: span }))}
        onReorder={() => setMoves((m) => m + 1)}
        ariaLabel="Bento drag and resize playground"
      />
      <p className="text-center text-xs text-subtle">
        {moves > 0 && "Layout updated " + moves + " time" + (moves === 1 ? "" : "s") + " · "}
        Drag a card to reorder, pull the corner handle to resize. Focus a card and use
        {" "}<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">→</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↓</kbd> to move,
        add <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">⇧</kbd> to resize.
      </p>
    </div>
  );
}`,
  });
