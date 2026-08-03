import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

export interface CollapsibleProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CollapsibleHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CollapsibleTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
