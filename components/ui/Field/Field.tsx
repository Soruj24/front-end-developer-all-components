"use client";

import { useId, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/cn";
import type { FieldProps } from "./Field.types";

export function Field({
  label,
  description,
  error,
  required,
  children,
  className,
  htmlFor,
}: FieldProps) {
  const autoId = useId();
  const id = htmlFor ?? autoId;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </label>
      )}

      <div>
        {isValidElement(children)
          ? cloneElement(
              children as React.ReactElement<{ id?: string }>,
              { id },
            )
          : children}
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
