"use client";

import { createContext, useContext, ReactNode } from "react";

interface DesignContextValue {
  theme: "light" | "dark" | "system";
}

const DesignContext = createContext<DesignContextValue>({ theme: "system" });

export function useDesign() {
  return useContext(DesignContext);
}

export interface DesignProviderProps {
  children: ReactNode;
  theme?: "light" | "dark" | "system";
}

export function DesignProvider({ children, theme = "system" }: DesignProviderProps) {
  return (
    <DesignContext.Provider value={{ theme }}>
      {children}
    </DesignContext.Provider>
  );
}
