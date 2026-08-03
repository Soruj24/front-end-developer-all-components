"use client";

import type { GeneratorResult } from "../types";

export interface GeneratorHistoryProps {
  entries: GeneratorResult[];
  activeId?: string | null;
  onSelect: (entry: GeneratorResult) => void;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}

/** Generation history with favorites, stored in localStorage. */
export function GeneratorHistory({
  entries,
  activeId,
  onSelect,
  onToggleFavorite,
  onRemove,
}: GeneratorHistoryProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background">
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
        <span className="text-sm font-semibold text-foreground">History</span>
        <span className="text-xs text-muted-foreground">{entries.length}</span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {entries.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            Generations appear here.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className={`group rounded-lg border transition-colors ${
                  entry.id === activeId
                    ? "border-primary/50 bg-primary/5"
                    : "border-transparent hover:border-border hover:bg-muted/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(entry)}
                  className="w-full px-2 py-1.5 text-left"
                >
                  <span className="block truncate text-[13px] font-medium text-foreground">
                    {entry.component?.name ?? "Unparsed result"}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                    {entry.prompt || entry.component?.description || "—"}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-foreground/70">
                    {new Date(entry.createdAt).toLocaleString()}
                  </span>
                </button>
                <div className="flex items-center justify-end gap-1 px-2 pb-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(entry.id)}
                    aria-label={entry.favorite ? "Unfavorite" : "Favorite"}
                    className={`rounded px-1.5 py-0.5 text-xs hover:bg-muted ${
                      entry.favorite ? "text-yellow-400" : "text-muted-foreground"
                    }`}
                  >
                    {entry.favorite ? "★" : "☆"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(entry.id)}
                    aria-label="Remove from history"
                    className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-danger"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
