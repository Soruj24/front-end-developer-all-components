"use client";

import { cn } from "@/lib/cn";
import { GripVertical, Clock } from "lucide-react";
import type { KanbanCardData } from "./KanbanBoard.types";

const PRIORITY_DOT: Record<string, string> = {
  low: "bg-sky-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export function KanbanCard({
  card,
  onClick,
}: {
  card: KanbanCardData;
  onClick?: (card: KanbanCardData) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(card)}
      draggable
      className={cn(
        "w-full rounded-xl border border-border/60 bg-background p-3.5 text-left shadow-sm transition-all duration-200",
        "hover:border-border hover:shadow-md hover:shadow-black/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        "active:scale-[0.98] active:shadow-lg",
        "cursor-grab active:cursor-grabbing",
      )}
      aria-label={`Card: ${card.title}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {card.priority && (
              <span className={cn("inline-block h-2 w-2 shrink-0 rounded-full", PRIORITY_DOT[card.priority])} aria-label={`Priority: ${card.priority}`} />
            )}
            <p className="truncate text-sm font-medium leading-snug text-foreground">{card.title}</p>
          </div>
          {card.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
          )}
        </div>
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {card.tag && (
            <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-none", card.tagColor)}>
              {card.tag}
            </span>
          )}
          {card.children}
        </div>
        <div className="flex items-center gap-2">
          {card.time && (
            <span className="inline-flex items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {card.time}
            </span>
          )}
          {card.avatar && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
              {card.avatar}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
