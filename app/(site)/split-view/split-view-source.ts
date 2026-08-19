export const SPLIT_VIEW_SOURCE = `"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";

function SplitView({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  direction = "horizontal",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: "horizontal" | "vertical";
}) {
  const [size, setSize] = useState(defaultSize);
  const isHorizontal = direction === "horizontal";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const onMove = (ev: MouseEvent) => {
      const pct = isHorizontal
        ? ((ev.clientX - rect.left) / rect.width) * 100
        : ((ev.clientY - rect.top) / rect.height) * 100;
      setSize(Math.min(maxSize, Math.max(minSize, pct)));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div className={\`flex h-64 w-full overflow-hidden rounded-lg border border-border \${isHorizontal ? "flex-row" : "flex-col"}\`}>
      <div className="overflow-auto" style={{ [isHorizontal ? "width" : "height"]: \`\${size}%\` }}>
        {left}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className={\`flex items-center justify-center bg-border/50 transition-colors hover:bg-border \${isHorizontal ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"}\`}
      >
        <GripVertical className={\`h-3 w-3 text-muted-foreground/70 \${!isHorizontal ? "rotate-90" : ""}\`} />
      </div>
      <div className="overflow-auto" style={{ [isHorizontal ? "width" : "height"]: \`\${100 - size}%\` }}>
        {right}
      </div>
    </div>
  );
}

export default SplitView;`;

export const DEFAULT_CODE = `<SplitView
  left={<div>Left Panel</div>}
  right={<div>Right Panel</div>}
/>`;

export const VERTICAL_CODE = `<SplitView direction="vertical" left={<div>Top</div>} right={<div>Bottom</div>} />`;

export const FIFTY_CODE = `<SplitView defaultSize={50} left={<div>50%</div>} right={<div>50%</div>} />`;

export const CODE_EDITOR_CODE = `<SplitView defaultSize={60} left={<CodeEditor />} right={<PreviewPanel />} />`;

export const NARROW_CODE = `<SplitView defaultSize={30} minSize={15} left={<Sidebar />} right={<Content />} />`;

export const DOC_CODE = `<SplitView defaultSize={65} left={<Document />} right={<Notes />} />`;