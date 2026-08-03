import * as React from "react";
import { cn } from "@/lib/cn";
import type { TooltipPlacement } from "./Tooltip.types";

interface TooltipArrowProps {
  placement: TooltipPlacement;
  arrowSize: number;
  arrowOffset: number;
  className?: string;
}

export const TooltipArrow: React.FC<TooltipArrowProps> = ({ placement, arrowSize, arrowOffset, className }) => {
  const half = arrowSize / 2;
  const offset = arrowOffset + arrowSize / 2;

  const paths: Record<TooltipPlacement, { d: string; transform: string }> = {
    top: { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, ${offset}px) rotate(180deg)` },
    "top-start": { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, ${offset}px) rotate(180deg)` },
    "top-end": { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, ${offset}px) rotate(180deg)` },
    bottom: { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, -${offset}px)` },
    "bottom-start": { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, -${offset}px)` },
    "bottom-end": { d: `M0 0 L${arrowSize} 0 L${half} ${arrowSize} Z`, transform: `translate(-${half}px, -${offset}px)` },
    left: { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${-offset}px, -${half}px) rotate(-90deg)` },
    "left-start": { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${-offset}px, -${half}px) rotate(-90deg)` },
    "left-end": { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${-offset}px, -${half}px) rotate(-90deg)` },
    right: { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${offset}px, -${half}px) rotate(90deg)` },
    "right-start": { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${offset}px, -${half}px) rotate(90deg)` },
    "right-end": { d: `M0 0 L0 ${arrowSize} L${arrowSize} ${half} Z`, transform: `translate(${offset}px, -${half}px) rotate(90deg)` },
  };

  const { d, transform } = paths[placement];

  return (
    <svg
      width={arrowSize}
      height={arrowSize}
      viewBox={`0 0 ${arrowSize} ${arrowSize}`}
      className={cn("absolute fill-current", className)}
      style={{ transform }}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
};
