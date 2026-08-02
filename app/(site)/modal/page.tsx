"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ComponentPreview } from "@/components/preview";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const sizes = [
  { key: "sm" as ModalSize, label: "SM", desc: "Narrow modal" },
  { key: "md" as ModalSize, label: "MD", desc: "Default modal" },
  { key: "lg" as ModalSize, label: "LG", desc: "Wide modal" },
  { key: "xl" as ModalSize, label: "XL", desc: "Extra wide modal" },
];

const confirmVariants = [
  { label: "Standard", variant: "indigo" as const, desc: "Confirm an action" },
  { label: "Destructive", variant: "red" as const, desc: "Delete or irreversible" },
  { label: "Warning", variant: "amber" as const, desc: "Caution required" },
];

const products = [
  { id: 1, name: "Wireless Headphones", price: "$79", desc: "Noise-cancelling bluetooth headphones with 30hr battery." },
  { id: 2, name: "Smart Watch", price: "$199", desc: "Fitness tracking, heart rate monitor, GPS." },
  { id: 3, name: "USB-C Hub", price: "$49", desc: "7-in-1 adapter with 4K HDMI, SD card, USB 3.0." },
  { id: 4, name: "Mechanical Keyboard", price: "$129", desc: "RGB backlit, hot-swappable switches, aluminum frame." },
  { id: 5, name: "Webcam 4K", price: "$159", desc: "Ultra HD, auto-focus, built-in ring light." },
];

const plans = [
  { name: "Starter", price: "$9", features: ["1 user", "5 projects", "2GB storage"] },
  { name: "Pro", price: "$29", features: ["10 users", "Unlimited projects", "50GB storage", "Priority support"] },
  { name: "Enterprise", price: "$99", features: ["Unlimited users", "Unlimited projects", "500GB storage", "24/7 support", "Custom integrations"] },
];

const galleryImages = [
  { src: "/api/placeholder/800/500", label: "Mountain View" },
  { src: "/api/placeholder/800/500", label: "Ocean Sunset" },
  { src: "/api/placeholder/800/500", label: "City Skyline" },
  { src: "/api/placeholder/800/500", label: "Forest Trail" },
  { src: "/api/placeholder/800/500", label: "Desert Dunes" },
];

const notifications = [
  { title: "New message", desc: "You have 3 unread messages from your team." },
  { title: "Update available", desc: "Version 4.2.1 is ready to install." },
  { title: "Payment received", desc: "$249.00 has been credited to your account." },
];

const modalVariants = [
  { label: "Default", desc: "Standard card modal" },
  { label: "Fullscreen", desc: "Full viewport modal" },
  { label: "Side Panel", desc: "Slides in from right" },
  { label: "Bottom Sheet", desc: "Anchored to bottom" },
];

const modalUseCases = [
  { title: "Terms of Service", desc: "Scrollable agreement with accept/decline." },
  { title: "Media Preview", desc: "Lightbox image/video viewer." },
  { title: "Share Dialog", desc: "Social sharing with copy link." },
  { title: "Feedback Form", desc: "Rate and review modal." },
];

function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        anim ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 mx-4 w-full rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 ${
          anim ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        } ${sizeClasses[size]}`}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-xl text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function GalleryModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        anim ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 mx-4 w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-zinc-900 ${
          anim ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function ConfirmModal({
  open,
  onClose,
  variant,
}: {
  open: boolean;
  onClose: () => void;
  variant: "indigo" | "red" | "amber";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const btnBg = {
    indigo: "bg-primary hover:bg-primary/90",
    red: "bg-danger hover:bg-danger/90",
    amber: "bg-warning hover:bg-warning/90",
  };
  const titles = { indigo: "Confirm Action", red: "Delete Item", amber: "Unsaved Changes" };
  const messages = {
    indigo: "Are you sure you want to proceed with this action?",
    red: "This item will be permanently deleted. This cannot be undone.",
    amber: "You have unsaved changes. Do you want to leave without saving?",
  };
  const confirmTexts = { indigo: "Confirm", red: "Delete", amber: "Leave" };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        anim ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 ${
          anim ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold">{titles[variant]}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{messages[variant]}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
            Cancel
          </button>
          <button onClick={onClose} className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${btnBg[variant]}`}>
            {confirmTexts[variant]}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<Element | null>(null);
  const [anim, setAnim] = useState(false);
  const [data, setData] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        anim ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 ${
          anim ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">New User</h2>
          <button onClick={onClose} className="text-xl text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
            &times;
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Name</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Email</label>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              className="rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ModalPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState<ModalSize | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmVariant, setConfirmVariant] = useState<"indigo" | "red" | "amber">("indigo");
  const [productOpen, setProductOpen] = useState<number | null>(null);
  const [planOpen, setPlanOpen] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [galleryId, setGalleryId] = useState<number | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("New message");

  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const closeSize = useCallback(() => setSizeOpen(null), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const closeWizard = useCallback(() => { setWizardOpen(false); setWizardStep(1); }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Modal</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of modal patterns — sizes, confirmations, quick views,
          forms, wizards, galleries, and use cases. Use the tabs to switch
          between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="modal-interactive">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setDemoOpen(true)}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Open Modal
            </button>
          </div>
          <Modal open={demoOpen} onClose={closeDemo} title="Interactive Demo" size="lg">
            <p className="text-sm text-muted-foreground">
              This modal demonstrates focus trap, keyboard navigation (Tab/Escape), and smooth enter/exit animations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium dark:bg-muted">Focus trap</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium dark:bg-muted">Escape dismiss</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium dark:bg-muted">Scale animation</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium dark:bg-muted">Backdrop click</span>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeDemo} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                Cancel
              </button>
              <button onClick={closeDemo} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Confirm
              </button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-sizes">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {sizes.map((s) => (
              <button
                key={s.key}
                onClick={() => setSizeOpen(s.key)}
                className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-primary dark:bg-indigo-900/30 dark:text-indigo-400">
                  {s.label.slice(0, 2)}
                </div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
              </button>
            ))}
          </div>
          <Modal open={sizeOpen !== null} onClose={closeSize} title={`${sizeOpen} Modal`} size={sizeOpen ?? "md"}>
            <p className="text-sm text-muted-foreground">
              This modal uses the {sizeOpen} width variant.
            </p>
            <div className="mt-6 flex justify-end">
              <button onClick={closeSize} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Close
              </button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-confirm">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-4 sm:grid-cols-3">
            {confirmVariants.map((c) => (
              <button
                key={c.label}
                onClick={() => { setConfirmVariant(c.variant); setConfirmOpen(true); }}
                className="rounded-xl border border-border p-5 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
              >
                <div className="text-sm font-medium">{c.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.desc}</div>
              </button>
            ))}
          </div>
          <ConfirmModal open={confirmOpen} onClose={closeConfirm} variant={confirmVariant} />
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-quick-view">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-4 sm:grid-cols-5">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setProductOpen(p.id)}
                className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-primary dark:bg-indigo-900/30 dark:text-indigo-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.price}</div>
              </button>
            ))}
          </div>
          <Modal
            open={productOpen !== null}
            onClose={() => setProductOpen(null)}
            title={productOpen !== null ? products.find((p) => p.id === productOpen)?.name : undefined}
            size="md"
          >
            <div className="mb-4 h-48 rounded-lg bg-muted dark:bg-muted" />
            <p className="text-sm text-muted-foreground">
              {productOpen !== null ? products.find((p) => p.id === productOpen)?.desc : ""}
            </p>
            <p className="mt-2 text-2xl font-bold text-primary dark:text-indigo-400">
              {productOpen !== null ? products.find((p) => p.id === productOpen)?.price : ""}
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add to Cart</button>
              <button onClick={() => setProductOpen(null)} className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Close</button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-plans">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-4 sm:grid-cols-3">
            {plans.map((p) => (
              <button
                key={p.name}
                onClick={() => setPlanOpen(p.name)}
                className="rounded-xl border border-border p-5 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
              >
                <div className="text-sm font-medium">{p.name}</div>
                <div className="mt-1 text-xl font-bold">
                  {p.price}
                  <span className="text-xs font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
          <Modal open={planOpen !== null} onClose={() => setPlanOpen(null)} title={`${planOpen} Plan`} size="sm">
            <p className="text-sm text-muted-foreground">Subscribe to this plan to get started today.</p>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Subscribe</button>
              <button onClick={() => setPlanOpen(null)} className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-form">
        <div className="flex w-full flex-col gap-4">
          <div>
            <button
              onClick={() => setFormOpen(true)}
              className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-muted/40 dark:border-border dark:bg-zinc-900 dark:hover:bg-muted/50"
            >
              Open Form Modal
            </button>
          </div>
          <FormModal open={formOpen} onClose={closeForm} />
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-wizard">
        <div className="flex w-full flex-col gap-4">
          <div>
            <button
              onClick={() => { setWizardOpen(true); setWizardStep(1); }}
              className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-muted/40 dark:border-border dark:bg-zinc-900 dark:hover:bg-muted/50"
            >
              Open Wizard
            </button>
          </div>
          <Modal open={wizardOpen} onClose={closeWizard} title={`Step ${wizardStep} of 3`} size="md">
            {wizardStep === 1 && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Enter your project details to get started.</p>
                <input className="rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Project name" />
                <textarea className="rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Description" rows={3} />
              </div>
            )}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Choose your template and preferences.</p>
                <div className="flex gap-3">
                  {["Basic", "Advanced", "Custom"].map((t) => (
                    <label key={t} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm dark:border-border">
                      <input type="radio" name="template" className="accent-primary" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            )}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Review and confirm your selections.</p>
                <div className="rounded-lg bg-muted/40 p-3 text-sm dark:bg-muted">
                  <p><strong>Project:</strong> My Project</p>
                  <p><strong>Template:</strong> Basic</p>
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 w-6 rounded-full ${s <= wizardStep ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
              <div className="flex gap-3">
                {wizardStep > 1 && (
                  <button onClick={() => setWizardStep((s) => s - 1)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                    Back
                  </button>
                )}
                {wizardStep < 3 ? (
                  <button onClick={() => setWizardStep((s) => s + 1)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Next
                  </button>
                ) : (
                  <button onClick={closeWizard} className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:bg-success/90">
                    Finish
                  </button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-nested">
        <div className="flex w-full flex-col gap-4">
          <div>
            <button
              onClick={() => setNestedOpen(true)}
              className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-muted/40 dark:border-border dark:bg-zinc-900 dark:hover:bg-muted/50"
            >
              Open Parent Modal
            </button>
          </div>
          <Modal open={nestedOpen} onClose={() => setNestedOpen(false)} title="Parent Modal" size="md">
            <p className="text-sm text-muted-foreground">
              This is the parent modal. You can open a nested modal on top.
            </p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setNestedOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                Close
              </button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-gallery">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => { setGalleryId(i); setGalleryIdx(i); }}
                className="overflow-hidden rounded-xl border border-border transition-opacity hover:opacity-80 dark:border-border"
              >
                <div className="aspect-[4/3] bg-muted dark:bg-muted" />
                <div className="p-2 text-xs font-medium">{img.label}</div>
              </button>
            ))}
          </div>
          <GalleryModal open={galleryId !== null} onClose={() => setGalleryId(null)}>
            <div className="flex flex-col items-center">
              <div className="mb-4 h-64 w-full rounded-lg bg-muted dark:bg-muted" />
              <p className="text-sm text-muted-foreground">{galleryImages[galleryIdx]?.label}</p>
              <div className="mt-4 flex gap-2">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    className={`h-2 w-2 rounded-full ${i === galleryIdx ? "bg-primary" : "bg-muted dark:bg-muted"}`}
                  />
                ))}
              </div>
            </div>
          </GalleryModal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-notifications">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-4 sm:grid-cols-3">
            {notifications.map((n, i) => (
              <button
                key={i}
                onClick={() => { setNoteTitle(n.title); setNoteOpen(true); }}
                className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
              >
                <div className="text-sm font-medium">{n.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n.desc}</div>
              </button>
            ))}
          </div>
          <Modal open={noteOpen} onClose={() => setNoteOpen(false)} title={noteTitle} size="sm">
            <p className="text-sm text-muted-foreground">
              {notifications.find((n) => n.title === noteTitle)?.desc}
            </p>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setNoteOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Dismiss
              </button>
            </div>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-variants">
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {modalVariants.map((v) => (
            <div key={v.label} className="rounded-xl border border-border p-4 dark:border-border">
              <div className="text-sm font-medium">{v.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{v.desc}</div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="modal-use-cases">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modalUseCases.map((u) => (
            <div key={u.title} className="rounded-xl border border-border p-4 dark:border-border">
              <div className="text-sm font-medium">{u.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{u.desc}</div>
            </div>
          ))}
        </div>
      </ComponentPreview>
    </div>
  );
}
