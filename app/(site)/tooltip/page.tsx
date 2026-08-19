"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Tooltip } from "@/components/ui/Tooltip";

const TOOLTIP_SOURCE = `import { useState, useRef } from "react";
import { cn } from "@/lib/cn";

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 300,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delayDuration);
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
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 animate-fade-in-fast",
            sideClasses[side],
            className
          )}
        >
          <div className="whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-popover">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}`;

const TOP_SOURCE = `import Tooltip from "@/components/ui/Tooltip";

function TopExample() {
  return (
    <Tooltip content="Tooltip on top" side="top">
      <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
        Hover me
      </button>
    </Tooltip>
  );
}`;

const BOTTOM_SOURCE = `import Tooltip from "@/components/ui/Tooltip";

function BottomExample() {
  return (
    <Tooltip content="Tooltip on bottom" side="bottom">
      <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
        Hover me
      </button>
    </Tooltip>
  );
}`;

const LEFT_SOURCE = `import Tooltip from "@/components/ui/Tooltip";

function LeftExample() {
  return (
    <Tooltip content="Tooltip on left" side="left">
      <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
        Hover me
      </button>
    </Tooltip>
  );
}`;

const RIGHT_SOURCE = `import Tooltip from "@/components/ui/Tooltip";

function RightExample() {
  return (
    <Tooltip content="Tooltip on right" side="right">
      <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
        Hover me
      </button>
    </Tooltip>
  );
}`;

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
    {children}
  </button>
);

export default function TooltipPage() {
  return (
    <ComponentDocPage
      name="Tooltip"
      category="Overlays"
      description="A contextual tooltip that appears on hover or focus, supporting four directional placements with configurable delay."
    >
      <PreviewPanel filename="tooltip-preview.tsx">
        <Tooltip content="Hello!" side="top">
          <Button>Hover me</Button>
        </Tooltip>
      </PreviewPanel>

      <SourceCodeViewer
        source={TOOLTIP_SOURCE}
        filename="components/ui/Tooltip.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Top"
          description="Tooltip positioned above the trigger element."
          code={TOP_SOURCE}
          filename="tooltip-top.tsx"
        >
          <Tooltip content="Tooltip on top" side="top">
            <Button>Top</Button>
          </Tooltip>
        </ExampleBlock>

        <ExampleBlock
          title="Bottom"
          description="Tooltip positioned below the trigger element."
          code={BOTTOM_SOURCE}
          filename="tooltip-bottom.tsx"
        >
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </ExampleBlock>

        <ExampleBlock
          title="Left"
          description="Tooltip positioned to the left of the trigger element."
          code={LEFT_SOURCE}
          filename="tooltip-left.tsx"
        >
          <Tooltip content="Tooltip on left" side="left">
            <Button>Left</Button>
          </Tooltip>
        </ExampleBlock>

        <ExampleBlock
          title="Right"
          description="Tooltip positioned to the right of the trigger element."
          code={RIGHT_SOURCE}
          filename="tooltip-right.tsx"
        >
          <Tooltip content="Tooltip on right" side="right">
            <Button>Right</Button>
          </Tooltip>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
