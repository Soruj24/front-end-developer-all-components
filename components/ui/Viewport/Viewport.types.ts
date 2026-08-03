import type { ReactNode } from "react";

export interface ViewportProps {
  children: ReactNode;
  width?: number;
  height?: number;
  device?: "mobile" | "tablet" | "desktop";
  className?: string;
}

export const deviceSizes: Record<string, { width: number; height: number }> = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};
