"use client";

import { createContext, useContext } from "react";
import type { SidebarSide } from "./Sidebar.types";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  side: SidebarSide;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  side: "left",
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export { SidebarContext };
