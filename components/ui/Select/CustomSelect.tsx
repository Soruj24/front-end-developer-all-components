"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export interface CustomSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface CustomSelectProps {
  options: CustomSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  name?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  renderTrigger?: (props: {
    selected: CustomSelectOption | undefined;
    open: boolean;
    disabled: boolean;
  }) => ReactNode;
}

const SIZE_CLASSES = {
  sm: "h-8 px-2.5 text-xs gap-1.5",
  md: "h-10 px-3 text-sm gap-2",
  lg: "h-12 px-4 text-base gap-2.5",
} as const;

const OPTION_SIZE_CLASSES = {
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1.5 text-sm",
  lg: "px-3 py-2 text-base",
} as const;

export function CustomSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  name,
  id,
  size = "md",
  className,
  renderTrigger,
}: CustomSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === currentValue),
    [options, currentValue],
  );

  const selectableOptions = useMemo(
    () => options.filter((o) => !o.disabled),
    [options],
  );

  const select = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onValueChange?.(val);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isControlled, onValueChange],
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => {
      if (!prev) setHighlightedIndex(-1);
      return !prev;
    });
  }, [disabled]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listRef.current?.contains(target)
      )
        return;
      close();
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    const items = listRef.current?.querySelectorAll("[data-option]");
    items?.[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex]);

  useEffect(() => {
    if (!open) return;
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "nearest" });
      const idx = selectableOptions.findIndex((o) => o.value === currentValue);
      setHighlightedIndex(idx >= 0 ? idx : -1);
    }
  }, [open, currentValue, selectableOptions]);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setHighlightedIndex(
              selectableOptions.findIndex((o) => o.value === currentValue),
            );
          } else if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) =>
              prev < selectableOptions.length - 1 ? prev + 1 : 0,
            );
          } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : selectableOptions.length - 1,
            );
          }
          break;
      }
    },
    [disabled, open, selectableOptions, currentValue],
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < selectableOptions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : selectableOptions.length - 1,
          );
          break;
        case "Home":
          e.preventDefault();
          setHighlightedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setHighlightedIndex(selectableOptions.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < selectableOptions.length) {
            select(selectableOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "Tab":
          close();
          break;
      }
    },
    [highlightedIndex, selectableOptions, select, close],
  );

  const listboxId = id ? `${id}-listbox` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-foreground",
            disabled && "opacity-50",
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        {renderTrigger ? (
          <div onClick={toggle}>{renderTrigger({ selected: selectedOption, open, disabled })}</div>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            id={id}
            name={name}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-invalid={!!error}
            disabled={disabled}
            onClick={toggle}
            onKeyDown={handleTriggerKeyDown}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border bg-card text-left font-normal",
              "transition-all duration-150 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              SIZE_CLASSES[size],
              error
                ? "border-destructive focus-visible:ring-destructive/20"
                : "border-border/60 hover:border-border hover:bg-muted/30",
              open && "border-border ring-2 ring-ring/20",
            )}
          >
            <span
              className={cn(
                "truncate",
                selectedOption ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                open && "rotate-180",
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {open && (
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            onKeyDown={handleListKeyDown}
            className={cn(
              "absolute z-50 mt-1.5 w-full min-w-[12rem] overflow-hidden",
              "rounded-lg border border-border/60 bg-popover p-1",
              "text-popover-foreground shadow-lg",
              "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-1",
              "duration-150",
            )}
          >
            <div className="max-h-[200px] overflow-y-auto overscroll-contain p-0.5">
              {options.length === 0 ? (
                <div className="px-2.5 py-4 text-center text-sm text-muted-foreground">
                  No options available
                </div>
              ) : (
                options.map((option) => {
                  const isSelectable = !option.disabled;
                  const optionIndex = selectableOptions.indexOf(option);
                  const isHighlighted = optionIndex === highlightedIndex;
                  const isSelected = option.value === currentValue;

                  return (
                    <div
                      key={option.value}
                      ref={isSelected ? selectedRef : undefined}
                      data-option
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onMouseEnter={() => {
                        if (isSelectable) setHighlightedIndex(optionIndex);
                      }}
                      onMouseLeave={() => {
                        if (isSelectable) setHighlightedIndex(-1);
                      }}
                      onClick={() => {
                        if (isSelectable) select(option.value);
                      }}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-2 rounded-md",
                        OPTION_SIZE_CLASSES[size],
                        "transition-colors duration-75",
                        "select-none",
                        option.disabled
                          ? "pointer-events-none cursor-not-allowed opacity-40"
                          : "cursor-pointer",
                        isHighlighted && !option.disabled && "bg-accent text-accent-foreground",
                        isSelected && "bg-accent/50 font-medium text-accent-foreground",
                        !isHighlighted && !isSelected && "text-foreground",
                      )}
                    >
                      {option.icon && (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                          {option.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <svg
                          className="h-4 w-4 shrink-0 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
