"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getRegistryItem, registryIds } from "@/components/registry";
import { Icon } from "../ui/icons";

interface ComponentPickerProps {
  value: string;
  onSelect: (id: string) => void;
}

function categoryOf(id: string): string {
  const dash = id.indexOf("-");
  return dash > 0 ? id.slice(0, dash) : id;
}

/** Searchable registry component picker for the top toolbar. */
export function ComponentPicker({ value, onSelect }: ComponentPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const current = getRegistryItem(value);

  const groups = useMemo(() => {
    const filtered = registryIds.filter(
      (id) => id.toLowerCase().includes(query.trim().toLowerCase()) || (getRegistryItem(id)?.title ?? "").toLowerCase().includes(query.trim().toLowerCase())
    );
    const map = new Map<string, string[]>();
    for (const id of filtered) {
      const key = categoryOf(id);
      map.set(key, [...(map.get(key) ?? []), id]);
    }
    return [...map.entries()];
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setQuery("");
        }}
        className="flex max-w-[240px] items-center gap-1.5 rounded px-2 py-1 text-[13px] font-medium text-[#d4d4d8] transition-colors hover:bg-[#37373d]"
      >
        <Icon name="code" width={14} height={14} className="text-[#6a9955]" />
        <span className="truncate">{current?.title ?? value}</span>
        <Icon name="chevronDown" width={12} height={12} className="text-[#9ca3af]" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 flex max-h-[420px] w-[320px] flex-col overflow-hidden rounded-md border border-[#3a3a41] bg-[#252526] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-[#333338] px-3 py-2">
            <Icon name="search" width={14} height={14} className="text-[#9ca3af]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="w-full bg-transparent text-[13px] text-[#d4d4d8] outline-none placeholder:text-[#6a6a72]"
            />
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {groups.length === 0 && (
              <p className="px-3 py-4 text-center text-[12px] text-[#6a6a72]">No matching components</p>
            )}
            {groups.map(([category, ids]) => (
              <div key={category}>
                <p className="px-3 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#6a6a72]">
                  {category}
                </p>
                {ids.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      onSelect(id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1 text-left text-[13px] transition-colors hover:bg-[#37373d] ${
                      id === value ? "text-[#2b7de9]" : "text-[#d4d4d8]"
                    }`}
                  >
                    <span className="w-2 shrink-0">{id === value && <Icon name="check" width={12} height={12} />}</span>
                    <span className="truncate">{getRegistryItem(id)?.title ?? id}</span>
                    <span className="ml-auto truncate font-mono text-[11px] text-[#6a6a72]">{id}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
