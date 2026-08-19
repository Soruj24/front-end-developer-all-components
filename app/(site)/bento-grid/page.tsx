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

const BENTOGRID_SOURCE = `import type { ReactNode } from "react";

export interface BentoCardSpan {
  cols?: number;
  rows?: number;
}

export interface BentoCard {
  id: string;
  title?: string;
  content?: ReactNode;
  span?: BentoCardSpan;
  min?: BentoCardSpan;
  max?: BentoCardSpan;
  className?: string;
}

export interface BentoGridProps {
  className?: string;
  cards: BentoCard[];
  columns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  rowHeight?: number;
  gap?: number;
  resizable?: boolean;
  draggable?: boolean;
  ariaLabel?: string;
  onReorder?: (cards: BentoCard[]) => void;
  onResize?: (id: string, span: BentoCardSpan) => void;
}

export function BentoGrid({
  className,
  cards,
  columns = 4,
  tabletColumns = 2,
  mobileColumns = 1,
  rowHeight = 72,
  gap = 12,
  resizable = true,
  draggable = true,
  ariaLabel = "Bento grid",
  onReorder,
  onResize,
}: BentoGridProps) {
  // ... hooks for grid core, drag, resize, keyboard
  return <div role="grid" aria-label={ariaLabel}>...</div>;
}`;

const ANALYTICS_SOURCE = `import { BentoGrid } from "@/components/ui";
import { analyticsCards } from "@/components/bento-grid/demo";

<BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />`;

const PLAYGROUND_SOURCE = `import { useState } from "react";
import { BentoGrid, type BentoCard, type BentoCardSpan } from "@/components/ui";

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

      <SourceCodeViewer source={BENTOGRID_SOURCE} filename="components/ui/BentoGrid/BentoGrid.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Analytics Grid"
          description="Pre-defined analytics cards in a bento layout."
          code={ANALYTICS_SOURCE}
          filename="analytics.tsx"
        >
          <div className="w-full py-4">
            <BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive Playground"
          description="Drag, resize, and reorder cards in real-time."
          code={PLAYGROUND_SOURCE}
          filename="playground.tsx"
        >
          <div className="w-full">
            <BentoPlayground />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Nested Grid"
          description="Grids nested inside other grids for complex layouts."
          code={NESTED_SOURCE}
          filename="nested.tsx"
        >
          <div className="w-full">
            <BentoNested />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
