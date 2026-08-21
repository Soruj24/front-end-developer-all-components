import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { SpotlightItem } from "./SpotlightSearch.types";
import { escapeRegExp } from "./SpotlightSearch.utils";
import { FlameIcon } from "./SpotlightSearch.icons";

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border/60 bg-muted/70 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(
      <mark
        key={key++}
        className="rounded-[3px] bg-primary/15 px-0.5 text-primary font-medium"
      >
        {match[0]}
      </mark>,
    );
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

export function OptionRow({
  item,
  index,
  selected,
  query,
  onSelect,
  onMouseEnter,
}: {
  item: SpotlightItem;
  index: number;
  selected: boolean;
  query: string;
  onSelect: (item: SpotlightItem) => void;
  onMouseEnter: () => void;
}) {
  return (
    <div
      id={`spotlight-option-${item.id}`}
      role="option"
      aria-selected={selected}
      data-option-index={index}
      onMouseEnter={onMouseEnter}
      onClick={() => onSelect(item)}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-100",
        selected
          ? "bg-primary/10 text-foreground shadow-sm shadow-primary/5"
          : "text-foreground hover:bg-muted/60",
      )}
      style={{
        animation: "fade-slide 180ms cubic-bezier(0.16, 1, 0.3, 1) both",
        animationDelay: `${Math.min(index, 12) * 14}ms`,
      }}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-100",
          item.icon
            ? "bg-muted text-foreground group-hover:bg-muted/80"
            : "bg-muted/50 text-muted-foreground",
          selected && "bg-primary/15 text-primary",
        )}
      >
        {item.icon ?? (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm",
            selected && "font-medium",
          )}
        >
          <Highlight text={item.label} query={query} />
        </span>
        {item.subtitle && (
          <span className="block truncate text-xs text-muted-foreground">
            <Highlight text={item.subtitle} query={query} />
          </span>
        )}
      </span>

      {item.popular && !query && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
          <FlameIcon className="h-2.5 w-2.5" />
          Popular
        </span>
      )}

      {item.shortcut && (
        <span className="shrink-0 rounded-lg border border-border/60 bg-muted/70 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
          {item.shortcut}
        </span>
      )}
    </div>
  );
}
