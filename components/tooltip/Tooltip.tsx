"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { TOOLTIP_DEFAULTS } from "./Tooltip.constants";
import type { TooltipProps, TooltipContextValue } from "./Tooltip.types";
import { useTooltipState, useTooltipDelay } from "./Tooltip.hooks";
import { TooltipProvider } from "./TooltipProvider";
import { TooltipContent } from "./TooltipContent";

export function Tooltip({
  content,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  placement = TOOLTIP_DEFAULTS.placement,
  arrowOffset = TOOLTIP_DEFAULTS.arrowOffset,
  contentOffset = TOOLTIP_DEFAULTS.contentOffset,
  arrowSize = TOOLTIP_DEFAULTS.arrowSize,
  portal = TOOLTIP_DEFAULTS.portal,
  disabled = TOOLTIP_DEFAULTS.disabled,
  openDelay = TOOLTIP_DEFAULTS.openDelay,
  closeDelay = TOOLTIP_DEFAULTS.closeDelay,
  animationDuration = TOOLTIP_DEFAULTS.animationDuration,
  animationEase = TOOLTIP_DEFAULTS.animationEase,
  zIndex = TOOLTIP_DEFAULTS.zIndex,
}: TooltipProps) {
  const [internalOpen] = useTooltipState(defaultOpen);
  const [hoverOpen, setHoverOpen] = useTooltipState(false);
  const [focusOpen, setFocusOpen] = useTooltipState(false);

  const controlledOpen = open;
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? (controlledOpen as boolean) : internalOpen || hoverOpen || focusOpen;

  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const arrowRef = React.useRef<SVGSVGElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleOpen = () => setHoverOpen(true);
  const handleClose = () => { setHoverOpen(false); setFocusOpen(false); };
  const { scheduleOpen, scheduleClose } = useTooltipDelay(openDelay, closeDelay, handleOpen, handleClose);

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const ctxValue: TooltipContextValue = {
    isOpen, triggerRef, arrowRef, contentRef, placement, arrowOffset,
    contentOffset, arrowSize, portal, disabled, openDelay, closeDelay,
    controlledOpen,
    onOpen: () => { setHoverOpen(true); setFocusOpen(true); },
    onClose: () => { setHoverOpen(false); setFocusOpen(false); },
    onToggle: () => { onOpenChange?.(!isOpen); },
  };

  return (
    <TooltipProvider value={ctxValue}>
      <span
        ref={triggerRef}
        className={cn("inline-block cursor-pointer", disabled && "pointer-events-none")}
        aria-label="tooltip-trigger"
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") handleClose();
        }}
      >
        {children}
      </span>
      {isOpen && (
        <>
          {portal ? (
            <div className="fixed inset-0 pointer-events-none z-50" style={{ zIndex: zIndex + 1 }}>
              <TooltipContent content={content} animationDuration={animationDuration} animationEase={animationEase} zIndex={zIndex} />
            </div>
          ) : (
            <TooltipContent content={content} animationDuration={animationDuration} animationEase={animationEase} zIndex={zIndex} />
          )}
        </>
      )}
    </TooltipProvider>
  );
}
