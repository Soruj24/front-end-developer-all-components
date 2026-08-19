"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Dock } from "@/components/ui";
import { dockApps, minimalApps } from "@/components/dock/demo";

const DOCK_SOURCE = `"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  /** Pinned indicator, independent of the click-to-toggle active state. */
  active?: boolean;
  onClick?: () => void;
}

export interface DockProps {
  className?: string;
  items: DockItem[];
  /** Pointer-driven magnification (auto-disabled on touch). Default true. */
  magnification?: boolean;
  /** Max scale of the hovered icon. */
  magnificationMax?: number;
  /** Distance in px over which magnification falls off. */
  magnificationRadius?: number;
  /** Label tooltip on hover / focus. Default true. */
  showTooltips?: boolean;
  /** Allow drag-to-reorder. Default true. */
  draggable?: boolean;
  /** Controlled active id. When omitted the dock toggles it internally. */
  activeId?: string;
  onActiveChange?: (id: string | undefined) => void;
  onOrderChange?: (items: DockItem[]) => void;
  onItemClick?: (item: DockItem) => void;
  ariaLabel?: string;
}

/* ------------------------------------------------------------------ */
/* Dock                                                                */
/* ------------------------------------------------------------------ */

export function Dock({
  className,
  items: initialItems,
  magnification = true,
  magnificationMax = 1.55,
  magnificationRadius = 110,
  showTooltips = true,
  draggable = true,
  activeId: activeIdProp,
  onActiveChange,
  onOrderChange,
  onItemClick,
  ariaLabel = "Application dock",
}: DockProps) {
  const [order, setOrder] = useState<DockItem[]>(initialItems);
  const [scales, setScales] = useState<number[]>(() => initialItems.map(() => 1));
  const [activeIdInternal, setActiveIdInternal] = useState<string | undefined>(() =>
    initialItems.find((i) => i.active)?.id
  );
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [dragId, setDragId] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const activeId = activeIdProp ?? activeIdInternal;

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const orderRef = useRef(order);
  const dragStateRef = useRef<{
    id: string;
    from: number;
    moved: boolean;
    startX: number;
    startY: number;
  } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = () => setFinePointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const activate = useCallback(
    (index: number) => {
      const item = orderRef.current[index];
      if (!item) return;
      onItemClick?.(item);
      item.onClick?.();
      if (activeIdProp === undefined) {
        setActiveIdInternal((prev) => (prev === item.id ? undefined : item.id));
      }
      onActiveChange?.(item.id === activeId ? undefined : item.id);
    },
    [onItemClick, activeIdProp, activeId, onActiveChange]
  );

  const focusItem = useCallback((index: number) => {
    const length = orderRef.current.length;
    const next = Math.max(0, Math.min(length - 1, index));
    setFocusedIndex(next);
    buttonRefs.current[next]?.focus();
  }, []);

  const handleItemKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        focusItem(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        focusItem(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusItem(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusItem(orderRef.current.length - 1);
      }
    },
    [focusItem]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!magnification || !finePointer || dragId) return;
      const radius = magnificationRadius;
      const x = event.clientX;
      const order = orderRef.current;
      setScales(
        order.map((_, index) => {
          const el = itemRefs.current[index];
          if (!el) return 1;
          const rect = el.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const dist = Math.abs(x - center);
          if (dist >= radius) return 1;
          const falloff = 1 - dist / radius;
          return 1 + (magnificationMax - 1) * falloff * falloff;
        })
      );
    },
    [magnification, finePointer, dragId, magnificationMax, magnificationRadius]
  );

  const handleMouseLeave = useCallback(() => {
    setScales(orderRef.current.map(() => 1));
  }, []);

  const endDrag = useCallback(
    (commit: boolean) => {
      const ds = dragStateRef.current;
      if (!ds) return;
      dragStateRef.current = null;
      if (ds.moved) {
        suppressClickRef.current = true;
        setDragId(null);
        if (commit) onOrderChange?.(orderRef.current);
      }
    },
    [onOrderChange]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
      if (!draggable) return;
      if (event.button !== 0) return;
      const item = orderRef.current[index];
      if (!item) return;
      dragStateRef.current = {
        id: item.id,
        from: index,
        moved: false,
        startX: event.clientX,
        startY: event.clientY,
      };
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* capture unsupported */
      }
    },
    [draggable]
  );

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragStateRef.current;
    if (!ds) return;
    if (!ds.moved) {
      const dist = Math.hypot(event.clientX - ds.startX, event.clientY - ds.startY);
      if (dist < 6) return;
      ds.moved = true;
      setDragId(ds.id);
      setScales(orderRef.current.map(() => 1));
    }
    event.preventDefault();
    const from = ds.from;
    const draggedRect = itemRefs.current[from]?.getBoundingClientRect();
    if (!draggedRect) return;
    const mid = draggedRect.left + draggedRect.width / 2;
    let to = from;
    if (event.clientX > mid) {
      const rightRect = itemRefs.current[from + 1]?.getBoundingClientRect();
      if (rightRect && event.clientX > rightRect.left + rightRect.width / 2) to = from + 1;
    } else {
      const leftRect = itemRefs.current[from - 1]?.getBoundingClientRect();
      if (leftRect && event.clientX < leftRect.left + leftRect.width / 2) to = from - 1;
    }
    if (to !== from) {
      const next = [...orderRef.current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      orderRef.current = next;
      ds.from = to;
      setOrder(next);
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* capture already released */
      }
      endDrag(true);
    },
    [endDrag]
  );

  const handlePointerCancel = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* capture already released */
      }
      endDrag(false);
    },
    [endDrag]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        return;
      }
      activate(index);
    },
    [activate]
  );

  return (
    <div
      className={cn(
        "relative flex select-none items-end gap-1 rounded-3xl border border-black/[0.05] bg-white/70 p-2 shadow-card backdrop-blur-2xl sm:gap-1.5 sm:p-2.5 dark:border-white/[0.08] dark:bg-zinc-900/60",
        className
      )}
      role="toolbar"
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {order.map((item, index) => {
        const active = item.active === true || item.id === activeId;
        const isDraggingItem = dragId === item.id;
        const scale = isDraggingItem ? 1.3 : scales[index] ?? 1;
        return (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn("group relative flex items-center justify-center", isDraggingItem && "z-30")}
          >
            {showTooltips && !dragId && (
              <span className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2.5 -translate-x-1/2 scale-95 whitespace-nowrap rounded-lg bg-zinc-900/95 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 dark:bg-zinc-100/95 dark:text-zinc-900">
                {item.label}
              </span>
            )}
            <button
              type="button"
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              aria-label={item.label}
              aria-current={active ? "true" : undefined}
              tabIndex={focusedIndex === index ? 0 : -1}
              onFocus={() => setFocusedIndex(index)}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              onClick={(e) => handleClick(e, index)}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              className={cn(
                "relative flex size-11 items-center justify-center rounded-[26%] outline-none transition-transform duration-150 ease-spring sm:size-12 md:size-14",
                "focus-visible:ring-2 focus-visible:ring-ring/70",
                isDraggingItem ? "cursor-grabbing" : "cursor-default"
              )}
              style={{
                transform: \`scale(\${scale})\`,
                transformOrigin: "center bottom",
                zIndex: isDraggingItem ? 40 : scale > 1.01 ? 20 : undefined,
              }}
            >
              {item.icon}
            </button>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-200 ease-out",
                active
                  ? "scale-100 bg-zinc-800 dark:bg-zinc-100"
                  : "scale-0 bg-zinc-800/40 dark:bg-zinc-100/40"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}`;

const BASIC_CODE = `import { Dock } from "@/components/ui";

<Dock items={dockApps} ariaLabel="Application dock" />`;

const MINIMAL_CODE = `<Dock items={minimalApps} magnification={false} draggable={false} />`;

export default function DockPage() {
  return (
    <ComponentDocPage
      name="Dock"
      category="Navigation"
      description="A macOS-inspired launcher. Icons magnify around the cursor, labels pop on hover, running apps carry a dot, and everything is draggable, keyboard-accessible, responsive, and theme-aware."
    >
      <PreviewPanel filename="dock-preview">
        <div className="flex w-full items-end justify-center overflow-x-auto py-10">
          <Dock items={dockApps} ariaLabel="Application dock" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DOCK_SOURCE} filename="Dock.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Magnifying Dock"
          description="Icons magnify around the cursor with smooth CSS transitions."
          code={BASIC_CODE}
        >
          <PreviewPanel>
            <div className="flex w-full items-end justify-center overflow-x-auto py-10">
              <Dock items={dockApps} ariaLabel="Application dock" />
            </div>
          </PreviewPanel>
        </ExampleBlock>

        <ExampleBlock
          title="Minimal Dock"
          description="Same component, fewer features — ideal for compact toolbars."
          code={MINIMAL_CODE}
        >
          <PreviewPanel>
            <div className="flex w-full flex-col items-center gap-3 py-10">
              <Dock items={minimalApps} magnification={false} draggable={false} ariaLabel="Quick launch toolbar" />
            </div>
          </PreviewPanel>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
