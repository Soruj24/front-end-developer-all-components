"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { ComboboxProps, ComboboxOption } from "./Combobox.types";
import { COMBOBOX_STYLES } from "./Combobox.constants";

export function Combobox({ options, value, defaultValue, onValueChange, placeholder = "Select...", multiple = false, searchPlaceholder = "Search...", emptyMessage = "No results found.", maxSelected = 5, className }: ComboboxProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (multiple) {
      const v = defaultValue;
      return Array.isArray(v) ? v : v ? [v] : [];
    }
    const v = defaultValue;
    return v ? [v as string] : [];
  });
  const isControlled = value !== undefined;
  const current = (isControlled ? (multiple ? value as string[] : [value as string]) : internalValue) as string[];

  const [search, setSearch] = React.useState("");
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const prevRef = React.useRef<string>(JSON.stringify(current));
  React.useEffect(() => {
    const next = JSON.stringify(current);
    if (prevRef.current !== next) {
      prevRef.current = next;
      onValueChange?.(current);
    }
  }, [current, onValueChange]);

  const filteredOptions = React.useMemo(() => {
    const s = search.toLowerCase();
    return options.filter((opt) => !opt.disabled && (String(opt.label).toLowerCase().includes(s) || opt.value.toLowerCase().includes(s)));
  }, [options, search]);

  const handleSelect = (opt: ComboboxOption) => {
    let newSelected: string[];
    if (multiple) {
      newSelected = current.includes(opt.value)
        ? current.filter((v) => v !== opt.value)
        : [...current, opt.value].slice(0, maxSelected);
    } else {
      newSelected = [opt.value];
      setIsOpen(false);
    }
    if (!isControlled) setInternalValue(newSelected);
    onValueChange?.(multiple ? newSelected : newSelected[0] ?? "");
    setSearch("");
  };

  return (
    <div ref={popoverRef} className={cn(COMBOBOX_STYLES.base, className)}>
      <div
        className={COMBOBOX_STYLES.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap items-center gap-1 flex-1">
          {current.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            current.map((val) => {
              const opt = options.find((o) => o.value === val);
              return opt ? <span key={val} className={COMBOBOX_STYLES.badge}>{opt.label}</span> : null;
            })
          )}
        </div>
        <span>▼</span>
      </div>
      {isOpen && (
        <div className={COMBOBOX_STYLES.popover}>
          <div className="p-2">
            <input
              className={COMBOBOX_STYLES.search}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
            />
          </div>
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500">{emptyMessage}</div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  COMBOBOX_STYLES.option,
                  current.includes(opt.value) && COMBOBOX_STYLES.itemSelected,
                  opt.disabled && COMBOBOX_STYLES.itemDisabled,
                )}
                onClick={() => !opt.disabled && handleSelect(opt)}
              >
                {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
                <span>{opt.label}</span>
                {opt.description && <span className="ml-2 text-xs text-gray-500">{opt.description}</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
