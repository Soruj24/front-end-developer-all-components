export const bentoGridSource: string = `"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BentoCardSpan {
  cols?: number;
  rows?: number;
}

export interface BentoCard {
  id: string;
  title?: string;
  content?: ReactNode;
  span?: BentoCardSpan;
  min?: BentoCardSpan;
  max?: BentoCardSpan;
  className?: string;
}

export interface BentoGridProps {
  cards: BentoCard[];
  columns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  rowHeight?: number;
  gap?: number;
  resizable?: boolean;
  draggable?: boolean;
  ariaLabel?: string;
  className?: string;
  onReorder?: (cards: BentoCard[]) => void;
  onResize?: (id: string, span: BentoCardSpan) => void;
}

export function BentoGrid({
  cards: initialCards,
  columns = 4,
  tabletColumns = 2,
  mobileColumns = 1,
  rowHeight = 72,
  gap = 12,
  resizable = true,
  draggable = true,
  ariaLabel = "Bento grid",
  className,
  onReorder,
  onResize,
}: BentoGridProps) {
  const [cards, setCards] = useState<BentoCard[]>(initialCards);
  const [dragId, setDragId] = useState<string | null>(null);

  const move = useCallback(
    (id: string, dir: -1 | 1) => {
      setCards((prev) => {
        const idx = prev.findIndex((c) => c.id === id);
        const target = idx + dir;
        if (idx < 0 || target < 0 || target >= prev.length) return prev;
        const next = [...prev];
        const item = next.splice(idx, 1)[0];
        next.splice(target, 0, item);
        onReorder?.(next);
        return next;
      });
    },
    [onReorder]
  );

  const resize = useCallback(
    (id: string, key: "cols" | "rows", delta: 1 | -1) => {
      setCards((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const cur = key === "cols" ? (c.span?.cols ?? 1) : (c.span?.rows ?? 1);
          const bound =
            key === "cols"
              ? { min: c.min?.cols ?? 1, max: c.max?.cols ?? columns }
              : { min: c.min?.rows ?? 1, max: c.max?.rows ?? 4 };
          const nextVal = Math.min(bound.max, Math.max(bound.min, cur + delta));
          const next = { ...c, span: { ...c.span, [key]: nextVal } };
          onResize?.(id, next.span ?? {});
          return next;
        })
      );
    },
    [columns, onResize]
  );

  if (cards.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-dashed border-border p-10 text-sm text-muted-foreground",
          className
        )}
        role="grid"
        aria-label={ariaLabel}
      >
        No cards to display.
      </div>
    );
  }

  const gridClass = "bento-grid-" + columns + "-" + tabletColumns + "-" + mobileColumns;

  return (
    <>
    <style>{"." + gridClass + "{grid-template-columns:repeat(" + mobileColumns + ",minmax(0,1fr))}@media(min-width:640px){." + gridClass + "{grid-template-columns:repeat(" + tabletColumns + ",minmax(0,1fr))}}@media(min-width:1024px){." + gridClass + "{grid-template-columns:repeat(" + columns + ",minmax(0,1fr))}}"}</style>
    <div
      role="grid"
      aria-label={ariaLabel}
      aria-colcount={columns}
      className={cn("grid w-full", gridClass, className)}
      style={{
        gridAutoRows: rowHeight + "px",
        gap: gap + "px",
      }}
    >
      {cards.map((card) => (
        <article
          key={card.id}
          role="gridcell"
          aria-label={card.title ?? card.id}
          draggable={draggable}
          onDragStart={(e) => {
            if (!draggable) return;
            setDragId(card.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!draggable || !dragId || dragId === card.id) return;
            setCards((prev) => {
              const from = prev.findIndex((c) => c.id === dragId);
              const to = prev.findIndex((c) => c.id === card.id);
              if (from < 0 || to < 0) return prev;
              const next = [...prev];
              const item = next.splice(from, 1)[0];
              next.splice(to, 0, item);
              onReorder?.(next);
              return next;
            });
            setDragId(null);
          }}
          onDragEnd={() => setDragId(null)}
          className={cn(
            "group relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card p-3 ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            dragId === card.id && "opacity-60",
            card.className
          )}
          style={{
            gridColumnEnd: "span " + Math.min(columns, card.span?.cols ?? 1),
            gridRowEnd: "span " + (card.span?.rows ?? 1),
          }}
        >
          {card.title && (
            <h3 className="mb-1 truncate text-xs font-semibold tracking-tight text-foreground">
              {card.title}
            </h3>
          )}
          <div className="min-h-0 flex-1 overflow-hidden text-sm text-muted-foreground">
            {card.content}
          </div>
          <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
            {draggable && (
              <>
                <button
                  type="button"
                  aria-label={"Move " + (card.title ?? card.id) + " earlier"}
                  onClick={() => move(card.id, -1)}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label={"Move " + (card.title ?? card.id) + " later"}
                  onClick={() => move(card.id, 1)}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  →
                </button>
              </>
            )}
            {resizable && (
              <>
                <button
                  type="button"
                  aria-label={"Widen " + (card.title ?? card.id)}
                  onClick={() => resize(card.id, "cols", 1)}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  W+
                </button>
                <button
                  type="button"
                  aria-label={"Narrow " + (card.title ?? card.id)}
                  onClick={() => resize(card.id, "cols", -1)}
                  className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  W−
                </button>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
    </>
  );
}
`;
