import { useCallback, useMemo } from "react";
import * as React from "react";
import type { BentoCard, Span } from "./BentoGrid.types";
import type { UseBentoGridCore } from "./useBentoGrid";
import { clamp } from "./BentoGrid.utils";

export function useBentoResize(
  core: UseBentoGridCore,
  onResize?: (id: string, span: Span) => void,
) {
  const {
    resizeStateRef, spansRef,
    activeCols, cellWidth, rowHeight, gap,
    setSpans, setResizingId, setFocusedId,
  } = core;

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>, id: string) => {
      event.stopPropagation();
      if (!core.resizable || event.button !== 0) return;
      resizeStateRef.current = { id, startX: event.clientX, startY: event.clientY, span: spansRef.current[id] ?? { cols: 1, rows: 1 } };
      setResizingId(id);
      setFocusedId(id);
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
    },
    [core.resizable, resizeStateRef, spansRef, setResizingId, setFocusedId],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const rs = resizeStateRef.current;
      if (!rs) return;
      const card: BentoCard | undefined = core.cardById.get(rs.id);
      const dx = event.clientX - rs.startX;
      const dy = event.clientY - rs.startY;
      const dCols = Math.round(dx / (cellWidth + gap));
      const dRows = Math.round(dy / (rowHeight + gap));
      const minC = card?.min?.cols ?? 1;
      const maxC = card?.max?.cols ? Math.min(card.max.cols, activeCols) : activeCols;
      const minR = card?.min?.rows ?? 1;
      const maxR = card?.max?.rows ?? 8;
      const next: Span = { cols: clamp(rs.span.cols + dCols, minC, maxC), rows: clamp(rs.span.rows + dRows, minR, maxR) };
      spansRef.current = { ...spansRef.current, [rs.id]: next };
      setSpans((prev) => ({ ...prev, [rs.id]: next }));
    },
    [resizeStateRef, core.cardById, cellWidth, rowHeight, gap, activeCols, spansRef, setSpans],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const rs = resizeStateRef.current;
      if (!rs) return;
      try { event.currentTarget.releasePointerCapture(event.pointerId); } catch {}
      const span = spansRef.current[rs.id] ?? rs.span;
      resizeStateRef.current = null;
      setResizingId(null);
      onResize?.(rs.id, span);
    },
    [resizeStateRef, spansRef, setResizingId, onResize],
  );

  return useMemo(() => ({ handlePointerDown, handlePointerMove, handlePointerUp }),
    [handlePointerDown, handlePointerMove, handlePointerUp]);
}
