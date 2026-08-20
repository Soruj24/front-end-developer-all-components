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
  const style: React.CSSProperties = {
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
  };

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
        "group absolute flex touch-none flex-col overflow-hidden rounded-2xl border border-border bg-card",
        "transition-[left,top,width,height,transform,box-shadow,border-color] duration-300 ease-out",
        !isDragging && !isResizing &&
          "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        draggable && !isDragging && "cursor-grab",
        isDragging &&
          "z-50 cursor-grabbing shadow-2xl shadow-black/10 transition-none will-change-[left,top]",
        isResizing && "z-40",
        card.className,
      )}
      style={style}
    >
      {draggable && <DragHandle />}
      <div className="relative flex min-h-0 flex-1 flex-col">
        {card.content ?? null}
      </div>
      {resizable && (
        <span
          data-bento-resize
          aria-hidden="true"
          onPointerDown={(e) => onResizePointerDown(e, card.id)}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          onPointerCancel={onResizePointerCancel}
          className="absolute bottom-1.5 right-1.5 z-20 flex size-5 touch-none cursor-nwse-resize items-center justify-center rounded-md border border-border/50 bg-background/80 opacity-0 backdrop-blur-sm transition-all duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 hover:bg-muted"
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
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
    >
      <span className="flex gap-[3px] rounded-full bg-foreground/10 px-2 py-1 backdrop-blur-sm">
        <span className="h-[3px] w-[3px] rounded-full bg-foreground/50" />
        <span className="h-[3px] w-[3px] rounded-full bg-foreground/50" />
        <span className="h-[3px] w-[3px] rounded-full bg-foreground/50" />
      </span>
    </span>
  );
}

function ResizeHandleIcon() {
  return (
    <svg
      className="h-3 w-3 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M9 15l6-6" />
      <path d="M9 19l10-10" />
      <path d="M15 19l4-4" />
    </svg>
  );
}
