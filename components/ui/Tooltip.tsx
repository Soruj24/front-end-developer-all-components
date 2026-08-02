import { forwardRef, ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/cn";

type Position = "top" | "bottom" | "left" | "right";

const positionClasses: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
  right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
};

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: Position;
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = "top", delay = 300 }, ref) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
    };

    return (
      <div
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        ref={ref}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            className={cn(
              "pointer-events-none absolute z-50",
              positionClasses[position]
            )}
          >
            <div className="whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-popover animate-tooltip-in">
              {content}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export default Tooltip;
