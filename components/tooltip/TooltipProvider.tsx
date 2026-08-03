import * as React from "react";
import type { TooltipContextValue } from "./Tooltip.types";
import { TooltipContext } from "./Tooltip.context";

export function TooltipProvider({ children, value }: { children: React.ReactNode; value: TooltipContextValue }) {
  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
}
