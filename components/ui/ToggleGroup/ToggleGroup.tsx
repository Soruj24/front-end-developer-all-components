"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
} from "react";
import { cn } from "@/lib/cn";
import type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupSize,
  ToggleGroupVariant,
} from "./ToggleGroup.types";

const GROUP_SIZES: Record<ToggleGroupSize, string> = {
  sm: "gap-0.5 p-0.5",
  md: "gap-1 p-1",
  lg: "gap-1.5 p-1.5",
};

const GROUP_VARIANTS: Record<ToggleGroupVariant, string> = {
  default: "bg-muted/50 backdrop-blur-sm",
  outline: "bg-transparent ring-1 ring-border/60",
  ghost: "bg-transparent",
};

const ITEM_SIZES: Record<ToggleGroupSize, string> = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-9 px-3.5 text-sm",
  lg: "h-10 px-4.5 text-sm",
};

const ITEM_VARIANTS: Record<ToggleGroupVariant, string> = {
  default: cn(
    "text-muted-foreground hover:text-foreground",
    "data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
  ),
  outline: cn(
    "border border-border/60 text-muted-foreground",
    "hover:bg-muted/60 hover:text-foreground",
    "data-[state=on]:border-primary/30 data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
  ),
  ghost: cn(
    "text-muted-foreground",
    "hover:bg-muted/60 hover:text-foreground",
    "data-[state=on]:bg-muted data-[state=on]:text-foreground",
  ),
};

const ITEM_BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]";

export function ToggleGroupItem({
  value,
  children,
  disabled,
  className,
}: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      value={value}
      disabled={disabled}
      className={className}
      data-value={value}
    >
      {children}
    </button>
  );
}

export default function ToggleGroup({
  value,
  defaultValue,
  onValueChange,
  type = "single",
  orientation = "horizontal",
  size = "md",
  variant = "default",
  className,
  children,
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (type === "single" ? "" : []),
  );

  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  const isSelected = (itemValue: string) => {
    if (type === "single") return current === itemValue;
    return Array.isArray(current) && current.includes(itemValue);
  };

  const handleClick = (itemValue: string) => {
    let next: string | string[];
    if (type === "single") {
      next = current === itemValue ? "" : itemValue;
    } else {
      const arr = Array.isArray(current) ? current : [];
      next = arr.includes(itemValue)
        ? arr.filter((v) => v !== itemValue)
        : [...arr, itemValue];
    }
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div
      role={type === "single" ? "radiogroup" : "group"}
      aria-label="Toggle group"
      className={cn(
        "inline-flex rounded-xl",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        GROUP_SIZES[size],
        GROUP_VARIANTS[variant],
        className,
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const childProps = (
          child as ReactElement<{ value?: string }>
        ).props;
        if (!childProps.value) return child;
        const active = isSelected(childProps.value);
        return cloneElement(
          child as ReactElement<Record<string, unknown>>,
          {
            "data-state": active ? "on" : "off",
            "aria-pressed": type === "multiple" ? active : undefined,
            "aria-checked":
              type === "single" ? active : undefined,
            role:
              type === "single"
                ? "radio"
                : undefined,
            tabIndex: active ? 0 : -1,
            onClick: () => handleClick(childProps.value!),
            className: cn(
              ITEM_BASE,
              ITEM_SIZES[size],
              ITEM_VARIANTS[variant],
              (child as ReactElement<{ className?: string }>).props
                .className,
            ),
          },
        );
      })}
    </div>
  );
}
