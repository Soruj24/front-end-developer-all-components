"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { MultiSelectProps } from "./MultiSelect.types";

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  searchable = true,
  maxDisplay = 3,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const selectedLabels = useMemo(() => value.map((id) => options.find((o) => o.id === id)?.label ?? id), [value, options]);

  const overflowCount = selectedLabels.length - maxDisplay;

  const toggle = useCallback((id: string) => {
    if (disabled) return;
    onChange?.(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  }, [value, onChange, disabled]);

  const remove = useCallback((id: string) => {
    onChange?.(value.filter((v) => v !== id));
  }, [value, onChange]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => { if (!disabled) { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 0); } }}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-left text-sm",
          "transition-colors duration-150",
          "hover:border-muted-foreground/30",
          "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          open && "ring-2 ring-primary/20 border-primary/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {value.length === 0 && (
          <span className="text-muted-foreground/60">{placeholder}</span>
        )}
        {selectedLabels.slice(0, maxDisplay).map((label, i) => (
          <span
            key={value[i]}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary",
              "transition-colors duration-150 hover:bg-primary/20",
            )}
          >
            {label}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(value[i]); }}
              aria-label={`Remove ${label}`}
              className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:outline-none"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        {overflowCount > 0 && (
          <span className="inline-flex items-center rounded-lg bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            +{overflowCount} more
          </span>
        )}
        <svg
          className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cn(
            "absolute z-50 mt-1.5 max-h-60 w-full overflow-hidden overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {searchable && (
            <div className="mb-1.5">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
          )}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">No options found</div>
          )}
          {filtered.map((opt) => {
            const isSelected = value.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={opt.disabled}
                onClick={() => toggle(opt.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm",
                  "transition-colors duration-150",
                  "hover:bg-muted",
                  "focus-visible:bg-muted focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:outline-none",
                  "active:bg-muted/80",
                  isSelected && "bg-primary/5",
                  opt.disabled && "pointer-events-none opacity-40",
                )}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all duration-150",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-background",
                  )}
                >
                  {isSelected && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="flex-1 truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
