"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ComboboxProps, ComboboxOption } from "./Combobox.types";

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  multiple = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  maxSelected = 5,
  disabled = false,
  className,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (multiple) {
      const v = defaultValue;
      return Array.isArray(v) ? v : v ? [v] : [];
    }
    const v = defaultValue;
    return v ? [v as string] : [];
  });

  const isControlled = value !== undefined;
  const current = useMemo(() => (
    isControlled
      ? multiple
        ? (value as string[])
        : [value as string]
      : internalValue
  ) as string[], [isControlled, multiple, value, internalValue]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => options.filter((o) => current.includes(o.value)),
    [options, current],
  );

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return options.filter(
      (opt) =>
        !opt.disabled &&
        (String(opt.label).toLowerCase().includes(s) ||
          opt.value.toLowerCase().includes(s)),
    );
  }, [options, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, ComboboxOption[]> = {};
    const ungrouped: ComboboxOption[] = [];
    for (const opt of filtered) {
      if (opt.group) {
        (groups[opt.group] ??= []).push(opt);
      } else {
        ungrouped.push(opt);
      }
    }
    return { groups, ungrouped };
  }, [filtered]);

  const hasGroups = Object.keys(grouped.groups).length > 0;

  const select = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return;
      let next: string[];
      if (multiple) {
        next = current.includes(opt.value)
          ? current.filter((v) => v !== opt.value)
          : [...current, opt.value].slice(0, maxSelected);
      } else {
        next = [opt.value];
        setOpen(false);
      }
      if (!isControlled) setInternalValue(next);
      onValueChange?.(multiple ? next : next[0] ?? "");
      setSearch("");
    },
    [multiple, current, maxSelected, isControlled, onValueChange],
  );

  const remove = useCallback(
    (val: string) => {
      const next = current.filter((v) => v !== val);
      if (!isControlled) setInternalValue(next);
      onValueChange?.(multiple ? next : next[0] ?? "");
    },
    [current, isControlled, multiple, onValueChange],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    },
    [],
  );

  const renderOption = (opt: ComboboxOption) => {
    const isSelected = current.includes(opt.value);
    return (
      <button
        key={opt.value}
        type="button"
        disabled={opt.disabled}
        onClick={() => select(opt)}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors duration-75",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground",
          isSelected && "bg-accent/50 font-medium text-accent-foreground",
          opt.disabled && "pointer-events-none opacity-40",
        )}
      >
        {multiple && (
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border",
            )}
          >
            {isSelected && <CheckIcon />}
          </span>
        )}
        {opt.icon && <span className="shrink-0 text-muted-foreground">{opt.icon}</span>}
        <div className="flex flex-col items-start gap-0.5">
          <span className="font-medium">{opt.label}</span>
          {opt.description && (
            <span className="text-xs text-muted-foreground">{opt.description}</span>
          )}
        </div>
        {!multiple && isSelected && (
          <span className="ml-auto text-primary"><CheckIcon /></span>
        )}
      </button>
    );
  };

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => {
          if (!disabled) setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex min-h-[42px] w-full items-center justify-between gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-left text-sm transition-all duration-150",
          "placeholder:text-muted-foreground",
          "hover:border-border hover:bg-muted/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          open && "border-border ring-2 ring-ring/20",
        )}
      >
        <div className="flex min-h-[24px] flex-1 flex-wrap items-center gap-1.5">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : multiple ? (
            selected.map((val) => {
              const opt = options.find((o) => o.value === val);
              return opt ? (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(val);
                    }}
                    aria-label={`Remove ${opt.label}`}
                    className="rounded-sm hover:bg-secondary-foreground/20"
                  >
                    <XIcon />
                  </button>
                </span>
              ) : null;
            })
          ) : (
            <span className="font-medium text-foreground">{selected[0]?.label}</span>
          )}
        </div>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-in-out",
            open && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popover */}
      <div
        data-state={open ? "open" : "closed"}
        className={cn(
          "absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border/60 bg-popover text-popover-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-1",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[state=closed]:duration-150 data-[state=open]:duration-150",
          "pointer-events-none data-[state=open]:pointer-events-auto",
        )}
      >
        {/* Search */}
        <div className="border-b border-border/60 p-2">
          <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5">
            <svg className="h-4 w-4 shrink-0 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Options */}
        <div className="max-h-60 overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : hasGroups ? (
            Object.entries(grouped.groups).map(([group, opts]) => (
              <div key={group} className="mb-1">
                <p className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group}
                </p>
                {opts.map(renderOption)}
              </div>
            ))
          ) : (
            filtered.map(renderOption)
          )}
        </div>
      </div>
    </div>
  );
}
