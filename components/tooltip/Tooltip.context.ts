import * as React from "react";
import type { TooltipContextValue } from "./Tooltip.types";

export const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export function useTooltipContext(): TooltipContextValue {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) throw new Error("useTooltipContext must be used within Tooltip");
  return ctx;
}
