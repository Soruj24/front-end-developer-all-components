"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { ResizableProps, ResizablePanelProps, ResizableHandleProps } from "./Resizable.types";
import { RESIZABLE_STYLES } from "./Resizable.constants";

const ResizableContext = React.createContext<{
  sizes: number[];
  setSizes: (sizes: number[]) => void;
  handles: React.ReactNode[];
}>({ sizes: [], setSizes: () => {}, handles: [] });

export function useResizableContext() {
  const ctx = React.useContext(ResizableContext);
  if (!ctx) throw new Error("useResizableContext must be used within Resizable");
  return ctx;
}

export function Resizable({ children, defaultSizes, onSizesChange, collapsible, className, ...props }: ResizableProps) {
  const childArray = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<ResizablePanelProps & { key?: string }>[];
  const panelCount = childArray.length;

  const initialSizes = defaultSizes ?? new Array(panelCount).fill(100 / panelCount);
  const [sizes, setSizes] = React.useState(initialSizes);

  React.useEffect(() => { onSizesChange?.(sizes); }, [sizes, onSizesChange]);

  const handleMouseDown = (idx: number) => (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startSizes = [...sizes];
    const minSize = 5;

    const handleMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const totalDelta = delta / window.innerWidth * 100;
      const newSizes = [...startSizes];
      const left = Math.max(minSize, startSizes[idx] + totalDelta);
      const right = Math.max(minSize, startSizes[idx + 1] - totalDelta);
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

  const handles = childArray.slice(0, -1).map((_, idx) => (
    <div key={idx} className={cn(RESIZABLE_STYLES.handle)} onMouseDown={handleMouseDown(idx)}>
      <div className={RESIZABLE_STYLES.handleIcon} />
    </div>
  ));

  return (
    <ResizableContext.Provider value={{ sizes, setSizes, handles }}>
      <div className={cn(RESIZABLE_STYLES.container, className)} {...props}>
        {childArray.map((child, idx) => (
          <React.Fragment key={idx}>
            <ResizablePanelContext panelIndex={idx} sizes={sizes}>{child}</ResizablePanelContext>
            {handles[idx]}
          </React.Fragment>
        ))}
      </div>
    </ResizableContext.Provider>
  );
}

function ResizablePanelContext({ panelIndex, sizes, children }: { panelIndex: number; sizes: number[]; children: React.ReactElement<{ className?: string }> }) {
  const ctx = useResizableContext();
  const child = React.cloneElement(children, {
    className: cn(children.props.className, "flex h-full", `w-[${sizes[panelIndex]}%]`),
  });
  return child;
}

export function ResizablePanel({ children, className, ...props }: ResizablePanelProps) {
  return <div className={cn(RESIZABLE_STYLES.panel, className)} {...props}>{children}</div>;
}

export function ResizableHandle({ className, ...props }: ResizableHandleProps) {
  return <div className={cn(RESIZABLE_STYLES.handle, className)} {...props}><div className={RESIZABLE_STYLES.handleIcon} /></div>;
}
