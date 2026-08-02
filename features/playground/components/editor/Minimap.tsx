"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOKEN_COLORS } from "../../utils/highlight";

interface MinimapProps {
  classes: string[];
  totalLines: number;
  contentHeight: number;
  scrollTop: number;
  onScrollTo: (top: number) => void;
}

const DOT_HEIGHT = 2;
const GAP = 1;

export function Minimap({ classes, totalLines, contentHeight, scrollTop, onScrollTo }: MinimapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.clientHeight));
    observer.observe(el);
    setHeight(el.clientHeight);
    return () => observer.disconnect();
  }, []);

  const scrollable = Math.max(contentHeight - height, 1);
  const ratio = contentHeight > height ? scrollTop / scrollable : 0;
  const viewportRatio = Math.max(0.05, Math.min(1, height / Math.max(contentHeight, 1)));

  const scrollToFromY = useCallback(
    (clientY: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const y = clientY - rect.top;
      const fraction = Math.min(1, Math.max(0, y / rect.height));
      onScrollTo(fraction * scrollable);
    },
    [scrollable, onScrollTo]
  );

  return (
    <div
      ref={ref}
      className="relative w-[72px] shrink-0 select-none overflow-hidden border-l border-[#2a2a2e] bg-[#1a1a1c]"
      onPointerDown={(e) => {
        dragging.current = true;
        scrollToFromY(e.clientY);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (dragging.current) scrollToFromY(e.clientY);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onDoubleClick={(e) => scrollToFromY(e.clientY)}
    >
      <div className="px-2 py-1">
        {Array.from({ length: totalLines }, (_, i) => {
          const cls = classes[i] ?? "tok-plain";
          return (
            <div
              key={i}
              style={{ height: DOT_HEIGHT, marginBottom: GAP, backgroundColor: TOKEN_COLORS[cls] ?? "#3a3a41" }}
              className="w-full rounded-[1px] opacity-80"
            />
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute right-0 rounded-l bg-[#2b7de9]/90"
        style={{ top: ratio * 100 + "%", width: 4, height: `${Math.max(8, viewportRatio * 100)}%` }}
      />
    </div>
  );
}
