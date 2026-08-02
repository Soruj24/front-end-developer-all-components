import { forwardRef, ReactNode, useEffect, useRef } from "react";

type Placement = "top" | "bottom" | "left" | "right";

const placementClasses: Record<Placement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: Placement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ trigger, children, placement = "bottom", open, onOpenChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          onOpenChange(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, onOpenChange]);

    return (
      <div className="relative inline-block" ref={containerRef}>
        <div onClick={() => onOpenChange(!open)}>{trigger}</div>
        {open && (
          <div
            ref={ref}
            className={`absolute z-50 min-w-[10rem] max-w-[calc(100vw-1rem)] rounded-lg border border-border bg-surface p-4 shadow-popover ${placementClasses[placement]}`}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
Popover.displayName = "Popover";

export default Popover;
