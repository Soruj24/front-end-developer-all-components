import { forwardRef, HTMLAttributes } from "react";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "both" | "vertical" | "horizontal";
  maxHeight?: string;
  maxWidth?: string;
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", orientation = "vertical", maxHeight = "16rem", maxWidth, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-auto ${
          orientation === "vertical"
            ? "overflow-x-hidden"
            : orientation === "horizontal"
              ? "overflow-y-hidden"
              : ""
        } ${className}`}
        style={{
          maxHeight: orientation !== "horizontal" ? maxHeight : undefined,
          maxWidth: orientation !== "vertical" ? maxWidth : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
export { ScrollArea };
