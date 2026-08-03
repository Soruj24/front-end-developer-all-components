import * as React from "react";
import { cn } from "@/lib/cn";
import type { CheckboxProps } from "./Checkbox.types";
import { CHECKBOX_STYLES } from "./Checkbox.constants";

export function Checkbox({ size = "md", variant = "default", error, label, className, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          CHECKBOX_STYLES.base,
          CHECKBOX_STYLES[size],
          CHECKBOX_STYLES[variant],
          error && "border-red-500 focus:ring-red-500",
          "appearance-none",
          "checked:after:content-['']",
          "after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "checked:after:block checked:after:h-3 checked:after:w-1.5 checked:after:border-b-2 checked:after:border-r-2",
          "checked:after:border-current",
          className,
        )}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
