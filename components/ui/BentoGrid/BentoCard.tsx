import { memo } from "react";
import { cn } from "@/lib/cn";
import type { BentoCard as BentoCardData, LayoutItem } from "./BentoGrid.types";
import { boxOf } from "./BentoGrid.utils";

interface BentoCardProps {
  card: BentoCardData;
  layoutItem: LayoutItem;
  isDragging: boolean;
  isResizing: boolean;
  isSelected: boolean;
  cellWidth: number;
  rowHeight: number;
  gap: number;
  resizable: boolean;
  draggable: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: string) => void;
  onFocus: (id: string) => void;
  onResizePointerDown: (e: React.PointerEvent<HTMLSpanElement>, id: string) => void;
  onResizePointerMove: (e: React.PointerEvent<HTMLSpanElement>) => void;
  onResizePointerUp: (e: React.PointerEvent<HTMLSpanElement>) => void;
  onResizePointerCancel: (e: React.PointerEvent<HTMLSpanElement>) => void;
}

export const BentoCard = memo(function BentoCard({
  card,
  layoutItem,
  isDragging,
  isResizing,
  isSelected,
  cellWidth,
  rowHeight,
  gap,
  resizable,
  draggable,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onFocus,
  onResizePointerDown,
  onResizePointerMove,
  onResizePointerUp,
  onResizePointerCancel,
}: BentoCardProps) {
  const box = boxOf(layoutItem, cellWidth, rowHeight, gap);
  const style: React.CSSProperties = { left: box.left, top: box.top, width: box.width, height: box.height };

  return (
    <div
      aria-label={card.title ?? `Bento card ${card.id}`}
      tabIndex={isSelected ? 0 : -1}
      onFocus={() => onFocus(card.id)}
      onPointerDown={(e) => onPointerDown(e, card.id)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onKeyDown={(e) => onKeyDown(e, card.id)}
      className={cn(
        "group absolute flex touch-none flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm outline-none",
        "transition-[left,top,width,height,transform,box-shadow] duration-300 ease-out",
        "dark:border-white/[0.08] dark:bg-zinc-900/70",
        !isDragging && !isResizing && "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] dark:hover:shadow-black/40",
        "focus-visible:ring-2 focus-visible:ring-ring/70",
        draggable && !isDragging && "cursor-grab",
        isDragging && "z-50 cursor-grabbing shadow-xl transition-none will-change-[left,top]",
        isResizing && "z-40",
        card.className,
      )}
      style={style}
    >
      {draggable && <DragHandle />}
      <div className="relative flex min-h-0 flex-1 flex-col">{card.content ?? null}</div>
      {resizable && (
        <span
          data-bento-resize
          aria-hidden="true"
          onPointerDown={(e) => onResizePointerDown(e, card.id)}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          onPointerCancel={onResizePointerCancel}
          className="absolute bottom-1 right-1 z-20 flex size-4 touch-none cursor-nwse-resize items-center justify-center rounded opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ResizeHandleIcon />
        </span>
      )}
    </div>
  );
});

function DragHandle() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
    >
      <span className="flex gap-1 rounded-full bg-black/10 px-1.5 py-1 dark:bg-white/15">
        <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
        <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
      </span>
    </span>
  );
}

function ResizeHandleIcon() {
  return (
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
  );
}
