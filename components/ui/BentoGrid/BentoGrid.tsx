"use client";

import { cn } from "@/lib/cn";
import type { BentoGridProps } from "./BentoGrid.types";
import { useBentoGridCore, type UseBentoGridCore } from "./useBentoGrid";
import { useBentoDrag } from "./useBentoDrag";
import { useBentoResize } from "./useBentoResize";
import { useBentoKeyboard } from "./useBentoKeyboard";
import { BentoCard } from "./BentoCard";

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
  const grid = useBentoGridCore({ cards, columns, tabletColumns, mobileColumns, rowHeight, gap, resizable });

  const {
    containerRef, containerWidth, activeCols, maxRowEnd, containerHeight,
    layout, cardById, draggingId, resizingId, focusedId, cellWidth, rowHeight: rh, gap: g,
    setDraggingId, setDragCell, setDragPx, setSpans, setResizingId,
    orderRef, spansRef, dragStateRef, resizeStateRef,
  } = grid;

  const dragCore: UseBentoGridCore = {
    ...grid, containerRef, cardRefs: grid.cardRefs, dragStateRef, orderRef, spansRef,
    activeCols, cellWidth, rowHeight: rh, gap: g,
    setDraggingId, setDragCell, setDragPx,
  };
  const drag = useBentoDrag(dragCore, onReorder);

  const resizeCore: UseBentoGridCore = {
    ...grid, resizeStateRef, spansRef,
    activeCols, cellWidth, rowHeight: rh, gap: g,
    setSpans, setResizingId, setFocusedId: grid.setFocusedId,
  };
  const resize = useBentoResize(resizeCore, onResize);

  const keyboardCore: UseBentoGridCore = {
    ...grid, orderRef, spansRef, setOrder: grid.setOrder,
    activeCols, cardById,
  };
  const keyboard = useBentoKeyboard(keyboardCore, { draggable, resizable }, onReorder, onResize);

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
      {containerWidth > 0 && layout.map((l) => {
        const card = cardById.get(l.id);
        if (!card) return null;

        return (
          <BentoCard
            key={card.id}
            card={card}
            layoutItem={l}
            isDragging={draggingId === l.id}
            isResizing={resizingId === l.id}
            isSelected={focusedId === card.id}
            cellWidth={cellWidth}
            rowHeight={rh}
            gap={g}
            resizable={resizable}
            draggable={draggable}
            onPointerDown={drag.handlePointerDown}
            onPointerMove={drag.handlePointerMove}
            onPointerUp={drag.handlePointerUp}
            onPointerCancel={drag.handlePointerUp}
            onKeyDown={keyboard}
            onFocus={() => {}}
            onResizePointerDown={resize.handlePointerDown}
            onResizePointerMove={resize.handlePointerMove}
            onResizePointerUp={resize.handlePointerUp}
            onResizePointerCancel={resize.handlePointerUp}
          />
        );
      })}
    </div>
  );
}
