"use client";

import { useId, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/cn";
import type { FieldProps } from "./Field.types";

export function Field({ label, description, error, required, children, className, htmlFor }: FieldProps) {
  const autoId = useId();
  const id = htmlFor ?? autoId;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div>
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<{ id?: string }>, { id })
          : children}
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
