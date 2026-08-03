import { useEffect, useMemo, useRef, useState } from "react";
import * as React from "react";
import type { BentoCard, BentoGridProps, Cell, Span } from "./BentoGrid.types";
import { useBreakpoint } from "./useBreakpoint";
import { computeLayout } from "./BentoGrid.utils";

export interface UseBentoGridCore {
  order: string[];
  spans: Record<string, Span>;
  containerWidth: number;
  activeCols: number;
  cellWidth: number;
  rowHeight: number;
  gap: number;
  resizable: boolean;
  maxRowEnd: number;
  containerHeight: number;
  layout: ReturnType<typeof computeLayout>;
  cardById: Map<string, BentoCard>;
  draggingId: string | null;
  dragCell: Cell | null;
  dragPx: { left: number; top: number } | null;
  resizingId: string | null;
  focusedId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  orderRef: React.MutableRefObject<string[]>;
  spansRef: React.MutableRefObject<Record<string, Span>>;
  dragStateRef: React.MutableRefObject<{ id: string; offsetX: number; offsetY: number } | null>;
  resizeStateRef: React.MutableRefObject<{ id: string; startX: number; startY: number; span: Span } | null>;
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
  setSpans: React.Dispatch<React.SetStateAction<Record<string, Span>>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>;
  setDragCell: React.Dispatch<React.SetStateAction<Cell | null>>;
  setDragPx: React.Dispatch<React.SetStateAction<{ left: number; top: number } | null>>;
  setResizingId: React.Dispatch<React.SetStateAction<string | null>>;
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useBentoGridCore(props: BentoGridProps): UseBentoGridCore {
  const { cards, columns = 4, tabletColumns = 2, mobileColumns = 1, rowHeight = 72, gap = 12, resizable = true } = props;

  const [order, setOrder] = useState<string[]>(() => cards.map((c) => c.id));
  const [spans, setSpans] = useState<Record<string, Span>>(() => {
    const s: Record<string, Span> = {};
    for (const card of cards) s[card.id] = { cols: card.span?.cols ?? 1, rows: card.span?.rows ?? 1 };
    return s;
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragCell, setDragCell] = useState<Cell | null>(null);
  const [dragPx, setDragPx] = useState<{ left: number; top: number } | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStateRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const resizeStateRef = useRef<{ id: string; startX: number; startY: number; span: Span } | null>(null);
  const orderRef = useRef(order);
  const spansRef = useRef(spans);

  useEffect(() => { orderRef.current = order; }, [order]);
  useEffect(() => { spansRef.current = spans; }, [spans]);

  const bp = useBreakpoint();
  const activeCols = useMemo(() => Math.max(1, bp === "lg" ? columns : bp === "sm" ? tabletColumns : mobileColumns), [bp, columns, tabletColumns, mobileColumns]);
  const cellWidth = useMemo(() => (containerWidth > 0 ? Math.max(0, (containerWidth - gap * (activeCols - 1)) / activeCols) : 0), [containerWidth, gap, activeCols]);
  const cardById = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const layout = useMemo(() => {
    const items = order.map((id) => ({ id, span: spans[id] ?? { cols: 1, rows: 1 } }));
    const pin = draggingId && dragCell ? { [draggingId]: dragCell } : undefined;
    return computeLayout(items, activeCols, pin);
  }, [order, spans, activeCols, draggingId, dragCell]);
  const maxRowEnd = useMemo(() => layout.reduce((m, l) => Math.max(m, l.row + l.rows), 0), [layout]);
  const containerHeight = useMemo(() => (containerWidth > 0 ? maxRowEnd * rowHeight + (maxRowEnd - 1) * gap : 0), [containerWidth, maxRowEnd, rowHeight, gap]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(Math.round(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { order, spans, containerWidth, activeCols, cellWidth, rowHeight, gap, resizable, maxRowEnd, containerHeight,
    layout, cardById, draggingId, dragCell, dragPx, resizingId, focusedId, containerRef, cardRefs, orderRef, spansRef,
    dragStateRef, resizeStateRef, setOrder, setSpans, setContainerWidth, setDraggingId, setDragCell,
    setDragPx, setResizingId, setFocusedId };
}
