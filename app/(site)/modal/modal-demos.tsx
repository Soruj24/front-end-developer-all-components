"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import type { ModalSize } from "@/components/ui/Modal";

const SIZES: ModalSize[] = ["sm", "md", "lg", "xl", "fullscreen"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
        active
          ? "bg-foreground text-background shadow-sm"
          : "border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60`}
    >
      {children}
    </button>
  );
}

export function LivePreviewDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button type="button" onClick={() => setOpen(true)} className="btn btn-primary btn-md">
        Open Modal
      </button>
      <p className="text-xs text-muted-foreground">
        Escape, backdrop click, or the close button dismiss · focus is trapped while open
      </p>
      <Modal open={open} onClose={() => setOpen(false)} title="Interactive Demo" size="lg">
        <p className="text-sm leading-relaxed text-muted-foreground">
          A premium dialog surface: blurred theme-aware overlay, hairline border,
          soft modal shadow, and a smooth enter/exit motion. Tab cycles inside the
          dialog; focus returns to the trigger on close.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => setOpen(false)} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button type="button" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}

export function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-primary btn-md">
        Open Basic Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
        <p className="text-sm text-muted-foreground">This is a basic modal dialog.</p>
      </Modal>
    </>
  );
}

export function SizesDemo() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("lg");
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {SIZES.map((s) => (
          <Chip key={s} active={false} onClick={() => { setSize(s); setOpen(true); }}>
            {s.toUpperCase()}
          </Chip>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={`${size.toUpperCase()} Modal`} size={size}>
        <p className="text-sm text-muted-foreground">
          Width variant <span className="font-mono text-xs">{size}</span>. Fullscreen is a true
          full-screen sheet below sm and 95vw x 95vh above.
        </p>
      </Modal>
    </div>
  );
}

export function WithoutTitleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-md">
        Open No-Title Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p className="text-sm text-muted-foreground">
          No title — the close button floats in the top-right corner.
        </p>
      </Modal>
    </>
  );
}

export function FullscreenDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-md">
        Open Fullscreen
      </button>
      <Modal open={open} onClose={() => setOpen(false)} size="fullscreen" title="Fullscreen Modal">
        <p className="text-sm text-muted-foreground">This modal fills nearly the entire viewport.</p>
      </Modal>
    </>
  );
}

const NOTES = Array.from({ length: 8 }, (_, i) => ({
  version: `v2.${8 - i}.0`,
  notes:
    "Shipped refinements to spacing, focus rings, and dark-mode contrast. " +
    "Long bodies now scroll inside a header-fixed panel instead of clipping.",
}));

export function ScrollableDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-md">
        Open Scrollable Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Release Notes" size="lg">
        <div className="space-y-4">
          {NOTES.map((n) => (
            <article key={n.version} className="rounded-xl border border-border/60 bg-background p-4">
              <h3 className="text-sm font-semibold text-foreground">{n.version}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{n.notes}</p>
            </article>
          ))}
        </div>
      </Modal>
    </>
  );
}

export function PlaygroundDemo() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("md");
  const [withTitle, setWithTitle] = useState(true);
  const [withActions, setWithActions] = useState(true);

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Size</span>
        {SIZES.map((s) => (
          <Chip key={s} active={size === s} onClick={() => setSize(s)}>
            {s}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={withTitle}
            onChange={(e) => setWithTitle(e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          Title
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={withActions}
            onChange={(e) => setWithActions(e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          Footer actions
        </label>
      </div>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-primary btn-md">
        Open Playground Modal
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={withTitle ? "Playground Modal" : undefined}
        size={size}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Live output of the controls above. Try every size — including fullscreen —
          and toggle the title to see the close button reposition itself.
        </p>
        {withActions && (
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
              Save changes
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
