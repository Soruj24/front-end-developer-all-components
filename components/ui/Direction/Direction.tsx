"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/cn";
import type { Direction, DirectionProviderProps } from "./Direction.types";

const DirectionContext = createContext<Direction>("ltr");

export function useDirection() {
  return useContext(DirectionContext);
}

export function DirectionProvider({ dir = "ltr", children, className }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      <div dir={dir} className={cn(dir === "rtl" && "text-right", className)}>
        {children}
      </div>
    </DirectionContext.Provider>
  );
}
