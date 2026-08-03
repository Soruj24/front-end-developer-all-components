import * as React from "react";
import type { ReactNode } from "react";

export type Direction = "ltr" | "rtl";

export interface DirectionProviderProps {
  children: ReactNode;
  dir?: Direction;
}

const DirectionContext = React.createContext<Direction>("ltr");

export function DirectionProvider({ children, dir = "ltr" }: DirectionProviderProps) {
  return React.createElement(DirectionContext.Provider, { value: dir }, children);
}

export function useDirection(): Direction {
  const ctx = React.useContext(DirectionContext);
  if (!ctx) throw new Error("useDirection must be used within DirectionProvider");
  return ctx;
}

export const DIRECTIONS = {
  ltr: "ltr",
  rtl: "rtl",
} as const;
