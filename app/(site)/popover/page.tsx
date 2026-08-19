"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Popover from "@/components/ui/Popover";

const POPOVER_SOURCE = `import { forwardRef, ReactNode, useEffect, useRef } from "react";

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
            className={\`absolute z-50 min-w-[10rem] max-w-[calc(100vw-1rem)] rounded-lg border border-border bg-surface p-4 shadow-popover \${placementClasses[placement]}\`}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
Popover.displayName = "Popover";

export default Popover;`;

const BASIC_EXAMPLE = `import Popover from "@/components/ui/Popover";

function BasicPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<button>Toggle</button>}
      open={open}
      onOpenChange={setOpen}
    >
      <p className="text-sm">Hello! This is a popover.</p>
    </Popover>
  );
}`;

const PLACEMENT_EXAMPLE = `import Popover from "@/components/ui/Popover";

function PlacementExample() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<button>Open</button>}
      placement="top"
      open={open}
      onOpenChange={setOpen}
    >
      <p className="text-sm">Placed on top</p>
    </Popover>
  );
}`;

const MENU_EXAMPLE = `import Popover from "@/components/ui/Popover";

function MenuExample() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<button>Actions</button>}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex flex-col gap-1">
        <button className="rounded px-2 py-1 text-sm hover:bg-muted">Edit</button>
        <button className="rounded px-2 py-1 text-sm hover:bg-muted">Duplicate</button>
        <button className="rounded px-2 py-1 text-sm text-danger hover:bg-danger-soft">Delete</button>
      </div>
    </Popover>
  );
}`;

const TRIGGER_BTN =
  "rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted";

export default function PopoverPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <ComponentDocPage
      name="Popover"
      category="Overlays"
      description="Click-triggered floating panels for menus, tooltips, forms, and contextual content. Closes on outside click."
    >
      <PreviewPanel>
        <Popover
          trigger={<button className={TRIGGER_BTN}>Open Popover</button>}
          open={basicOpen}
          onOpenChange={setBasicOpen}
        >
          <p className="text-sm">Popover content goes here.</p>
        </Popover>
      </PreviewPanel>

      <SourceCodeViewer source={POPOVER_SOURCE} filename="Popover.tsx" defaultExpanded />

      <ExampleBlock title="Basic Popover" description="Simple toggle popover with outside-click dismiss." code={BASIC_EXAMPLE}>
        <Popover trigger={<button className={TRIGGER_BTN}>Toggle</button>} open={basicOpen} onOpenChange={setBasicOpen}>
          <p className="text-sm">Hello! This is a popover.</p>
        </Popover>
      </ExampleBlock>

      <ExampleBlock title="Action Menu" description="Dropdown menu with action items." code={MENU_EXAMPLE}>
        <Popover trigger={<button className={TRIGGER_BTN}>Actions</button>} open={menuOpen} onOpenChange={setMenuOpen}>
          <div className="flex flex-col gap-1">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Actions</p>
            {["Edit", "Duplicate", "Archive"].map((a) => (
              <button key={a} className="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">{a}</button>
            ))}
            <button className="rounded px-2 py-1.5 text-left text-sm text-danger hover:bg-danger-soft">Delete</button>
          </div>
        </Popover>
      </ExampleBlock>

      <ExampleBlock title="Info Tooltip" description="Contextual information popover." code={PLACEMENT_EXAMPLE}>
        <Popover trigger={<button className={TRIGGER_BTN}>Info</button>} placement="top" open={infoOpen} onOpenChange={setInfoOpen}>
          <div className="text-sm text-muted-foreground">
            <p className="mb-1 text-xs font-medium text-muted-foreground">About</p>
            <p>This popover shows contextual information about the element.</p>
          </div>
        </Popover>
      </ExampleBlock>

      <ExampleBlock title="Quick Form" description="Form popover with inputs and submit." code={BASIC_EXAMPLE}>
        <Popover trigger={<button className={TRIGGER_BTN}>Quick Form</button>} open={formOpen} onOpenChange={setFormOpen}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">Feedback</p>
            <input placeholder="Name" className="rounded-lg border border-border px-2 py-1.5 text-xs dark:bg-muted" />
            <input placeholder="Email" className="rounded-lg border border-border px-2 py-1.5 text-xs dark:bg-muted" />
            <button type="submit" className="rounded bg-primary px-2 py-1.5 text-xs text-primary-foreground hover:bg-primary/90">Submit</button>
          </form>
        </Popover>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
