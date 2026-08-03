import * as React from "react";
import { cn } from "@/lib/cn";
import type { ToggleGroupProps, ToggleGroupItemProps } from "./ToggleGroup.types";
import { TOGGLE_GROUP_STYLES, TOGGLE_GROUP_ITEM_STYLES } from "./ToggleGroup.constants";

export function ToggleGroupItem({ value, children, disabled }: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      value={value}
      disabled={disabled}
      className={cn(TOGGLE_GROUP_ITEM_STYLES.base, TOGGLE_GROUP_ITEM_STYLES.default)}
      data-value={value}
    >
      {children}
    </button>
  );
}

export function ToggleGroup({
  type = "single",
  variant = "default",
  size = "md",
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? (type === "single" ? "" : []));
  const isControlled = value !== undefined;
  const current = isControlled ? value! : internalValue;

  const handleItemClick = (itemValue: string) => {
    let next: string | string[];
    if (type === "single") {
      next = itemValue;
    } else {
      const currentArr = current as string[];
      next = currentArr.includes(itemValue)
        ? currentArr.filter((v) => v !== itemValue)
        : [...currentArr, itemValue];
    }
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as ToggleGroupItemProps;
      if (childProps && typeof childProps.value === "string") {
        const isSelected = type === "single"
          ? current === childProps.value
          : (current as string[]).includes(childProps.value);
      }
    }
  });

  return (
    <div
      role="group"
      className={cn(TOGGLE_GROUP_STYLES.base, TOGGLE_GROUP_STYLES[size], className)}
      data-variant={variant}
      data-size={size}
    >
      {React.Children.map(children, (el) => {
        if (!React.isValidElement(el)) return null;
        const child = el as React.ReactElement<{ className?: string; onClick?: () => void }>;
        const childProps = child.props as ToggleGroupItemProps;
        const isSelected = type === "single"
          ? current === childProps.value
          : (current as string[]).includes(childProps.value);

        return React.cloneElement(child, {
          className: cn(
            TOGGLE_GROUP_ITEM_STYLES.base,
            TOGGLE_GROUP_ITEM_STYLES[size],
            child.props.className,
            isSelected ? TOGGLE_GROUP_ITEM_STYLES.selected : TOGGLE_GROUP_ITEM_STYLES[variant],
          ),
          onClick: () => handleItemClick(childProps.value),
        });
      })}
    </div>
  );
}
