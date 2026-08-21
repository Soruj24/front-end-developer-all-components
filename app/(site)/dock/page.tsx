"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Dock } from "@/components/ui";
import type { DockItem } from "@/components/ui";
import { dockApps, minimalApps } from "@/components/dock/demo";

const DOCK_SOURCE = `"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DockItem { id: string; label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void; }

export interface DockProps {
  className?: string; items: DockItem[]; magnification?: boolean; magnificationMax?: number;
  magnificationRadius?: number; showTooltips?: boolean; draggable?: boolean;
  activeId?: string; onActiveChange?: (id: string | undefined) => void;
  onOrderChange?: (items: DockItem[]) => void; onItemClick?: (item: DockItem) => void; ariaLabel?: string;
}

export function Dock({ className, items: initialItems, magnification = true, magnificationMax = 1.55,
  magnificationRadius = 110, showTooltips = true, draggable = true, activeId: activeIdProp,
  onActiveChange, onOrderChange, onItemClick, ariaLabel = "Application dock" }: DockProps) {
  // ... full implementation with magnification, drag-reorder, keyboard nav, touch support
  return (
    <div className={cn("relative flex select-none items-end gap-1 rounded-2xl border border-border bg-card/80 p-2 shadow-lg backdrop-blur-xl sm:gap-1.5 sm:p-2.5 dark:border-border dark:bg-card/60", className)}
      role="toolbar" aria-label={ariaLabel} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {order.map((item, index) => (
        <div key={item.id} className="group relative flex items-center justify-center">
          <button type="button" aria-label={item.label} aria-current={active ? "true" : undefined}
            className="relative flex size-11 items-center justify-center rounded-2xl outline-none transition-all duration-200 sm:size-12 md:size-14 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card">
            {item.icon}
          </button>
          <span className={cn("pointer-events-none absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-200",
            active ? "scale-100 bg-foreground" : "scale-0 bg-foreground/40")} />
        </div>
      ))}
    </div>
  );
}`;

const BASIC_CODE = `import { Dock } from "@/components/ui";

<Dock items={dockApps} />`;

const STATIC_CODE = `import { Dock } from "@/components/ui";

<Dock items={dockApps} magnification={false} draggable={false} />`;

const MINIMAL_CODE = `import { Dock } from "@/components/ui";

<Dock items={minimalApps} magnification={false} draggable={false} />`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { Dock } from "@/components/ui";

function ControlledDock() {
  const [active, setActive] = useState<string | undefined>("finder");
  return <Dock items={dockApps} activeId={active} onActiveChange={setActive} />;
}`;

const TOOLTIP_CODE = `import { Dock } from "@/components/ui";

<Dock items={dockApps} showTooltips={false} />`;

const STATIC_APPS: DockItem[] = dockApps.map((a) => ({ ...a, active: false }));

export default function DockPage() {
  const [active, setActive] = useState<string | undefined>("finder");

  return (
    <ComponentDocPage
      name="Dock"
      category="Navigation"
      description="A macOS-inspired launcher with magnification, drag-to-reorder, tooltips, active indicators, keyboard navigation, and touch support."
    >
      <PreviewPanel filename="dock-preview.tsx">
        <div className="flex w-full items-end justify-center overflow-x-auto py-10">
          <Dock items={dockApps} ariaLabel="Application dock" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={DOCK_SOURCE}
        filename="components/ui/Dock.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Magnifying Dock"
          description="Icons scale around the cursor with smooth transitions. Drag to reorder."
          code={BASIC_CODE}
          filename="basic.tsx"
        >
          <div className="flex w-full items-end justify-center overflow-x-auto py-10">
            <Dock items={dockApps} ariaLabel="Magnifying dock" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Static Dock"
          description="No magnification or drag — ideal for fixed toolbars."
          code={STATIC_CODE}
          filename="static.tsx"
        >
          <div className="flex w-full items-end justify-center overflow-x-auto py-10">
            <Dock items={STATIC_APPS} magnification={false} draggable={false} ariaLabel="Static dock" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Compact Dock"
          description="Fewer items, no magnification — a minimal quick-launch bar."
          code={MINIMAL_CODE}
          filename="compact.tsx"
        >
          <div className="flex w-full items-end justify-center overflow-x-auto py-10">
            <Dock items={minimalApps} magnification={false} draggable={false} ariaLabel="Compact dock" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled Active State"
          description="Manage the active indicator externally via activeId / onActiveChange."
          code={CONTROLLED_CODE}
          filename="controlled.tsx"
        >
          <div className="flex w-full flex-col items-center gap-4">
            <Dock
              items={dockApps}
              activeId={active}
              onActiveChange={setActive}
              ariaLabel="Controlled dock"
            />
            <p className="text-xs text-muted-foreground">
              Active: <span className="font-medium text-foreground">{active || "(none)"}</span>
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Tooltips"
          description="Hide the hover tooltips for a cleaner look."
          code={TOOLTIP_CODE}
          filename="no-tooltips.tsx"
        >
          <div className="flex w-full items-end justify-center overflow-x-auto py-10">
            <Dock items={dockApps} showTooltips={false} ariaLabel="No-tooltip dock" />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
