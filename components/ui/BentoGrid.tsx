"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface BentoCardSpan {
  cols?: number;
  rows?: number;
}

export interface BentoCard {
  id: string;
  /** Optional label used in the card's accessible name. */
  title?: string;
  /** Card content — any ReactNode. Use `span` to size the cell. */
  content?: React.ReactNode;
  span?: BentoCardSpan;
  /** Minimum resizable size, in grid cells. */
  min?: BentoCardSpan;
  /** Maximum resizable size, in grid cells. */
  max?: BentoCardSpan;
  className?: string;
}

export interface BentoGridProps {
  className?: string;
  /** Cards to lay out. Array order drives the packed layout. */
  cards: BentoCard[];
  /** Columns on large screens (>=1024px). Default 4. */
  columns?: number;
  /** Columns on small screens (640-1023px). Default 2. */
  tabletColumns?: number;
  /** Columns below 640px. Default 1. */
  mobileColumns?: number;
  /** Height of one grid row in px. Default 72. */
  rowHeight?: number;
  /** Gap between cells in px. Default 12. */
  gap?: number;
  /** Enable corner-resize handles. Default true. */
  resizable?: boolean;
  /** Enable drag-to-reorder. Default true. */
  draggable?: boolean;
  ariaLabel?: string;
  /** Fired after a drag reorder, with the cards in their new order. */
  onReorder?: (cards: BentoCard[]) => void;
  /** Fired after a resize (mouse or keyboard), with the new span. */
  onResize?: (id: string, span: BentoCardSpan) => void;
}

interface Span {
  cols: number;
  rows: number;
}

interface Cell {
  col: number;
  row: number;
}

interface LayoutItem extends Span {
  id: string;
  col: number;
  row: number;
}

/* ------------------------------------------------------------------ */
/* Pack layout engine                                                  */
/* ------------------------------------------------------------------ */

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

/**
 * Packs cards top-left with no overlap, preserving array order.
 * `pinned` cards are placed at their exact cell first (used to keep the
 * card being dragged at the pointer while the rest shuffle around it).
 */
function computeLayout(
  items: { id: string; span: Span }[],
  cols: number,
  pinned?: Record<string, Cell>
): LayoutItem[] {
  const occupied = new Set<string>();
  const layout: LayoutItem[] = [];
  const placed = new Set<string>();

  const occupy = (col: number, row: number, w: number, h: number) => {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) occupied.add(`${c},${r}`);
    }
  };
  const free = (col: number, row: number, w: number, h: number) => {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        if (occupied.has(`${c},${r}`)) return false;
      }
    }
    return true;
  };

  if (pinned) {
    for (const item of items) {
      const p = pinned[item.id];
      if (!p) continue;
      const w = clamp(item.span.cols, 1, cols);
      occupy(p.col, p.row, w, item.span.rows);
      layout.push({
        id: item.id,
        col: p.col,
        row: p.row,
        cols: w,
        rows: item.span.rows,
      });
      placed.add(item.id);
    }
  }

  for (const item of items) {
    if (placed.has(item.id)) continue;
    const w = clamp(item.span.cols, 1, cols);
    const h = Math.max(1, item.span.rows);
    let found = false;
    for (let row = 0; row <= 200 && !found; row++) {
      for (let col = 0; col <= cols - w; col++) {
        if (free(col, row, w, h)) {
          occupy(col, row, w, h);
          layout.push({ id: item.id, col, row, cols: w, rows: h });
          found = true;
          break;
        }
      }
    }
    if (!found) {
      occupy(0, 200, w, h);
      layout.push({ id: item.id, col: 0, row: 200, cols: w, rows: h });
    }
  }
  return layout;
}

type Breakpoint = "lg" | "sm" | "base";

function useBreakpoint(): Breakpoint {
  const read = (): Breakpoint =>
    typeof window === "undefined"
      ? "lg"
      : window.matchMedia("(min-width: 1024px)").matches
        ? "lg"
        : window.matchMedia("(min-width: 640px)").matches
          ? "sm"
          : "base";
  const [bp, setBp] = useState<Breakpoint>(read);
  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const onChange = () => setBp(read());
    mqLg.addEventListener("change", onChange);
    mqSm.addEventListener("change", onChange);
    return () => {
      mqLg.removeEventListener("change", onChange);
      mqSm.removeEventListener("change", onChange);
    };
  }, []);
  return bp;
}

/* ------------------------------------------------------------------ */
/* BentoGrid                                                           */
/* ------------------------------------------------------------------ */

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
  const [order, setOrder] = useState<string[]>(() => cards.map((c) => c.id));
  const [spans, setSpans] = useState<Record<string, Span>>(() => {
    const s: Record<string, Span> = {};
    for (const card of cards) {
      s[card.id] = {
        cols: card.span?.cols ?? 1,
        rows: card.span?.rows ?? 1,
      };
    }
    return s;
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragCell, setDragCell] = useState<Cell | null>(null);
  const [dragPx, setDragPx] = useState<{ left: number; top: number } | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStateRef = useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const resizeStateRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    span: Span;
  } | null>(null);
  const orderRef = useRef(order);
  const spansRef = useRef(spans);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);
  useEffect(() => {
    spansRef.current = spans;
  }, [spans]);

  const bp = useBreakpoint();
  const activeCols = Math.max(
    1,
    bp === "lg" ? columns : bp === "sm" ? tabletColumns : mobileColumns
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(Math.round(entry.contentRect.width));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardById = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  const layout = useMemo(() => {
    const items = order.map((id) => ({
      id,
      span: spans[id] ?? { cols: 1, rows: 1 },
    }));
    const pin =
      draggingId && dragCell ? { [draggingId]: dragCell } : undefined;
    return computeLayout(items, activeCols, pin);
  }, [order, spans, activeCols, draggingId, dragCell]);

  const cellWidth =
    containerWidth > 0
      ? Math.max(0, (containerWidth - gap * (activeCols - 1)) / activeCols)
      : 0;
  const maxRowEnd = layout.reduce((m, l) => Math.max(m, l.row + l.rows), 0);
  const containerHeight =
    containerWidth > 0 ? maxRowEnd * rowHeight + (maxRowEnd - 1) * gap : 0;

  const boxOf = (l: LayoutItem) => ({
    left: l.col * (cellWidth + gap),
    top: l.row * (rowHeight + gap),
    width: l.cols * cellWidth + (l.cols - 1) * gap,
    height: l.rows * rowHeight + (l.rows - 1) * gap,
  });

  const clientToCell = (x: number, y: number): Cell => ({
    col: clamp(Math.floor(x / (cellWidth + gap)), 0, activeCols - 1),
    row: clamp(Math.floor(y / (rowHeight + gap)), 0, 200),
  });

  const reorderLive = (id: string, cell: Cell) => {
    const current = orderRef.current;
    const others = current.filter((o) => o !== id);
    const items = current.map((o) => ({
      id: o,
      span: spansRef.current[o] ?? { cols: 1, rows: 1 },
    }));
    const nextLayout = computeLayout(items, activeCols, { [id]: cell });
    const placed = new Map(nextLayout.map((l) => [l.id, l]));
    const target = others.findIndex((o) => {
      const p = placed.get(o)!;
      return p.col > cell.col || (p.col === cell.col && p.row >= cell.row);
    });
    const next = [...others];
    next.splice(target === -1 ? others.length : target, 0, id);
    if (next.some((v, i) => v !== current[i])) {
      orderRef.current = next;
      setOrder(next);
    }
  };

  const handleCardPointerDown = (event: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (!draggable || resizingId) return;
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("button, a, [data-bento-resize]")) return;
    const container = containerRef.current;
    const el = cardRefs.current[id];
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    dragStateRef.current = {
      id,
      offsetX: event.clientX - elRect.left,
      offsetY: event.clientY - elRect.top,
    };
    const left = event.clientX - elRect.left - containerRect.left;
    const top = event.clientY - elRect.top - containerRect.top;
    setDraggingId(id);
    setDragPx({ left, top });
    setDragCell(clientToCell(left, top));
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* capture unsupported */
    }
  };

  const handleCardPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragStateRef.current;
    if (!ds) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const left = event.clientX - ds.offsetX - containerRect.left;
    const top = event.clientY - ds.offsetY - containerRect.top;
    setDragPx({ left, top });
    const cell = clientToCell(left, top);
    setDragCell(cell);
    reorderLive(ds.id, cell);
  };

  const handleCardPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragStateRef.current;
    if (!ds) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* capture already released */
    }
    dragStateRef.current = null;
    setDraggingId(null);
    setDragCell(null);
    setDragPx(null);
    onReorder?.(
      orderRef.current
        .map((id) => cardById.get(id))
        .filter((c): c is BentoCard => Boolean(c))
    );
  };

  const handleResizePointerDown = (event: React.PointerEvent<HTMLSpanElement>, id: string) => {
    event.stopPropagation();
    if (!resizable || event.button !== 0) return;
    resizeStateRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      span: spansRef.current[id] ?? { cols: 1, rows: 1 },
    };
    setResizingId(id);
    setFocusedId(id);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* capture unsupported */
    }
  };

  const handleResizePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const rs = resizeStateRef.current;
    if (!rs) return;
    const card = cardById.get(rs.id);
    const dx = event.clientX - rs.startX;
    const dy = event.clientY - rs.startY;
    const dCols = Math.round(dx / (cellWidth + gap));
    const dRows = Math.round(dy / (rowHeight + gap));
    const minC = card?.min?.cols ?? 1;
    const maxC = card?.max?.cols ? Math.min(card.max.cols, activeCols) : activeCols;
    const minR = card?.min?.rows ?? 1;
    const maxR = card?.max?.rows ?? 8;
    const next: Span = {
      cols: clamp(rs.span.cols + dCols, minC, maxC),
      rows: clamp(rs.span.rows + dRows, minR, maxR),
    };
    spansRef.current = { ...spansRef.current, [rs.id]: next };
    setSpans((prev) => ({ ...prev, [rs.id]: next }));
  };

  const handleResizePointerUp = (event: React.PointerEvent<HTMLSpanElement>) => {
    const rs = resizeStateRef.current;
    if (!rs) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* capture already released */
    }
    const span = spansRef.current[rs.id] ?? rs.span;
    resizeStateRef.current = null;
    setResizingId(null);
    onResize?.(rs.id, span);
  };

  const moveCardBy = (id: string, dc: number, dr: number) => {
    const current = orderRef.current;
    const items = current.map((o) => ({
      id: o,
      span: spansRef.current[o] ?? { cols: 1, rows: 1 },
    }));
    const base = computeLayout(items, activeCols, undefined);
    const cell = base.find((l) => l.id === id) ?? { col: 0, row: 0 };
    const target: Cell = {
      col: clamp(cell.col + dc, 0, activeCols - 1),
      row: clamp(cell.row + dr, 0, 100),
    };
    const nextLayout = computeLayout(items, activeCols, { [id]: target });
    const placed = new Map(nextLayout.map((l) => [l.id, l]));
    const others = current.filter((o) => o !== id);
    const index = others.findIndex((o) => {
      const p = placed.get(o)!;
      return p.col > target.col || (p.col === target.col && p.row >= target.row);
    });
    const next = [...others];
    next.splice(index === -1 ? others.length : index, 0, id);
    orderRef.current = next;
    setOrder(next);
    onReorder?.(
      next.map((o) => cardById.get(o)).filter((c): c is BentoCard => Boolean(c))
    );
  };

  const resizeCardBy = (id: string, dc: number, dr: number) => {
    const span = spansRef.current[id] ?? { cols: 1, rows: 1 };
    const card = cardById.get(id);
    const minC = card?.min?.cols ?? 1;
    const maxC = card?.max?.cols ? Math.min(card.max.cols, activeCols) : activeCols;
    const minR = card?.min?.rows ?? 1;
    const maxR = card?.max?.rows ?? 8;
    const next: Span = {
      cols: clamp(span.cols + dc, minC, maxC),
      rows: clamp(span.rows + dr, minR, maxR),
    };
    spansRef.current = { ...spansRef.current, [id]: next };
    setSpans((prev) => ({ ...prev, [id]: next }));
    onResize?.(id, next);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    const dirs: Record<string, Cell> = {
      ArrowLeft: { col: -1, row: 0 },
      ArrowRight: { col: 1, row: 0 },
      ArrowUp: { col: 0, row: -1 },
      ArrowDown: { col: 0, row: 1 },
    };
    const d = dirs[event.key];
    if (!d) return;
    event.preventDefault();
    if (event.shiftKey) {
      if (resizable) resizeCardBy(id, d.col, d.row);
    } else if (draggable) {
      moveCardBy(id, d.col, d.row);
    }
  };

  return (
    <div
      ref={containerRef}
      role="grid"
      aria-label={ariaLabel}
      aria-colcount={activeCols}
      aria-rowcount={maxRowEnd}
      className={cn("relative w-full select-none", className)}
      style={{ height: containerWidth > 0 ? containerHeight : undefined }}
    >
      {containerWidth > 0 &&
        layout.map((l) => {
          const card = cardById.get(l.id);
          if (!card) return null;
          const box = boxOf(l);
          const isDragging = draggingId === l.id;
          const isResizing = resizingId === l.id;
          const style: React.CSSProperties = {
            left: isDragging && dragPx ? dragPx.left : box.left,
            top: isDragging && dragPx ? dragPx.top : box.top,
            width: box.width,
            height: box.height,
          };
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              role="gridcell"
              aria-label={card.title ?? `Bento card ${card.id}`}
              tabIndex={focusedId === card.id ? 0 : -1}
              onFocus={() => setFocusedId(card.id)}
              onPointerDown={(e) => handleCardPointerDown(e, card.id)}
              onPointerMove={handleCardPointerMove}
              onPointerUp={handleCardPointerUp}
              onPointerCancel={handleCardPointerUp}
              onKeyDown={(e) => handleCardKeyDown(e, card.id)}
              className={cn(
                "group absolute flex touch-none flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm outline-none",
                "transition-[left,top,width,height,transform,box-shadow] duration-300 ease-out",
                "dark:border-white/[0.08] dark:bg-zinc-900/70",
                !isDragging &&
                  !isResizing &&
                  "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] dark:hover:shadow-black/40",
                "focus-visible:ring-2 focus-visible:ring-ring/70",
                draggable && !isDragging && "cursor-grab",
                isDragging &&
                  "z-50 cursor-grabbing shadow-xl transition-none will-change-[left,top]",
                isResizing && "z-40",
                card.className
              )}
              style={style}
            >
              {draggable && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                >
                  <span className="flex gap-1 rounded-full bg-black/10 px-1.5 py-1 dark:bg-white/15">
                    <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
                    <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
                    <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
                  </span>
                </span>
              )}
              <div className="relative flex min-h-0 flex-1 flex-col">
                {card.content ?? null}
              </div>
              {resizable && (
                <span
                  data-bento-resize
                  aria-hidden="true"
                  onPointerDown={(e) => handleResizePointerDown(e, card.id)}
                  onPointerMove={handleResizePointerMove}
                  onPointerUp={handleResizePointerUp}
                  onPointerCancel={handleResizePointerUp}
                  className="absolute bottom-1 right-1 z-20 flex size-4 touch-none cursor-nwse-resize items-center justify-center rounded opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <svg
                    className="h-3 w-3 text-zinc-400 dark:text-zinc-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M9 15l6-6" />
                    <path d="M9 19l10-10" />
                    <path d="M15 19l4-4" />
                  </svg>
                </span>
              )}
            </div>
          );
        })}
    </div>
  );
}
