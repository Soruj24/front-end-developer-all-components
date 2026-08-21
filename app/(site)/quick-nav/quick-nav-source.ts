export const QUICKNAV_SOURCE = `"use client";

import { forwardRef, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Search, Command, ChevronRight } from "lucide-react";

interface QuickNavItem { id: string; label: string; description?: string; icon?: React.ReactNode; shortcut?: string; section?: string; disabled?: boolean; }

interface QuickNavProps {
  open: boolean; onClose: () => void; items?: QuickNavItem[]; placeholder?: string;
  variant?: "default" | "compact" | "flat"; footer?: React.ReactNode; onSelect?: (item: QuickNavItem) => void; className?: string;
}

const QuickNav = forwardRef<HTMLDivElement, QuickNavProps>(({ open, onClose, items = [], placeholder = "Search commands...", variant = "default", footer, onSelect, className }, ref) => {
  const [query, setQuery] = useState(""); const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null); const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => filtered.reduce((acc, item) => { const s = item.section || "Results"; if (!acc[s]) acc[s] = []; acc[s].push(item); return acc; }, {} as Record<string, QuickNavItem[]>), [filtered]);

  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { if (open) { setQuery(""); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && filtered[selected]) { onSelect?.(filtered[selected]); onClose(); }
    else if (e.key === "Escape") { onClose(); }
  }, [filtered, selected, onSelect, onClose]);

  useEffect(() => { if (selected > 0 && listRef.current) { const btn = listRef.current.querySelector(\\\`[data-index="\\\${selected}"]\\\`); btn?.scrollIntoView({ block: "nearest" }); } }, [selected]);

  if (!open) return null;
  const isCompact = variant === "compact"; const isGrouped = variant !== "flat";

  const content = (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={cn("relative z-50 flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl shadow-black/10 dark:shadow-black/30", "animate-in fade-in zoom-in-95 duration-150", className)} role="dialog" aria-label="Quick navigation" onKeyDown={handleKeyDown}>
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          <input ref={inputRef} type="text" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40" aria-label="Search commands" />
          <kbd className="pointer-events-none hidden rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 sm:inline-block">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-72 overflow-y-auto p-2" role="listbox">
          {isGrouped ? Object.entries(grouped).map(([section, sectionItems]) => (
            <div key={section}>
              <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">{section}</p>
              {sectionItems.map((item) => { const idx = filtered.indexOf(item); return (
                <button key={item.id} type="button" data-index={idx} disabled={item.disabled} onClick={() => { onSelect?.(item); onClose(); }}
                  className={cn("flex w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors", isCompact ? "py-1.5" : "py-2", idx === selected ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground", item.disabled && "cursor-not-allowed opacity-40", "focus-visible:outline-none")}
                  role="option" aria-selected={idx === selected}>
                  {item.icon && <span className="shrink-0" aria-hidden="true">{item.icon}</span>}
                  <span className="min-w-0 flex-1 text-left truncate">{item.label}</span>
                  {item.shortcut && <kbd className="shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">{item.shortcut}</kbd>}
                  <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/30" aria-hidden="true" />
                </button>
              ); })}
            </div>
          )) : <div className="flex flex-col gap-0.5">{filtered.map((item, idx) => (
            <button key={item.id} type="button" data-index={idx} disabled={item.disabled} onClick={() => { onSelect?.(item); onClose(); }}
              className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", idx === selected ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground", item.disabled && "cursor-not-allowed opacity-40", "focus-visible:outline-none")}
              role="option" aria-selected={idx === selected}>
              {item.icon && <span className="shrink-0" aria-hidden="true">{item.icon}</span>}
              <span className="min-w-0 flex-1 text-left truncate">{item.label}</span>
              {item.shortcut && <kbd className="shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">{item.shortcut}</kbd>}
            </button>
          ))}</div>}
          {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted-foreground/60">No results found.</p>}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-xs text-muted-foreground/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="rounded border border-border/60 bg-muted/50 px-1 py-0.5 text-[10px]">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border/60 bg-muted/50 px-1 py-0.5 text-[10px]">↵</kbd> Select</span>
          </div>
          {footer ?? <Command className="h-3 w-3" />}
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") { return createPortal(content, document.body); }
  return content;
});

QuickNav.displayName = "QuickNav";

export { QuickNav };`;

export const DEFAULT_EXAMPLE = `<QuickNav open={open} onClose={() => setOpen(false)} items={navItems} />`;

export const COMPACT_EXAMPLE = `<QuickNav open={open} onClose={() => setOpen(false)} items={navItems} variant="compact" />`;

export const FLAT_EXAMPLE = `<QuickNav open={open} onClose={() => setOpen(false)} items={navItems} variant="flat" />`;
