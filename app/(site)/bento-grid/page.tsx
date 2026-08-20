"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { BentoGrid } from "@/components/ui";
import {
  analyticsCards,
  BentoNested,
  BentoPlayground,
} from "@/components/bento-grid/demo";

const BENTOCARD_SOURCE = `import { memo } from "react";
import { cn } from "@/lib/cn";

interface BentoCardProps {
  card: BentoCardData;
  layoutItem: LayoutItem;
  isDragging: boolean;
  isResizing: boolean;
  isSelected: boolean;
  cellWidth: number;
  rowHeight: number;
  gap: number;
  resizable: boolean;
  draggable: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: string) => void;
  onFocus: (id: string) => void;
  onResizePointerDown: (e: React.PointerEvent<HTMLSpanElement>, id: string) => void;
  onResizePointerMove: (e: React.PointerEvent<HTMLSpanElement>) => void;
  onResizePointerUp: (e: React.PointerEvent<HTMLSpanElement>) => void;
  onResizePointerCancel: (e: React.PointerEvent<HTMLSpanElement>) => void;
}

export const BentoCard = memo(function BentoCard({ ... }: BentoCardProps) {
  const box = boxOf(layoutItem, cellWidth, rowHeight, gap);
  return (
    <div
      aria-label={card.title ?? \`Bento card \${card.id}\`}
      tabIndex={isSelected ? 0 : -1}
      className={cn(
        "group absolute flex touch-none flex-col overflow-hidden rounded-2xl border border-border bg-card",
        "transition-[left,top,width,height,transform,box-shadow,border-color] duration-300 ease-out",
        !isDragging && !isResizing &&
          "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        draggable && !isDragging && "cursor-grab",
        isDragging && "z-50 cursor-grabbing shadow-2xl shadow-black/10 transition-none will-change-[left,top]",
        isResizing && "z-40",
        card.className,
      )}
      style={style}
    >
      {draggable && <DragHandle />}
      <div className="relative flex min-h-0 flex-1 flex-col">{card.content ?? null}</div>
      {resizable && (
        <span data-bento-resize className="absolute bottom-1.5 right-1.5 z-20 flex size-5 touch-none cursor-nwse-resize items-center justify-center rounded-md border border-border/50 bg-background/80 opacity-0 backdrop-blur-sm transition-all duration-150 group-hover:opacity-100 hover:bg-muted">
          <ResizeHandleIcon />
        </span>
      )}
    </div>
  );
});`;

const ANALYTICS_SOURCE = `import { BentoGrid } from "@/components/ui";
import { analyticsCards } from "@/components/bento-grid/demo";

<BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />`;

const PLAYGROUND_SOURCE = `import { useState } from "react";
import { BentoGrid, type BentoCardSpan } from "@/components/ui";

export function BentoPlayground() {
  const [spans, setSpans] = useState<Record<string, BentoCardSpan>>({});
  const [moves, setMoves] = useState(0);

  return (
    <BentoGrid
      cards={cards}
      onResize={(id, span) => setSpans((prev) => ({ ...prev, [id]: span }))}
      onReorder={() => setMoves((m) => m + 1)}
      ariaLabel="Bento drag and resize playground"
    />
  );
}`;

const NESTED_SOURCE = `import { BentoGrid } from "@/components/ui";

<BentoGrid
  cards={nestedCards}
  columns={3}
  tabletColumns={2}
  mobileColumns={1}
  ariaLabel="Nested bento grid"
/>`;

const STATIC_SOURCE = `import { BentoGrid, type BentoCard } from "@/components/ui";

const cards: BentoCard[] = [
  { id: "a", span: { cols: 2, rows: 1 }, content: <div>Wide card</div> },
  { id: "b", span: { cols: 1, rows: 2 }, content: <div>Tall card</div> },
  { id: "c", span: { cols: 1, rows: 1 }, content: <div>Small card</div> },
  { id: "d", span: { cols: 1, rows: 1 }, content: <div>Small card</div> },
];

<BentoGrid
  cards={cards}
  draggable={false}
  resizable={false}
  columns={3}
  ariaLabel="Static bento grid"
/>`;

const RESPONSIVE_SOURCE = `import { BentoGrid, type BentoCard } from "@/components/ui";

<BentoGrid
  cards={cards}
  columns={4}
  tabletColumns={2}
  mobileColumns={1}
  rowHeight={80}
  gap={16}
  ariaLabel="Responsive bento grid"
/>`;

function StaticDemo() {
  const cards = [
    {
      id: "header",
      span: { cols: 3, rows: 1 },
      className: "bg-gradient-to-r from-indigo-500 to-violet-600 text-white",
      content: (
        <div className="flex h-full items-center justify-between p-4">
          <div>
            <p className="text-sm font-semibold">Welcome back</p>
            <p className="text-xs opacity-80">Here is your dashboard overview</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">
            📊
          </div>
        </div>
      ),
    },
    {
      id: "stat-1",
      span: { cols: 1, rows: 1 },
      content: (
        <div className="flex h-full flex-col justify-between p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Users</p>
          <p className="text-2xl font-semibold">12,345</p>
        </div>
      ),
    },
    {
      id: "stat-2",
      span: { cols: 1, rows: 1 },
      content: (
        <div className="flex h-full flex-col justify-between p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Revenue</p>
          <p className="text-2xl font-semibold">$48k</p>
        </div>
      ),
    },
    {
      id: "stat-3",
      span: { cols: 1, rows: 1 },
      content: (
        <div className="flex h-full flex-col justify-between p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Growth</p>
          <p className="text-2xl font-semibold text-emerald-600">+24%</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full py-4">
      <BentoGrid
        cards={cards}
        draggable={false}
        resizable={false}
        columns={3}
        tabletColumns={2}
        mobileColumns={1}
        ariaLabel="Static dashboard grid"
      />
    </div>
  );
}

function ResponsiveDemo() {
  const cards = [
    { id: "r1", span: { cols: 2, rows: 2 }, className: "bg-gradient-to-br from-sky-400 to-blue-600 text-white", content: <div className="flex h-full items-center justify-center p-4 text-lg font-semibold">Hero</div> },
    { id: "r2", span: { cols: 1, rows: 1 }, content: <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-muted-foreground">1×1</div> },
    { id: "r3", span: { cols: 1, rows: 1 }, content: <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-muted-foreground">1×1</div> },
    { id: "r4", span: { cols: 2, rows: 1 }, content: <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-muted-foreground">2×1 wide</div> },
    { id: "r5", span: { cols: 1, rows: 2 }, className: "bg-gradient-to-br from-rose-400 to-pink-600 text-white", content: <div className="flex h-full items-center justify-center p-4 text-sm font-semibold">1×2 tall</div> },
    { id: "r6", span: { cols: 1, rows: 1 }, content: <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-muted-foreground">1×1</div> },
    { id: "r7", span: { cols: 1, rows: 1 }, content: <div className="flex h-full items-center justify-center p-4 text-sm font-medium text-muted-foreground">1×1</div> },
  ];

  return (
    <div className="w-full py-4">
      <BentoGrid
        cards={cards}
        draggable={false}
        resizable={false}
        columns={4}
        tabletColumns={2}
        mobileColumns={1}
        rowHeight={80}
        gap={16}
        ariaLabel="Responsive bento grid"
      />
    </div>
  );
}

export default function BentoGridPage() {
  return (
    <ComponentDocPage
      name="Bento Grid"
      category="Layout"
      description="A data-driven bento grid builder with drag-to-reorder, corner-resize, keyboard navigation, responsive columns, and nested grids. Cards pack into a compact, collision-free layout with animated reshuffling."
    >
      <PreviewPanel filename="bento-grid-preview.tsx">
        <div className="w-full py-4">
          <BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BENTOCARD_SOURCE}
        filename="components/ui/BentoGrid/BentoCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Analytics Grid"
          description="Pre-defined analytics cards in a bento layout with gradients and sparklines."
          code={ANALYTICS_SOURCE}
        >
          <div className="w-full py-4">
            <BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Static Dashboard"
          description="Non-interactive grid with disabled drag and resize."
          code={STATIC_SOURCE}
        >
          <StaticDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Responsive Layout"
          description="Cards reflow across 4 desktop → 2 tablet → 1 mobile columns."
          code={RESPONSIVE_SOURCE}
        >
          <ResponsiveDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Interactive Playground"
          description="Drag, resize, and reorder cards in real-time. Focus a card and use arrow keys to move, Shift+arrow to resize."
          code={PLAYGROUND_SOURCE}
        >
          <div className="w-full">
            <BentoPlayground />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Nested Grid"
          description="Grids nested inside other grids for complex layouts."
          code={NESTED_SOURCE}
        >
          <div className="w-full">
            <BentoNested />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
