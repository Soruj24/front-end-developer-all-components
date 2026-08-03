import { useCallback, useMemo } from "react";
import * as React from "react";
import type { BentoCard } from "./BentoGrid.types";
import type { UseBentoGridCore } from "./useBentoGrid";
import { clientToCell } from "./BentoGrid.utils";

export function useBentoDrag(
  core: UseBentoGridCore,
  onReorder?: (cards: BentoCard[]) => void,
) {
  const {
    cardById, containerRef, cardRefs, dragStateRef,
    activeCols, cellWidth, rowHeight, gap,
    setDraggingId, setDragCell, setDragPx,
  } = core;

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, id: string) => {
      if (core.resizingId !== null) return;
      if (event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, a, [data-bento-resize]")) return;
      const container = containerRef.current;
      const el = cardRefs.current[id];
      if (!container || !el) return;
      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      dragStateRef.current = { id, offsetX: event.clientX - er.left, offsetY: event.clientY - er.top };
      const left = event.clientX - er.left - cr.left;
      const top = event.clientY - er.top - cr.top;
      setDraggingId(id);
      setDragPx({ left, top });
      setDragCell(clientToCell(left, top, cellWidth, rowHeight, gap, activeCols));
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
    },
    [containerRef, cardRefs, dragStateRef, core.resizingId, cellWidth, rowHeight, gap, activeCols, setDraggingId, setDragCell, setDragPx],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const ds = dragStateRef.current;
      if (!ds) return;
      const container = containerRef.current;
      if (!container) return;
      const cr = container.getBoundingClientRect();
      const left = event.clientX - ds.offsetX - cr.left;
      const top = event.clientY - ds.offsetY - cr.top;
      setDragPx({ left, top });
      const cell = clientToCell(left, top, cellWidth, rowHeight, gap, activeCols);
      setDragCell(cell);
    },
    [cellWidth, rowHeight, gap, activeCols, dragStateRef, containerRef, setDragCell, setDragPx],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const ds = dragStateRef.current;
      if (!ds) return;
      try { event.currentTarget.releasePointerCapture(event.pointerId); } catch {}
      dragStateRef.current = null;
      setDraggingId(null);
      setDragCell(null);
      setDragPx(null);
      const ordered = core.orderRef.current
        .map((oid) => cardById.get(oid))
        .filter((c): c is BentoCard => Boolean(c));
      onReorder?.(ordered);
    },
    [dragStateRef, cardById, core.orderRef, setDraggingId, setDragCell, setDragPx, onReorder],
  );

  return useMemo(() => ({ handlePointerDown, handlePointerMove, handlePointerUp }),
    [handlePointerDown, handlePointerMove, handlePointerUp]);
}
