"use client";

import * as React from "react";
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
  const [internalOpen, setInternalOpen] = useTooltipState(defaultOpen);
  const [hoverOpen, setHoverOpen] = useTooltipState(false);
  const [focusOpen, setFocusOpen] = useTooltipState(false);

  const controlledOpen = open;
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? (controlledOpen as boolean) : internalOpen || hoverOpen || focusOpen;

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const arrowRef = React.useRef<SVGSVGElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleOpen = () => setHoverOpen(true);
  const handleClose = () => {
    setHoverOpen(false);
    setFocusOpen(false);
  };

  const { scheduleOpen, scheduleClose } = useTooltipDelay(openDelay, closeDelay, handleOpen, handleClose);

  React.useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const ctxValue: TooltipContextValue = {
    isOpen,
    triggerRef: (el: HTMLElement | null) => { setTriggerEl(el); },
    arrowRef,
    contentRef,
    placement,
    arrowOffset,
    contentOffset,
    arrowSize,
    portal,
    disabled,
    openDelay,
    closeDelay,
    controlledOpen,
    onOpen: () => { setHoverOpen(true); setFocusOpen(true); },
    onClose: () => { setHoverOpen(false); setFocusOpen(false); },
    onToggle: () => { onOpenChange?.(!isOpen); },
  };

  const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>;
  const childProps = child.props;
  const childRef = child.props.ref;

  const enhancedChild = React.cloneElement(child, {
    ...childProps,
    ref: (el: HTMLElement | null) => {
      setTriggerEl(el);
      if (typeof childRef === "function") childRef(el);
      else if (childRef && "current" in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    "aria-describedby": disabled ? undefined : "tooltip-content",
    "aria-disabled": disabled || undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      scheduleOpen();
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      scheduleClose();
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      scheduleOpen();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      scheduleClose();
      childProps.onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape") handleClose();
      childProps.onKeyDown?.(e);
    },
  });

  return (
    <TooltipProvider value={ctxValue}>
      <span className="inline-block cursor-pointer" aria-label="tooltip-trigger">
        {enhancedChild}
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
