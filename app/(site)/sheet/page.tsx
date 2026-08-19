"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Sheet } from "@/components/_sheet";

const SHEET_SOURCE = `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { SheetProps } from "./Sheet.types";
import { SHEET_STYLES } from "./Sheet.constants";

export function Sheet({ open, defaultOpen, onOpenChange, side = "right", size = "md", trigger, children, title, description, closable = true, overlayClassName }: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); e.stopPropagation(); }
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isControlled]);

  const content = (
    <>
      <div className={cn(SHEET_STYLES.overlay, overlayClassName)} onClick={() => setOpen(false)} />
      <div className={cn(SHEET_STYLES.content, SHEET_STYLES[side], SHEET_STYLES[size] !== SHEET_STYLES.full ? SHEET_STYLES[size] : "")} role="dialog" aria-modal="true">
        {closable && <button onClick={() => setOpen(false)} className={SHEET_STYLES.close} aria-label="Close">×</button>}
        {title && <h2 className={SHEET_STYLES.title}>{title}</h2>}
        {description && <p className={SHEET_STYLES.description}>{description}</p>}
        {children}
      </div>
    </>
  );

  if (!isOpen) return trigger ? <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div> : null;
  return trigger ? <div><div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div>{content}</div> : content;
}`;

const LEFT_SOURCE = `import { Sheet } from "@/components/_sheet";

<Sheet side="left" trigger={<button>Open Left</button>} title="Left Sheet">
  <p>Content from the left.</p>
</Sheet>`;

const RIGHT_SOURCE = `import { Sheet } from "@/components/_sheet";

<Sheet side="right" trigger={<button>Open Right</button>} title="Right Sheet">
  <p>Content from the right.</p>
</Sheet>`;

const TOP_SOURCE = `import { Sheet } from "@/components/_sheet";

<Sheet side="top" trigger={<button>Open Top</button>} title="Top Sheet">
  <p>Content from the top.</p>
</Sheet>`;

const BOTTOM_SOURCE = `import { Sheet } from "@/components/_sheet";

<Sheet side="bottom" trigger={<button>Open Bottom</button>} title="Bottom Sheet">
  <p>Content from the bottom.</p>
</Sheet>`;

const DEFAULT_SOURCE = `import { Sheet } from "@/components/_sheet";

<Sheet trigger={<button>Open Sheet</button>} title="Edit Profile" description="Make changes to your profile here.">
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Name</label>
      <input className="rounded border px-3 py-2 text-sm" />
    </div>
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Email</label>
      <input className="rounded border px-3 py-2 text-sm" />
    </div>
  </div>
</Sheet>`;

function SheetDemo({ side }: { side: "left" | "right" | "top" | "bottom" }) {
  return (
    <Sheet side={side} trigger={<button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">{side.charAt(0).toUpperCase() + side.slice(1)}</button>} title={`${side.charAt(0).toUpperCase() + side.slice(1)} Sheet`} description={`This sheet slides in from the ${side}.`}>
      <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
    </Sheet>
  );
}

export default function SheetPage() {
  return (
    <ComponentDocPage name="Sheet" category="Overlays" description="A sliding panel that overlays content from any edge of the screen. Supports four directions and multiple sizes with controlled or uncontrolled state.">
      <PreviewPanel filename="sheet-preview.tsx">
        <div className="flex flex-wrap items-center gap-4">
          <SheetDemo side="left" />
          <SheetDemo side="right" />
          <SheetDemo side="top" />
          <SheetDemo side="bottom" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SHEET_SOURCE} filename="components/_sheet/Sheet.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="A sheet sliding from the right with a form." code={DEFAULT_SOURCE} filename="sheet-default.tsx">
          <Sheet trigger={<button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Open Sheet</button>} title="Edit Profile" description="Make changes to your profile here.">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <input className="rounded border px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input className="rounded border px-3 py-2 text-sm" />
              </div>
            </div>
          </Sheet>
        </ExampleBlock>

        <ExampleBlock title="Left" description="Sheet slides in from the left edge." code={LEFT_SOURCE} filename="sheet-left.tsx">
          <SheetDemo side="left" />
        </ExampleBlock>

        <ExampleBlock title="Right" description="Sheet slides in from the right edge." code={RIGHT_SOURCE} filename="sheet-right.tsx">
          <SheetDemo side="right" />
        </ExampleBlock>

        <ExampleBlock title="Top" description="Sheet slides in from the top edge." code={TOP_SOURCE} filename="sheet-top.tsx">
          <SheetDemo side="top" />
        </ExampleBlock>

        <ExampleBlock title="Bottom" description="Sheet slides in from the bottom edge." code={BOTTOM_SOURCE} filename="sheet-bottom.tsx">
          <SheetDemo side="bottom" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
