import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/cn";
import type { TypographyProps } from "./Typography.types";
import { TYPOGRAPHY_STYLES } from "./Typography.constants";

export function Typography({ as, variant = "p", children, className }: TypographyProps) {
  const Tag = (as ?? variant) as ElementType;
  return (
    <Tag className={cn(TYPOGRAPHY_STYLES[variant], "text-gray-900 dark:text-gray-100", className)}>
      {children}
    </Tag>
  );
}
