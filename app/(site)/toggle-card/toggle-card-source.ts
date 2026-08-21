export const TOGGLE_CARD_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ToggleCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const TOGGLE_TRACK = cn(
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-40",
);

const TOGGLE_THUMB = cn(
  "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
);

const ToggleCard = forwardRef<HTMLDivElement, ToggleCardProps>(
  (
    {
      title,
      description,
      icon,
      enabled = false,
      onChange,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const toggle = () => {
      if (!disabled) onChange?.(!enabled);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <div
        ref={ref}
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center justify-between rounded-xl border p-4 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          enabled
            ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/5"
            : "border-border/60 bg-background hover:border-border hover:bg-muted/30",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                enabled
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium leading-tight text-foreground">{title}</p>
            {description && (
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={\`Toggle \${title}\`}
          tabIndex={-1}
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          className={cn(
            TOGGLE_TRACK,
            enabled ? "bg-primary" : "bg-muted",
          )}
        >
          <span
            className={cn(
              TOGGLE_THUMB,
              enabled ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
      </div>
    );
  },
);

ToggleCard.displayName = "ToggleCard";

export default ToggleCard;`;
