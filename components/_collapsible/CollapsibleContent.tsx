import * as React from "react";
import { cn } from "@/lib/cn";
import { CollapsibleContext } from "./Collapsible";
import type { CollapsibleContentProps } from "./Collapsible.types";

export function CollapsibleContent({ children, className, ...props }: CollapsibleContentProps) {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("useCollapsibleContext must be used within Collapsible");
  const { open } = ctx;

  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        open ? "max-h-96" : "max-h-0",
        className,
      )}
      {...props}
    >
      <div className={open ? "block" : "hidden"}>
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
