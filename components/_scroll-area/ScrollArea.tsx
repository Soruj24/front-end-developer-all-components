"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { ScrollAreaProps } from "./ScrollArea.types";
import { SCROLL_AREA_STYLES } from "./ScrollArea.constants";

export function ScrollArea({ children, maxHeight = "100%", orientation = "both", size = "md", showScrollbar = true, className, ...props }: ScrollAreaProps) {
  const [thumbPos, setThumbPos] = React.useState(0);
  const [thumbHeight, setThumbHeight] = React.useState(0);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const thumbPercent = (clientHeight / scrollHeight) * 100;
    setThumbPos(percent);
    setThumbHeight(thumbPercent > 100 ? 100 : thumbPercent);
  };

  const scrollOrientations = {
    vertical: "overflow-y-auto overflow-x-hidden",
    horizontal: "overflow-x-auto overflow-y-hidden",
    both: "overflow-auto",
  };

  return (
    <div className={cn("relative", className)} style={{ maxHeight }} {...props}>
      <div ref={viewportRef} className={cn(SCROLL_AREA_STYLES.viewport, scrollOrientations[orientation])} onScroll={handleScroll}>
        {children}
      </div>
      {showScrollbar && thumbHeight > 0 && thumbHeight < 100 && (
        <div className="absolute right-1 top-0 bottom-0 my-auto w-2 cursor-grab">
          <div
            className={cn(SCROLL_AREA_STYLES.track, SCROLL_AREA_STYLES[size])}
            style={{ transform: `translateY(${thumbPos}%)`, height: `${thumbHeight}%` }}
          />
        </div>
      )}
    </div>
  );
}
