export const MODAL_SOURCE = `"use client";

import { type ReactNode, forwardRef, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

const EXIT_MS = 200;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Width variants. Fullscreen becomes a full-bleed sheet on mobile. */
const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  fullscreen:
    "h-dvh max-h-none w-full max-w-full rounded-none sm:h-[95vh] sm:max-h-[95vh] sm:max-w-[95vw] sm:rounded-2xl",
};

export interface ModalProps {
  /** Controls whether the modal is open. */
  open: boolean;
  /** Called on Escape, backdrop click, or close button press. */
  onClose: () => void;
  /** Optional heading rendered at the top of the panel. */
  title?: string;
  /** Width variant of the panel. */
  size?: ModalSize;
  /** Dialog body content. */
  children?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, size = "md", children }, ref) => {
    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    /* Enter/exit lifecycle: transitions are deferred to callbacks so the
       exit animation can play before the dialog unmounts. */
    useEffect(() => {
      if (open) {
        const rafId = requestAnimationFrame(() => {
          setVisible(true);
          setClosing(false);
        });
        return () => cancelAnimationFrame(rafId);
      }
      const closeId = requestAnimationFrame(() => setClosing(true));
      const hideId = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, EXIT_MS);
      return () => {
        cancelAnimationFrame(closeId);
        clearTimeout(hideId);
      };
    }, [open]);

    /* Lock background scroll while the dialog is shown. */
    useEffect(() => {
      if (!visible) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [visible]);

    /* Move focus in on open, trap Tab, close on Escape, restore focus on close. */
    useEffect(() => {
      if (!open) return;
      const previouslyFocused = document.activeElement as HTMLElement | null;
      const rafId = requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const firstFocusable =
          panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        (firstFocusable ?? panel).focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCloseRef.current();
          return;
        }
        if (event.key !== "Tab") return;
        const panel = panelRef.current;
        if (!panel) return;
        const items = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus?.();
      };
    }, [open]);

    if (!visible) return null;

    const isFullscreen = size === "fullscreen";

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-overlay backdrop-blur-[4px]",
            "transition-opacity duration-200 ease-out motion-reduce:transition-none",
            closing ? "opacity-0" : "animate-fade-in-fast opacity-100",
          )}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          tabIndex={-1}
          className={cn(
            "relative z-10 flex w-full flex-col outline-none",
            "border border-border bg-surface shadow-modal",
            "ring-1 ring-black/[0.02] dark:ring-white/[0.04]",
            "transition-[opacity,transform] duration-200 ease-out will-change-transform motion-reduce:transition-none",
            isFullscreen
              ? SIZE_CLASSES.fullscreen
              : cn(
                  "max-h-[calc(100dvh-1.5rem)] rounded-t-2xl sm:max-h-[88vh] sm:rounded-2xl",
                  SIZE_CLASSES[size],
                ),
            closing
              ? "translate-y-3 scale-[0.98] opacity-0 sm:translate-y-0"
              : "animate-scale-in-fast",
          )}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 z-20 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {title && (
            <header className="flex shrink-0 flex-col gap-1 pl-5 pr-12 pt-5 sm:pl-6 sm:pr-16 sm:pt-6">
              <h2
                id={titleId}
                className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
              >
                {title}
              </h2>
            </header>
          )}

          {/* Scrollable body */}
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin",
              title
                ? "px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
                : "px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
`;

export const BASIC_EXAMPLE = `import Modal from "@/components/ui/Modal";

function BasicModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
        <p>This is a basic modal dialog.</p>
      </Modal>
    </>
  );
}`;

export const SIZES_EXAMPLE = `<Modal open={open} onClose={close} title="Large Modal" size="lg">
  <p>This modal uses the large size variant.</p>
</Modal>

{/* sm | md | lg | xl | fullscreen */}`;

export const WITHOUT_TITLE_EXAMPLE = `<Modal open={open} onClose={close}>
  <p>No title — the close button floats top-right.</p>
</Modal>`;

export const FULLSCREEN_EXAMPLE = `<Modal open={open} onClose={close} size="fullscreen" title="Fullscreen">
  <p>Fills the viewport — true full-screen below sm, 95vw x 95vh above.</p>
</Modal>`;

export const SCROLLABLE_EXAMPLE = `<Modal open={open} onClose={close} title="Release Notes" size="lg">
  <div className="space-y-4">
    {entries.map((entry) => (
      <article key={entry.version}>
        <h3>{entry.version}</h3>
        <p>{entry.notes}</p>
      </article>
    ))}
  </div>
</Modal>

{/* Long bodies scroll inside the header-fixed panel */}`;

export const PLAYGROUND_EXAMPLE = `<Modal
  open={open}
  onClose={close}
  title="Playground Modal"
  size={size}          // sm | md | lg | xl | fullscreen
>
  <p>Tune props live in the playground below.</p>
  <div className="mt-6 flex justify-end gap-3">
    <button className="btn btn-outline btn-sm">Cancel</button>
    <button className="btn btn-primary btn-sm">Confirm</button>
  </div>
</Modal>`;
