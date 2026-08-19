"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Modal from "@/components/ui/Modal";

const MODAL_SOURCE = `import { forwardRef, ReactNode, useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl" | "fullscreen";

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  fullscreen: "max-w-[95vw] h-[95vh]",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, size = "md", children }, ref) => {
    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);
    const titleId = useId();

    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
      if (open) {
        setVisible(true);
        setClosing(false);
      } else if (visible) {
        setClosing(true);
        const t = setTimeout(() => {
          setVisible(false);
          setClosing(false);
        }, 180);
        return () => clearTimeout(t);
      }
    }, [open, visible]);

    if (!visible) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} ref={ref}>
        <div className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          closing ? "opacity-0" : "opacity-100 animate-fade-in-fast")} onClick={onClose} />
        <div className={cn("relative z-10 w-full rounded-2xl bg-surface p-6 shadow-modal transition-[opacity,transform] duration-200 ease-out",
          sizeClasses[size],
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-scale-in-fast")}>
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h2 id={titleId} className="text-lg font-semibold text-foreground">{title}</h2>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95">✕</button>
            </div>
          )}
          {!title && (
            <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95">✕</button>
          )}
          {children}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export default Modal;`;

const BASIC_EXAMPLE = `const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open Modal</button>
  <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
    <p>This is a basic modal dialog.</p>
  </Modal>
</>`;

const SIZES_EXAMPLE = `const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open Large Modal</button>
  <Modal open={open} onClose={() => setOpen(false)} title="Large Modal" size="lg">
    <p>This modal uses the large size variant.</p>
  </Modal>
</>`;

const WITHOUT_TITLE_EXAMPLE = `const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open Modal</button>
  <Modal open={open} onClose={() => setOpen(false)}>
    <p>This modal has no title. The close button is positioned absolutely.</p>
  </Modal>
</>`;

const FULLSCREEN_EXAMPLE = `const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open Fullscreen</button>
  <Modal open={open} onClose={() => setOpen(false)} size="fullscreen" title="Fullscreen">
    <p>This modal fills nearly the entire viewport.</p>
  </Modal>
</>`;

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [noTitleOpen, setNoTitleOpen] = useState(false);
  const [fsOpen, setFsOpen] = useState(false);

  return (
    <ComponentDocPage
      name="Modal"
      category="Overlays"
      description="A dialog overlay that appears on top of the current page with backdrop blur, smooth enter/exit animations, Escape key dismissal, and size variants."
    >
      <PreviewPanel filename="modal-preview">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setOpen(true)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Open Modal
          </button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Interactive Demo" size="lg">
          <p className="text-sm text-muted-foreground">Press Escape or click the backdrop to close.</p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
            <button onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Confirm</button>
          </div>
        </Modal>
      </PreviewPanel>

      <SourceCodeViewer source={MODAL_SOURCE} filename="Modal.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="A standard modal with title and close button." code={BASIC_EXAMPLE}>
          <button onClick={() => setOpen(true)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Open Modal</button>
          <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
            <p className="text-sm text-muted-foreground">This is a basic modal dialog.</p>
          </Modal>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Four width variants: sm, md, lg, xl, and fullscreen." code={SIZES_EXAMPLE}>
          <div className="flex flex-wrap gap-2">
            {(["sm", "md", "lg", "xl", "fullscreen"] as const).map((s) => (
              <button key={s} onClick={() => { setSizeOpen(true); }} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">{s.toUpperCase()}</button>
            ))}
          </div>
          <Modal open={sizeOpen} onClose={() => setSizeOpen(false)} title="Size Demo" size="lg">
            <p className="text-sm text-muted-foreground">Resize the viewport to see different sizes.</p>
          </Modal>
        </ExampleBlock>

        <ExampleBlock title="Without Title" description="A modal without a title shows an absolute close button." code={WITHOUT_TITLE_EXAMPLE}>
          <button onClick={() => setNoTitleOpen(true)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Open No-Title Modal</button>
          <Modal open={noTitleOpen} onClose={() => setNoTitleOpen(false)}>
            <p className="text-sm text-muted-foreground">No title — close button in the top-right corner.</p>
          </Modal>
        </ExampleBlock>

        <ExampleBlock title="Fullscreen" description="Full viewport modal for complex content layouts." code={FULLSCREEN_EXAMPLE}>
          <button onClick={() => setFsOpen(true)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Open Fullscreen</button>
          <Modal open={fsOpen} onClose={() => setFsOpen(false)} size="fullscreen" title="Fullscreen Modal">
            <p className="text-sm text-muted-foreground">This modal fills nearly the entire viewport.</p>
          </Modal>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
