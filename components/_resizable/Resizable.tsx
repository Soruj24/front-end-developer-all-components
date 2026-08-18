"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { ResizableProps, ResizablePanelProps, ResizableHandleProps } from "./Resizable.types";
import { RESIZABLE_STYLES } from "./Resizable.constants";

const ResizableContext = React.createContext<{
  sizes: number[];
  setSizes: (sizes: number[]) => void;
}>({ sizes: [], setSizes: () => {} });

export function useResizableContext() {
  const ctx = React.useContext(ResizableContext);
  if (!ctx) throw new Error("useResizableContext must be used within Resizable");
  return ctx;
}

export function Resizable({ children, defaultSizes, onSizesChange, className, ...props }: ResizableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const allChildren = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];
  const panels = allChildren.filter((child) => child.type === ResizablePanel);
  const panelCount = panels.length;

  const initialSizes = defaultSizes ?? new Array(panelCount).fill(100 / panelCount);
  const [sizes, setSizes] = React.useState(initialSizes);

  React.useEffect(() => { onSizesChange?.(sizes); }, [sizes, onSizesChange]);

  const handleMouseDown = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startSizes = [...sizes];
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    const handleWidth = 6 * (panelCount - 1);
    const availableWidth = containerWidth - handleWidth;
    const minPct = (12 / availableWidth) * 100;

    const handleMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const deltaPct = (delta / availableWidth) * 100;
      const newSizes = [...startSizes];
      const left = Math.max(minPct, startSizes[idx] + deltaPct);
      const right = Math.max(minPct, startSizes[idx + 1] - deltaPct);
      newSizes[idx] = left;
      newSizes[idx + 1] = right;
      setSizes(newSizes);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  return (
    <ResizableContext.Provider value={{ sizes, setSizes }}>
      <div ref={containerRef} className={cn(RESIZABLE_STYLES.container, className)} {...props}>
        {panels.flatMap((child, idx) => [
          <ResizablePanelContext key={`panel-${idx}`} panelIndex={idx} sizes={sizes}>
            {child}
          </ResizablePanelContext>,
          idx < panels.length - 1 && (
            <div key={`handle-${idx}`} className={cn(RESIZABLE_STYLES.handle)} onMouseDown={handleMouseDown(idx)}>
              <div className={RESIZABLE_STYLES.handleIcon} />
            </div>
          ),
        ])}
      </div>
    </ResizableContext.Provider>
  );
}

function ResizablePanelContext({ panelIndex, sizes, children }: { panelIndex: number; sizes: number[]; children: React.ReactElement<{ className?: string }> }) {
  const total = sizes.reduce((a, b) => a + b, 0);
  const pct = total > 0 ? (sizes[panelIndex] / total) * 100 : 100 / sizes.length;
  return React.cloneElement(children, {
    className: cn(children.props.className, "h-full shrink-0 grow-0 basis-auto"),
    style: { width: `${pct}%`, flex: "none" },
  });
}

export function ResizablePanel({ children, className, ...props }: ResizablePanelProps) {
  return <div className={cn(RESIZABLE_STYLES.panel, className)} {...props}>{children}</div>;
}

export function ResizableHandle({ className, ...props }: ResizableHandleProps) {
  return <div className={cn(RESIZABLE_STYLES.handle, className)} {...props}><div className={RESIZABLE_STYLES.handleIcon} /></div>;
}
