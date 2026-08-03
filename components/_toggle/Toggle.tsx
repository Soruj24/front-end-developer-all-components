import * as React from "react";
import { cn } from "@/lib/cn";
import type { ToggleProps } from "./Toggle.types";
import { TOGGLE_STYLES } from "./Toggle.constants";

export function Toggle({ variant = "default", size = "md", pressed, defaultPressed, onPressedChange, className, children, ...props }: ToggleProps) {
  const [isPressed, setIsPressed] = React.useState(defaultPressed ?? false);
  const isControlled = pressed !== undefined;
  const current = isControlled ? pressed! : isPressed;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !current;
    if (!isControlled) setIsPressed(next);
    onPressedChange?.(next);
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      aria-pressed={current}
      className={cn(
        TOGGLE_STYLES.base,
        TOGGLE_STYLES[size],
        current ? TOGGLE_STYLES.pressed : TOGGLE_STYLES[variant],
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
