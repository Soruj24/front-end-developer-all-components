import type { ReactNode } from "react";

export type ClusterJustify = "start" | "center" | "end";
export type ClusterAlign = "start" | "center" | "end" | "stretch";

export interface ClusterProps {
  gap?: number;
  justify?: ClusterJustify;
  align?: ClusterAlign;
  responsive?: boolean;
  className?: string;
  children: ReactNode;
}
