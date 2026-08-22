"use client";

import { useCallback, useRef, useState } from "react";

export interface FreehandLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  size?: number;
}

/**
 * Freehand line drawing in normalized 0-100 coordinates so strokes scale
 * with any rendered size. Pair with an SVG using viewBox="0 0 100 100",
 * preserveAspectRatio="none" and vectorEffect="non-scaling-stroke".
 */
export function useFreehandLines(initial: FreehandLine[] = []) {
  const [lines, setLines] = useState<FreehandLine[]>(initial);
  const drawingRef = useRef(false);

  const pointOf = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  }, []);

  const start = useCallback(
    (e: React.PointerEvent<SVGSVGElement>, color?: string, size?: number) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      drawingRef.current = true;
      const p = pointOf(e);
      setLines((ls) => [...ls, { x1: p.x, y1: p.y, x2: p.x, y2: p.y, color, size }]);
    },
    [pointOf],
  );

  const extend = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!drawingRef.current) return;
      const p = pointOf(e);
      setLines((ls) => {
        const last = ls[ls.length - 1];
        return last ? [...ls.slice(0, -1), { ...last, x2: p.x, y2: p.y }] : ls;
      });
    },
    [pointOf],
  );

  const stop = useCallback(() => {
    drawingRef.current = false;
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const undo = useCallback(() => setLines((ls) => ls.slice(0, -1)), []);

  return { lines, start, extend, stop, clear, undo };
}
