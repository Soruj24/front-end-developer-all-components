import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Row } from "./CommandPalette.types";
import { escapeRegExp } from "./CommandPalette.utils";
import { ChevronRightIcon, StarIcon, PinIcon } from "./CommandPalette.icons";

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-md border border-border bg-muted px-1 font-sans text-[10px] font-medium text-muted-foreground">{children}</kbd>;
}

export function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0; let key = 0; let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(<mark key={key++} className="rounded-[3px] bg-primary/10 px-0.5 text-primary">{match[0]}</mark>);
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

export function PaletteRow({ row, index, selected, query, favorites, pinned, onSelect, onToggleFavorite, onTogglePinned, onMouseEnter }: {
  row: Row; index: number; selected: boolean; query: string; favorites: string[]; pinned: string[];
  onSelect: (row: Row) => void; onToggleFavorite: (id: string) => void; onTogglePinned: (id: string) => void; onMouseEnter: () => void;
}) {
  const { item } = row;
  const isFavorite = favorites.includes(item.id); const isPinned = pinned.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const parentTrail = row.parents.map((p) => p.label).join(" / ");
  return (
    <div role="option" aria-selected={selected} data-row-index={index} onMouseEnter={onMouseEnter} onClick={() => onSelect(row)}
      className={cn("group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors", selected ? "bg-primary/10 text-foreground" : "text-foreground", item.disabled && "cursor-not-allowed opacity-50")}
      style={{ animation: "fade-slide 180ms cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: `${Math.min(index, 12) * 14}ms` }}>
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.icon ? "bg-muted text-foreground" : "bg-muted/60 text-muted-foreground")}>
        {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className={cn("block truncate", selected && "font-medium")}><Highlight text={item.label} query={query} /></span>
        {parentTrail && <span className="block truncate text-xs text-muted-foreground">{parentTrail}</span>}
      </span>
      {item.shortcut && <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{item.shortcut}</span>}
      {hasChildren && <ChevronRightIcon className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground", selected && "text-primary")} />}
      <span className="flex shrink-0 items-center gap-0.5">
        <button type="button" aria-label={isFavorite ? `Remove ${item.label} from favorites` : `Add ${item.label} to favorites`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className={cn("rounded-md p-1 transition-colors", isFavorite ? "text-warning" : "text-muted-foreground opacity-40 hover:text-warning hover:opacity-100")}>
          <StarIcon className="h-3.5 w-3.5" filled={isFavorite} />
        </button>
        <button type="button" aria-label={isPinned ? `Unpin ${item.label}` : `Pin ${item.label}`}
          onClick={(e) => { e.stopPropagation(); onTogglePinned(item.id); }}
          className={cn("rounded-md p-1 transition-colors", isPinned ? "text-primary" : "text-muted-foreground opacity-40 hover:text-primary hover:opacity-100")}>
          <PinIcon className="h-3.5 w-3.5" filled={isPinned} />
        </button>
      </span>
    </div>
  );
}
