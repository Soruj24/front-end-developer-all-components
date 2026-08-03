import * as React from "react";
import { cn } from "@/lib/cn";
import type { InputGroupProps } from "./InputGroup.types";
import { INPUT_GROUP_STYLES } from "./InputGroup.constants";

export function InputGroup({ children, variant = "default", className }: InputGroupProps) {
  return (
    <div className={cn(INPUT_GROUP_STYLES.base, INPUT_GROUP_STYLES[variant], "focus-within:border-blue-500", className)}>
      {children}
    </div>
  );
}
