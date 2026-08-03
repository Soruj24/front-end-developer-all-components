import * as React from "react";
import { cn } from "@/lib/cn";
import type { TooltipPlacement } from "./Tooltip.types";
import { useTooltipContext } from "./Tooltip.context";
import { computeTooltipPosition } from "./Tooltip.utils";
import { TooltipArrow } from "./TooltipArrow";

interface TooltipContentProps {
  content: React.ReactNode;
  animationDuration: number;
  animationEase: string;
  zIndex: number;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({ content, animationDuration, animationEase, zIndex }) => {
  const ctx = useTooltipContext();
  const { contentRef, placement, arrowOffset, contentOffset, arrowSize } = ctx;
  const triggerEl = ctx.triggerRef as React.RefObject<HTMLElement>;
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [actualPlacement, setActualPlacement] = React.useState<TooltipPlacement>(placement);

  React.useLayoutEffect(() => {
    const el = contentRef?.current;
    const trigger = triggerEl?.current;
    if (!el || !trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = el.getBoundingClientRect();
    const computed = computeTooltipPosition(triggerRect, contentRect.width, contentRect.height, placement, arrowOffset, contentOffset);
    setCoords({ x: computed.x, y: computed.y });
    setActualPlacement(computed.placedAt);
  }, [placement, arrowOffset, contentOffset, triggerEl, contentRef]);

  const style: React.CSSProperties = {
    left: coords.x,
    top: coords.y,
    zIndex,
    animationDuration: `${animationDuration}ms`,
    animationTimingFunction: animationEase,
  };

  return (
    <div
      ref={contentRef}
      role="tooltip"
      id="tooltip-content"
      className={cn(
        "pointer-events-none absolute z-50",
        "rounded-lg px-3 py-1.5 text-sm font-medium",
        "bg-popover text-popover-foreground shadow-lg",
        "border border-border",
        "will-change-transform",
      )}
      style={style}
    >
      {content}
      <TooltipArrow placement={actualPlacement} arrowSize={arrowSize} arrowOffset={arrowOffset} />
    </div>
  );
};
