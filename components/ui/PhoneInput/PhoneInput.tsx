"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown, Check, AlertCircle, Phone } from "lucide-react";
import type { PhoneInputProps, Country } from "./PhoneInput.types";
import { DEFAULT_COUNTRIES } from "./PhoneInput.types";

const SIZE_CLASSES = {
  sm: "h-9 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
};

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = "",
      onChange,
      defaultCountry = "US",
      countries = DEFAULT_COUNTRIES,
      placeholder = "Enter phone number",
      disabled = false,
      size = "md",
      showCountrySelect = true,
      validation = "none",
      onCountryChange,
      className,
      label,
      helperText,
      endIcon,
    },
    ref,
  ) => {
    const [selected, setSelected] = useState<Country>(
      () => countries.find((c) => c.code === defaultCountry) ?? countries[0],
    );
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const filtered = countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.dial.includes(query) ||
        c.code.toLowerCase().includes(query.toLowerCase()),
    );

    const select = useCallback(
      (c: Country) => {
        setSelected(c);
        setOpen(false);
        setQuery("");
        onCountryChange?.(c);
      },
      [onCountryChange],
    );

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const borderColor = validation === "valid"
      ? "border-emerald-500 focus-within:border-emerald-500"
      : validation === "invalid"
        ? "border-red-500 focus-within:border-red-500"
        : "border-border/60 focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5";

    return (
      <div className={cn("w-full max-w-sm space-y-1.5", className)}>
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <div
          className={cn(
            "flex items-center rounded-xl border bg-background shadow-sm transition-all duration-200",
            SIZE_CLASSES[size],
            borderColor,
            disabled && "opacity-50 pointer-events-none",
          )}
          role="group"
          aria-label={label || "Phone number input"}
        >
          {showCountrySelect && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                ref={triggerRef}
                onClick={() => setOpen(!open)}
                disabled={disabled}
                className={cn(
                  "flex h-full items-center gap-1.5 border-r border-border/40 px-2.5 transition-colors duration-150",
                  "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
                  "disabled:cursor-not-allowed",
                  size === "sm" && "gap-1 px-2",
                  size === "lg" && "gap-2 px-3",
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Select country, current: ${selected.name}`}
              >
                <span className={cn("leading-none", size === "lg" ? "text-xl" : "text-lg")}>{selected.flag}</span>
                <span className={cn("tabular-nums text-muted-foreground", size === "sm" ? "text-xs" : "text-sm")}>{selected.dial}</span>
                <ChevronDown className={cn("text-muted-foreground transition-transform duration-200", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5", open && "rotate-180")} />
              </button>

              {open && (
                <div className="absolute left-0 z-50 mt-1.5 w-72 overflow-hidden rounded-xl border border-border/60 bg-background shadow-xl shadow-black/5" role="listbox" aria-label="Select country">
                  <div className="border-b border-border/40 p-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search countries..."
                      className="w-full rounded-lg border-0 bg-muted/60 px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1">
                    {filtered.length === 0 && (
                      <p className="px-3 py-2 text-sm text-muted-foreground">No countries found.</p>
                    )}
                    {filtered.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={c.code === selected.code}
                        onClick={() => select(c)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors duration-100",
                          "hover:bg-muted/60 focus-visible:outline-none focus-visible:bg-muted/60",
                          c.code === selected.code && "bg-primary/5",
                        )}
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="tabular-nums text-muted-foreground">{c.dial}</span>
                        {c.code === selected.code && <Check className="h-4 w-4 shrink-0 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showCountrySelect && (
            <span className={cn("pl-2 tabular-nums text-muted-foreground", size === "sm" ? "text-xs pl-1.5" : "text-sm")}>
              {selected.dial}
            </span>
          )}

          <input
            ref={ref}
            type="tel"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={label || "Phone number"}
            className={cn(
              "flex-1 bg-transparent px-3 outline-none placeholder:text-muted-foreground",
              SIZE_CLASSES[size],
              "disabled:cursor-not-allowed",
            )}
          />

          {endIcon && (
            <span className="pr-3 text-muted-foreground">{endIcon}</span>
          )}

          {!endIcon && validation === "valid" && (
            <span className="pr-3"><Check className="h-4 w-4 text-emerald-600" /></span>
          )}
          {!endIcon && validation === "invalid" && (
            <span className="pr-3"><AlertCircle className="h-4 w-4 text-red-500" /></span>
          )}
          {!endIcon && validation === "none" && (
            <span className="pr-3"><Phone className="h-4 w-4 text-muted-foreground/60" /></span>
          )}
        </div>

        {helperText && (
          <p className={cn(
            "text-xs",
            validation === "valid" && "text-emerald-600",
            validation === "invalid" && "text-red-500",
            validation === "none" && "text-muted-foreground",
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
