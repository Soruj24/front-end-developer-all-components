"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ComboboxProps } from "./Combobox.types";

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find((o) => o.value === value);

  const select = useCallback(
    (val: string) => {
      onValueChange?.(val);
      setOpen(false);
      setSearch("");
    },
    [onValueChange]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm dark:bg-zinc-900"
      >
        <span className={cn(!selected && "text-zinc-400")}>
          {selected?.label ?? placeholder}
        </span>
        <svg className="h-4 w-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-zinc-900">
          <div className="border-b p-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-md bg-transparent px-2 py-1 text-sm outline-none placeholder:text-zinc-400"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-zinc-400">
                {emptyMessage}
              </p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  disabled={opt.disabled}
                  onClick={() => select(opt.value)}
                  className={cn(
                    "flex w-full items-center rounded-sm px-2 py-1.5 text-sm",
                    opt.value === value && "bg-zinc-100 dark:bg-zinc-800",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    opt.disabled && "opacity-50"
                  )}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
