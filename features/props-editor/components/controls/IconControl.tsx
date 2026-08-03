"use client";

import { ICON_NAMES } from "../../constants";
import type { IconField } from "../../types";
import type { ControlProps } from "./types";
import { Icon } from "../Icon";

/** Icon picker grid. */
export function IconControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as IconField;
  const names = f.icons && f.icons.length > 0 ? f.icons : ICON_NAMES;
  const current = String(value);

  return (
    <div
      className="grid grid-cols-8 gap-1"
      role="radiogroup"
      onFocus={onBegin}
      onBlur={onEnd}
    >
      {names.map((name) => {
        const active = name === current;
        return (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={name}
            title={name}
            onClick={() => onChange(name)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
              active
                ? "border-ring bg-foreground text-background"
                : "border-input bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={name} />
          </button>
        );
      })}
    </div>
  );
}
