import type { ButtonHTMLAttributes, ReactNode } from "react";

export type DragHandleVariant = "vertical" | "horizontal" | "dots" | "arrows" | "grid";
export type DragHandleSize = "sm" | "md" | "lg";

export interface DragHandleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DragHandleVariant;
  size?: DragHandleSize;
  label?: string;
}

export interface DragItemProps {
  children: ReactNode;
  variant?: DragHandleVariant;
  size?: DragHandleSize;
  disabled?: boolean;
  className?: string;
}
