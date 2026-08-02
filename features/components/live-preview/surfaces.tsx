"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  BentoGrid,
  Button,
  CommandMenu,
  CommandPalette,
  PricingCalculator,
  SpotlightSearch,
  VariantMatrix,
} from "@/components/ui";

export const surfaces: Record<string, () => ReactNode> = {
  "bento-grid": () => (
    <div className="w-full max-w-xl">
      <BentoGrid
        columns={3}
        gap={8}
        rowHeight={48}
        draggable={false}
        resizable={false}
        cards={[
          { id: "hero", title: "Hero", span: { cols: 2, rows: 2 }, content: <Box className="bg-primary-soft"><span>Hero</span></Box> },
          { id: "stats", title: "Stats", span: { cols: 1, rows: 2 }, content: <Box className="bg-success-soft"><span>Stats</span></Box> },
          { id: "chart", title: "Chart", span: { cols: 2, rows: 1 }, content: <Box className="bg-warning-soft"><span>Chart</span></Box> },
          { id: "cta", title: "CTA", span: { cols: 1, rows: 1 }, content: <Box className="bg-info-soft"><span>CTA</span></Box> },
        ]}
      />
    </div>
  ),

  "variant-matrix": () => (
    <div className="w-full max-w-xl">
      <VariantMatrix
        title="Button"
        searchable={false}
        filterable={false}
        rows={[
          { id: "sm", label: "Small" },
          { id: "md", label: "Medium" },
        ]}
        columns={[
          { id: "primary", label: "Primary" },
          { id: "outline", label: "Outline" },
          { id: "ghost", label: "Ghost" },
        ]}
        cells={[
          { id: "a", row: "sm", column: "primary", preview: <Button size="sm" variant="primary">Action</Button>, config: '<Button size="sm" variant="primary">' },
          { id: "b", row: "sm", column: "outline", preview: <Button size="sm" variant="outline">Action</Button>, config: '<Button size="sm" variant="outline">' },
          { id: "c", row: "sm", column: "ghost", preview: <Button size="sm" variant="ghost">Action</Button>, config: '<Button size="sm" variant="ghost">' },
          { id: "d", row: "md", column: "primary", preview: <Button size="md" variant="primary">Action</Button>, config: '<Button variant="primary">' },
          { id: "e", row: "md", column: "outline", preview: <Button size="md" variant="outline">Action</Button>, config: '<Button variant="outline">' },
          { id: "f", row: "md", column: "ghost", preview: <Button size="md" variant="ghost">Action</Button>, config: '<Button variant="ghost">' },
        ]}
      />
    </div>
  ),

  "pricing-calculator": () => (
    <div className="w-full max-w-xl">
      <PricingCalculator
        items={[
          { id: "seats", label: "Seats", unit: "seat", unitPrice: 12, min: 1, max: 50, defaultQuantity: 5 },
          {
            id: "storage",
            label: "Storage",
            unit: "GB",
            tiers: [
              { upTo: 10, price: 0.5 },
              { upTo: 100, price: 0.25 },
            ],
            min: 1,
            max: 200,
            defaultQuantity: 40,
          },
        ]}
        defaultCycle="monthly"
        showTierHints={false}
      />
    </div>
  ),

  "spotlight-search": () => <SpotlightDemo />,

  "command-palette": () => <PaletteDemo />,

  "command-menu": () => <CommandMenuDemo />,
};

function Box({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center text-xs font-medium text-foreground ${className ?? ""}`}>
      {children}
    </div>
  );
}

function SpotlightDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open search
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        bindShortcut={false}
        items={[
          { id: "1", label: "Button", subtitle: "buttons · 482k downloads", category: "Components", popular: true },
          { id: "2", label: "Card", subtitle: "surfaces · 421k downloads", category: "Components", popular: true },
          { id: "3", label: "Pricing", subtitle: "Templates", category: "Pages" },
          { id: "4", label: "Setup guide", subtitle: "Docs", category: "Help" },
        ]}
      />
    </>
  );
}

function PaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        bindShortcut={false}
        items={[
          { id: "a", label: "Go to Dashboard", group: "Go to", onSelect: () => {} },
          { id: "b", label: "Go to Components", group: "Go to", onSelect: () => {} },
          { id: "c", label: "New component", shortcut: "⌘N", group: "Actions", onSelect: () => {} },
          { id: "d", label: "Deploy", shortcut: "⌘⇧D", group: "Actions", onSelect: () => {} },
        ]}
      />
    </>
  );
}

function CommandMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Open menu
      </Button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          {
            group: "Actions",
            items: [
              { id: "a", label: "Copy install command", onSelect: () => {} },
              { id: "b", label: "View source", onSelect: () => {} },
            ],
          },
        ]}
      />
    </>
  );
}
