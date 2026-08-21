import type { ReactNode } from "react";

export type HolyGrailSidebarSide = "left" | "right" | "both";

export interface HolyGrailProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  sidebarRight?: ReactNode;
  sidebarSide?: HolyGrailSidebarSide;
  sidebarWidth?: number;
  sidebarRightWidth?: number;
  sticky?: boolean;
  className?: string;
}
