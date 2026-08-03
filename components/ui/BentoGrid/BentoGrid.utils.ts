import type { Breakpoint, Cell, LayoutItem, Span } from "./BentoGrid.types";

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function isBreakpoint(w: number): Breakpoint {
  if (w < 768) return "sm";
  if (w < 1024) return "md";
  return "lg";
}

export function computeLayout(
  items: { id: string; span: Span }[],
  cols: number,
  pinned?: Record<string, Cell>,
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

export function boxOf(l: LayoutItem, cellWidth: number, rowHeight: number, gap: number) {
  return {
    left: l.col * (cellWidth + gap),
    top: l.row * (rowHeight + gap),
    width: l.cols * cellWidth + (l.cols - 1) * gap,
    height: l.rows * rowHeight + (l.rows - 1) * gap,
  };
}

export function clientToCell(
  x: number,
  y: number,
  cellWidth: number,
  rowHeight: number,
  gap: number,
  activeCols: number,
): Cell {
  return {
    col: clamp(Math.floor(x / (cellWidth + gap)), 0, activeCols - 1),
    row: clamp(Math.floor(y / (rowHeight + gap)), 0, 200),
  };
}
