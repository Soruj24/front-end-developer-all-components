"use client";

import { Children, Fragment, isValidElement, forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { StackProps, InlineProps, StackAlign, StackJustify } from "./Stack.types";

const ALIGN_MAP: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const JUSTIFY_MAP: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction = "vertical", gap = 4, align, justify, wrap = false, separator, className, children }, ref) => {
    const isVertical = direction === "vertical";

    const gapClass = `gap-${gap}`;
    const alignClass = align ? ALIGN_MAP[align] : undefined;
    const justifyClass = justify ? JUSTIFY_MAP[justify] : undefined;

    const items = Children.toArray(children);
    const separated = separator
      ? items.reduce<React.ReactNode[]>((acc, child, i) => {
          if (i > 0) {
            acc.push(
              <Fragment key={`sep-${i}`}>
                {separator}
              </Fragment>,
            );
          }
          acc.push(child);
          return acc;
        }, [])
      : items;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "flex",
          isVertical ? "flex-col" : "flex-row",
          gapClass,
          alignClass,
          justifyClass,
          wrap && "flex-wrap",
          className,
        )}
      >
        {separated}
      </div>
    );
  },
);

Stack.displayName = "Stack";

const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ gap = 3, align, justify, wrap = false, className, children }, ref) => {
    const gapClass = `gap-${gap}`;
    const alignClass = align ? ALIGN_MAP[align] : undefined;
    const justifyClass = justify ? JUSTIFY_MAP[justify] : undefined;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "flex flex-row",
          gapClass,
          alignClass,
          justifyClass,
          wrap && "flex-wrap",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Inline.displayName = "Inline";

export { Stack, Inline };
