import type { ReactNode, HTMLAttributes } from "react";

export type AspectRatioType = "16:9" | "4:3" | "1:1" | "2:3" | "3:4" | "9:16" | "auto";
export type AspectRatioWidth = number;
export type AspectRatioHeight = number;

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ratio?: AspectRatioType;
  width?: AspectRatioWidth;
  height?: AspectRatioHeight;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}
