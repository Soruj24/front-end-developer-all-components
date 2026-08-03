import type { ReactNode } from "react";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipTrigger = HTMLElement;

export interface TooltipContextValue {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLSpanElement | null>;
  arrowRef: React.RefObject<SVGSVGElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  placement: TooltipPlacement;
  arrowOffset: number;
  contentOffset: number;
  arrowSize: number;
  portal: boolean;
  disabled: boolean;
  openDelay: number;
  closeDelay: number;
  controlledOpen: boolean | undefined;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: TooltipPlacement;
  arrowOffset?: number;
  contentOffset?: number;
  arrowSize?: number;
  portal?: boolean;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  animationDuration?: number;
  animationEase?: string;
  zIndex?: number;
}
