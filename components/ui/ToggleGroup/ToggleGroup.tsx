"use client";

import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import { ToggleGroupProps } from "./ToggleGroup.types";

export default function ToggleGroup({
  value,
  onValueChange,
  type = "single",
  orientation = "horizontal",
  className,
  children,
}: ToggleGroupProps) {
  const isSelected = (itemValue: string) => {
    if (type === "single") return value === itemValue;
    return Array.isArray(value) && value.includes(itemValue);
  };

  const handleClick = (itemValue: string) => {
    if (type === "single") {
      onValueChange?.(value === itemValue ? "" : itemValue);
    } else {
      const current = Array.isArray(value) ? value : [];
      onValueChange?.(
        current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue]
      );
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const childProps = (child as ReactElement<{ value?: string }>).props;
        if (!childProps.value) return child;
        return cloneElement(child as ReactElement<Record<string, unknown>>, {
          "data-state": isSelected(childProps.value!) ? "on" : "off",
          "aria-pressed": isSelected(childProps.value!),
          onClick: () => handleClick(childProps.value!),
        });
      })}
    </div>
  );
}
