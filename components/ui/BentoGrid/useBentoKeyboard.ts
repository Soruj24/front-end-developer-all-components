import { useCallback } from "react";
import * as React from "react";
import type { BentoCard, BentoGridProps, Cell, Span } from "./BentoGrid.types";
import type { UseBentoGridCore } from "./useBentoGrid";
import { clamp, computeLayout } from "./BentoGrid.utils";

const Dirs: Record<string, Cell> = {
  ArrowLeft: { col: -1, row: 0 },
  ArrowRight: { col: 1, row: 0 },
  ArrowUp: { col: 0, row: -1 },
  ArrowDown: { col: 0, row: 1 },
};

export function useBentoKeyboard(
  core: UseBentoGridCore,
  props: Pick<BentoGridProps, "draggable" | "resizable">,
  onReorder?: (cards: BentoCard[]) => void,
  onResize?: (id: string, span: Span) => void,
) {
  const { activeCols, cardById, orderRef, spansRef, setOrder } = core;

  return useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, id: string) => {
      const d = Dirs[event.key];
      if (!d) return;
      event.preventDefault();

      if (event.shiftKey && props.resizable) {
        const span = spansRef.current[id] ?? { cols: 1, rows: 1 };
        const card = cardById.get(id);
        const minC = card?.min?.cols ?? 1;
        const maxC = card?.max?.cols ? Math.min(card.max.cols, activeCols) : activeCols;
        const minR = card?.min?.rows ?? 1;
        const maxR = card?.max?.rows ?? 8;
        const next: Span = {
          cols: clamp(span.cols + d.col, minC, maxC),
          rows: clamp(span.rows + d.row, minR, maxR),
        };
        spansRef.current = { ...spansRef.current, [id]: next };
        onResize?.(id, next);
      } else if (props.draggable) {
        const items = orderRef.current.map((o) => ({
          id: o,
          span: spansRef.current[o] ?? { cols: 1, rows: 1 },
        }));
        const base = computeLayout(items, activeCols);
        const cell = base.find((l) => l.id === id) ?? { col: 0, row: 0 };
        const target: Cell = {
          col: clamp(cell.col + d.col, 0, activeCols - 1),
          row: clamp(cell.row + d.row, 0, 100),
        };
        const nextLayout = computeLayout(items, activeCols, { [id]: target });
        const placed = new Map(nextLayout.map((l) => [l.id, l]));
        const others = orderRef.current.filter((o) => o !== id);
        const index = others.findIndex((o) => {
          const p = placed.get(o)!;
          return p.col > target.col || (p.col === target.col && p.row >= target.row);
        });
        const next = [...others];
        next.splice(index === -1 ? others.length : index, 0, id);
        orderRef.current = next;
        setOrder(next);
        onReorder?.(next.map((o) => cardById.get(o)).filter((c): c is BentoCard => Boolean(c)));
      }
    },
    [props.draggable, props.resizable, activeCols, cardById, orderRef, spansRef, setOrder, onReorder, onResize],
  );
}
