"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add dialog`;

const usageCode = `import { Dialog } from "@/components/_dialog";

<Dialog open={open} onClose={() => setOpen(false)}>
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
</Dialog>`;

function Dialog({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        anim ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 ${
          anim ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function IconWrap({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
      {children}
    </div>
  );
}

interface Trigger {
  id: string;
  label: string;
  desc: string;
  badge: string;
}

function TriggerCard({ label, desc, badge, onClick }: { label: string; desc: string; badge: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
        {badge}
      </span>
      <div className="mt-2 text-sm font-medium">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}

const statusTriggers: Trigger[] = [
  { id: "d1", label: "Alert Dialog", desc: "Simple notification with single action", badge: "1" },
  { id: "d4", label: "Success Dialog", desc: "Success state with check icon", badge: "2" },
  { id: "d5", label: "Error Dialog", desc: "Error state with X icon", badge: "3" },
  { id: "d6", label: "Warning Dialog", desc: "Warning with caution icon", badge: "4" },
  { id: "d7", label: "Info Dialog", desc: "Information with info icon", badge: "5" },
];

const confirmationTriggers: Trigger[] = [
  { id: "d2", label: "Confirmation", desc: "Confirm with cancel/confirm buttons", badge: "1" },
  { id: "d3", label: "Destructive", desc: "Delete confirmation with danger styling", badge: "2" },
  { id: "d11", label: "Confirm with Input", desc: "Type confirmation text", badge: "3" },
  { id: "d12", label: "Two-Step Confirm", desc: "Double confirm before action", badge: "4" },
];

const riskTriggers: Trigger[] = [
  { id: "d20", label: "Unsaved Changes", desc: "Leave without saving?", badge: "1" },
  { id: "d21", label: "Clear Data", desc: "Clear all data?", badge: "2" },
  { id: "d24", label: "Discard Changes", desc: "Discard edits?", badge: "3" },
  { id: "d25", label: "Logout Dialog", desc: "Confirm logout", badge: "4" },
];

const formTriggers: Trigger[] = [
  { id: "d8", label: "Form Dialog", desc: "Inline form with name/email fields", badge: "1" },
  { id: "d27", label: "Schedule Dialog", desc: "Schedule an event", badge: "2" },
  { id: "d29", label: "Reminder Dialog", desc: "Set a reminder", badge: "3" },
];

const feedbackTriggers: Trigger[] = [
  { id: "d9", label: "Rating Dialog", desc: "Rate your experience", badge: "1" },
  { id: "d10", label: "Feedback Dialog", desc: "Send feedback message", badge: "2" },
];

const selectionTriggers: Trigger[] = [
  { id: "d13", label: "Multi-Select", desc: "Choose multiple options", badge: "1" },
  { id: "d14", label: "Single Select", desc: "Pick one option", badge: "2" },
];

const tabsTriggers: Trigger[] = [
  { id: "d15", label: "Tabbed Dialog", desc: "Dialog with tab navigation", badge: "1" },
  { id: "d16", label: "Terms Dialog", desc: "Scrollable terms agreement", badge: "2" },
];

const infoTriggers: Trigger[] = [
  { id: "d17", label: "Version Info", desc: "App version details", badge: "1" },
  { id: "d18", label: "Upgrade Prompt", desc: "Upgrade to pro", badge: "2" },
];

const useCaseTriggers: Trigger[] = [
  { id: "d19", label: "Permission Request", desc: "Grant permission", badge: "1" },
  { id: "d22", label: "Unsubscribe", desc: "Confirm unsubscribe", badge: "2" },
  { id: "d23", label: "Remove Member", desc: "Remove team member", badge: "3" },
  { id: "d26", label: "Payment Dialog", desc: "Confirm payment", badge: "4" },
  { id: "d28", label: "Share Dialog", desc: "Share via link or email", badge: "5" },
  { id: "d30", label: "Feature Spotlight", desc: "Highlight a new feature", badge: "6" },
];

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring dark:border-border dark:bg-muted";

export default function DialogPage() {
  const [statusWhich, setStatusWhich] = useState<string | null>(null);
  const [confirmWhich, setConfirmWhich] = useState<string | null>(null);
  const [riskWhich, setRiskWhich] = useState<string | null>(null);
  const [formWhich, setFormWhich] = useState<string | null>(null);
  const [feedbackWhich, setFeedbackWhich] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [selectionWhich, setSelectionWhich] = useState<string | null>(null);
  const [tabsWhich, setTabsWhich] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [infoWhich, setInfoWhich] = useState<string | null>(null);
  const [useCaseWhich, setUseCaseWhich] = useState<string | null>(null);

  const closeStatus = useCallback(() => setStatusWhich(null), []);
  const closeConfirm = useCallback(() => setConfirmWhich(null), []);
  const closeRisk = useCallback(() => setRiskWhich(null), []);
  const closeForm = useCallback(() => setFormWhich(null), []);
  const closeFeedback = useCallback(() => setFeedbackWhich(null), []);
  const closeSelection = useCallback(() => setSelectionWhich(null), []);
  const closeTabs = useCallback(() => setTabsWhich(null), []);
  const closeInfo = useCallback(() => setInfoWhich(null), []);
  const closeUseCase = useCallback(() => setUseCaseWhich(null), []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dialog</h1>
          <Badge variant="primary">30 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Alert, confirmation, and action dialogs with focus trap and keyboard
          support. Use the tabs to switch between the live preview, source code,
          CLI, installation, and dependency details for each example.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="dialog-status-alert">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statusTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setStatusWhich(t.id)} />
            ))}
          </div>

          <Dialog open={statusWhich === "d1"} onClose={closeStatus}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <svg className="h-6 w-6 text-warning dark:text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Session Expiring</h2>
            <p className="text-center text-sm text-muted-foreground">Your session will expire in 2 minutes. Please save your work.</p>
            <div className="mt-6">
              <button onClick={closeStatus} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Got it</button>
            </div>
          </Dialog>

          <Dialog open={statusWhich === "d4"} onClose={closeStatus}>
            <IconWrap color="bg-green-100 dark:bg-green-900/30">
              <svg className="h-6 w-6 text-success dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-success dark:text-green-400">Success</h2>
            <p className="text-center text-sm text-muted-foreground">Your changes have been saved successfully.</p>
            <div className="mt-6">
              <button onClick={closeStatus} className="w-full rounded-lg bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:bg-success/90">Continue</button>
            </div>
          </Dialog>

          <Dialog open={statusWhich === "d5"} onClose={closeStatus}>
            <IconWrap color="bg-red-100 dark:bg-red-900/30">
              <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Error</h2>
            <p className="text-center text-sm text-muted-foreground">Something went wrong. Please try again later.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeStatus} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Dismiss</button>
              <button onClick={closeStatus} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Retry</button>
            </div>
          </Dialog>

          <Dialog open={statusWhich === "d6"} onClose={closeStatus}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <span className="text-xl text-warning dark:text-warning">&#x26A0;</span>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-warning dark:text-warning">Low Disk Space</h2>
            <p className="text-center text-sm text-muted-foreground">Your disk is running low. Free up space to continue using the service.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeStatus} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Later</button>
              <button onClick={closeStatus} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Manage</button>
            </div>
          </Dialog>

          <Dialog open={statusWhich === "d7"} onClose={closeStatus}>
            <IconWrap color="bg-primary-soft dark:bg-blue-900/30">
              <svg className="h-6 w-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-primary dark:text-blue-400">Did You Know?</h2>
            <p className="text-center text-sm text-muted-foreground">You can use keyboard shortcuts to navigate faster. Press Ctrl+K to open commands.</p>
            <div className="mt-6">
              <button onClick={closeStatus} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Got it</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-confirmation">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {confirmationTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setConfirmWhich(t.id)} />
            ))}
          </div>

          <Dialog open={confirmWhich === "d2"} onClose={closeConfirm}>
            <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
              <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Confirm Action</h2>
            <p className="text-center text-sm text-muted-foreground">Are you sure you want to proceed with this action?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeConfirm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeConfirm} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Confirm</button>
            </div>
          </Dialog>

          <Dialog open={confirmWhich === "d3"} onClose={closeConfirm}>
            <IconWrap color="bg-red-100 dark:bg-red-900/30">
              <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Delete Account</h2>
            <p className="text-center text-sm text-muted-foreground">This will permanently delete your account and all associated data. This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeConfirm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeConfirm} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Delete</button>
            </div>
          </Dialog>

          <Dialog open={confirmWhich === "d11"} onClose={closeConfirm}>
            <IconWrap color="bg-red-100 dark:bg-red-900/30">
              <span className="text-xl text-danger dark:text-red-400">&#x26A0;</span>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Type &quot;DELETE&quot; to confirm</h2>
            <p className="mb-4 text-center text-sm text-muted-foreground">This action is irreversible.</p>
            <input
              placeholder="Type DELETE"
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-danger focus:ring-1 focus:ring-red-500 dark:border-border dark:bg-muted"
            />
            <div className="mt-6 flex gap-3">
              <button onClick={closeConfirm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground opacity-50 hover:bg-danger/90">Delete</button>
            </div>
          </Dialog>

          <Dialog open={confirmWhich === "d12"} onClose={closeConfirm}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <span className="text-xl text-warning dark:text-warning">!!</span>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Are you absolutely sure?</h2>
            <p className="text-center text-sm text-muted-foreground">This will permanently remove 150 items. Click again to confirm.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeConfirm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeConfirm} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Yes, delete</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-risk-warning">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {riskTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setRiskWhich(t.id)} />
            ))}
          </div>

          <Dialog open={riskWhich === "d20"} onClose={closeRisk}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <span className="text-xl text-warning dark:text-warning">&#x26A0;</span>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Unsaved Changes</h2>
            <p className="text-center text-sm text-muted-foreground">You have unsaved changes. Do you want to leave without saving?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeRisk} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeRisk} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Leave</button>
            </div>
          </Dialog>

          <Dialog open={riskWhich === "d21"} onClose={closeRisk}>
            <IconWrap color="bg-red-100 dark:bg-red-900/30">
              <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Clear All Data?</h2>
            <p className="text-center text-sm text-muted-foreground">This will remove all local data. Your account data on the server will not be affected.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeRisk} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Keep</button>
              <button onClick={closeRisk} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Clear</button>
            </div>
          </Dialog>

          <Dialog open={riskWhich === "d24"} onClose={closeRisk}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <span className="text-xl text-warning dark:text-warning">!</span>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Discard Changes?</h2>
            <p className="text-center text-sm text-muted-foreground">You have unsaved edits in 3 files. Discard them?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeRisk} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Keep editing</button>
              <button onClick={closeRisk} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Discard</button>
            </div>
          </Dialog>

          <Dialog open={riskWhich === "d25"} onClose={closeRisk}>
            <IconWrap color="bg-muted dark:bg-muted">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Logout</h2>
            <p className="text-center text-sm text-muted-foreground">Are you sure you want to sign out? You will need to log in again.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeRisk} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Stay</button>
              <button onClick={closeRisk} className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted">Logout</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-form-schedule">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {formTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setFormWhich(t.id)} />
            ))}
          </div>

          <Dialog open={formWhich === "d8"} onClose={closeForm}>
            <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
              <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </IconWrap>
            <h2 className="mb-4 text-center text-lg font-semibold">Edit Profile</h2>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="edit-name" className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
                <input id="edit-name" type="text" placeholder="Enter name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="edit-email" className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                <input id="edit-email" type="email" placeholder="Enter email" className={inputClass} />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={closeForm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeForm} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save</button>
            </div>
          </Dialog>

          <Dialog open={formWhich === "d27"} onClose={closeForm}>
            <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
              <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </IconWrap>
            <h2 className="mb-4 text-center text-lg font-semibold">Schedule Event</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Event title" className={inputClass} />
              <input type="date" className={inputClass} />
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={closeForm} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeForm} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create</button>
            </div>
          </Dialog>

          <Dialog open={formWhich === "d29"} onClose={closeForm}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <svg className="h-6 w-6 text-warning dark:text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </IconWrap>
            <h2 className="mb-4 text-center text-lg font-semibold">Set Reminder</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Reminder text" className={inputClass} />
              <select aria-label="Reminder time" className={inputClass}>
                <option>In 1 hour</option>
                <option>In 3 hours</option>
                <option>Tomorrow</option>
                <option>Next week</option>
              </select>
            </div>
            <div className="mt-6">
              <button onClick={closeForm} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Set</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-feedback-rating">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {feedbackTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setFeedbackWhich(t.id)} />
            ))}
          </div>

          <Dialog open={feedbackWhich === "d9"} onClose={closeFeedback}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <svg className="h-6 w-6 text-warning dark:text-warning" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Rate Your Experience</h2>
            <p className="mb-4 text-center text-sm text-muted-foreground">How would you rate our service?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(r)}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                    r <= rating
                      ? "bg-warning text-warning-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={closeFeedback} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Submit</button>
            </div>
          </Dialog>

          <Dialog open={feedbackWhich === "d10"} onClose={closeFeedback}>
            <h2 className="mb-4 text-center text-lg font-semibold">Send Feedback</h2>
            <textarea
              placeholder="Tell us what you think..."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring dark:border-border dark:bg-muted"
              rows={4}
            />
            <div className="mt-6 flex gap-3">
              <button onClick={closeFeedback} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeFeedback} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Send</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-selection">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {selectionTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setSelectionWhich(t.id)} />
            ))}
          </div>

          <Dialog open={selectionWhich === "d13"} onClose={closeSelection}>
            <h2 className="mb-4 text-center text-lg font-semibold">Select Tags</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Design", "Dev", "Marketing", "Sales", "Support", "HR"].map((tag) => (
                <label key={tag} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm dark:border-border">
                  <input type="checkbox" className="accent-primary" />
                  {tag}
                </label>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={closeSelection} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Apply</button>
            </div>
          </Dialog>

          <Dialog open={selectionWhich === "d14"} onClose={closeSelection}>
            <h2 className="mb-4 text-center text-lg font-semibold">Choose Plan</h2>
            <div className="flex flex-col gap-2">
              {["Basic", "Pro", "Enterprise"].map((plan) => (
                <label key={plan} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm dark:border-border">
                  <input type="radio" name="plan" className="accent-primary" />
                  <div>
                    <div className="font-medium">{plan}</div>
                    <div className="text-xs text-muted-foreground">{plan === "Basic" ? "$9/mo" : plan === "Pro" ? "$29/mo" : "$99/mo"}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={closeSelection} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Select</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-tabs-scroll">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {tabsTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setTabsWhich(t.id)} />
            ))}
          </div>

          <Dialog open={tabsWhich === "d15"} onClose={closeTabs}>
            <h2 className="mb-4 text-center text-lg font-semibold">Settings</h2>
            <div className="mb-4 flex border-b border-border">
              {["General", "Security", "Notifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-border dark:text-zinc-100"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "general" && <p className="text-sm text-muted-foreground">General settings like language and timezone.</p>}
            {activeTab === "security" && <p className="text-sm text-muted-foreground">Security settings including 2FA and password.</p>}
            {activeTab === "notifications" && <p className="text-sm text-muted-foreground">Configure push and email notifications.</p>}
            <div className="mt-6">
              <button onClick={closeTabs} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Done</button>
            </div>
          </Dialog>

          <Dialog open={tabsWhich === "d16"} onClose={closeTabs}>
            <h2 className="mb-4 text-center text-lg font-semibold">Terms of Service</h2>
            <div className="max-h-40 space-y-3 overflow-y-auto pr-2 text-xs text-muted-foreground">
              {Array.from({ length: 8 }, (_, i) => (
                <p key={i}>Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={closeTabs} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Decline</button>
              <button onClick={closeTabs} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Accept</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-info-upgrade">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {infoTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setInfoWhich(t.id)} />
            ))}
          </div>

          <Dialog open={infoWhich === "d17"} onClose={closeInfo}>
            <IconWrap color="bg-muted dark:bg-muted">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </IconWrap>
            <h2 className="mb-1 text-center text-lg font-semibold">App v4.2.1</h2>
            <p className="text-center text-xs text-muted-foreground">Build 2024.11.15</p>
            <p className="mt-4 text-center text-sm text-muted-foreground">You are on the latest version.</p>
            <div className="mt-6">
              <button onClick={closeInfo} className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted">OK</button>
            </div>
          </Dialog>

          <Dialog open={infoWhich === "d18"} onClose={closeInfo}>
            <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
              <svg className="h-6 w-6 text-warning dark:text-warning" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Upgrade to Pro</h2>
            <p className="text-center text-sm text-muted-foreground">Get unlimited access, priority support, and advanced features.</p>
            <div className="my-4 flex justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$29</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={closeInfo} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Not now</button>
              <button onClick={closeInfo} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning/90">Upgrade</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dialog-use-case">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {useCaseTriggers.map((t) => (
              <TriggerCard key={t.id} label={t.label} desc={t.desc} badge={t.badge} onClick={() => setUseCaseWhich(t.id)} />
            ))}
          </div>

          <Dialog open={useCaseWhich === "d19"} onClose={closeUseCase}>
            <IconWrap color="bg-primary-soft dark:bg-blue-900/30">
              <svg className="h-6 w-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Allow Notifications</h2>
            <p className="text-center text-sm text-muted-foreground">We want to send you important updates and alerts.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeUseCase} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Deny</button>
              <button onClick={closeUseCase} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Allow</button>
            </div>
          </Dialog>

          <Dialog open={useCaseWhich === "d22"} onClose={closeUseCase}>
            <IconWrap color="bg-muted dark:bg-muted">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Unsubscribe</h2>
            <p className="text-center text-sm text-muted-foreground">You will stop receiving our newsletter. You can re-subscribe anytime.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeUseCase} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Keep subscribed</button>
              <button onClick={closeUseCase} className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted">Unsubscribe</button>
            </div>
          </Dialog>

          <Dialog open={useCaseWhich === "d23"} onClose={closeUseCase}>
            <IconWrap color="bg-red-100 dark:bg-red-900/30">
              <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0a9 9 0 00-12.728 0m12.728 0L12 12m0 0l-3.636-3.636M12 12l3.636 3.636M12 12l-3.636 3.636" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Remove Member</h2>
            <p className="text-center text-sm text-muted-foreground">Remove Jane Doe from the &quot;Design&quot; team? They will lose access to all shared resources.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeUseCase} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeUseCase} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Remove</button>
            </div>
          </Dialog>

          <Dialog open={useCaseWhich === "d26"} onClose={closeUseCase}>
            <IconWrap color="bg-green-100 dark:bg-green-900/30">
              <svg className="h-6 w-6 text-success dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">Confirm Payment</h2>
            <p className="text-center text-sm text-muted-foreground">
              You are about to be charged <strong>$49.00</strong> for the Pro plan.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeUseCase} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Cancel</button>
              <button onClick={closeUseCase} className="flex-1 rounded-lg bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:bg-success/90">Pay $49</button>
            </div>
          </Dialog>

          <Dialog open={useCaseWhich === "d28"} onClose={closeUseCase}>
            <h2 className="mb-4 text-center text-lg font-semibold">Share</h2>
            <div className="flex justify-center gap-3">
              {["Email", "Link", "Twitter", "Slack"].map((s) => (
                <button key={s} className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted">
                  {s.slice(0, 2)}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input type="text" readOnly value="https://example.com/share/abc123" className="flex-1 rounded-lg border border-border px-3 py-2 text-xs dark:border-border dark:bg-muted" />
              <button className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">Copy</button>
            </div>
            <div className="mt-6">
              <button onClick={closeUseCase} className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Close</button>
            </div>
          </Dialog>

          <Dialog open={useCaseWhich === "d30"} onClose={closeUseCase}>
            <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
              <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </IconWrap>
            <h2 className="mb-2 text-center text-lg font-semibold">New: AI Assistant</h2>
            <p className="text-center text-sm text-muted-foreground">Generate code, write docs, and get answers — all powered by AI. Try it with Ctrl+Shift+A.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={closeUseCase} className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Skip</button>
              <button onClick={closeUseCase} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Try Now</button>
            </div>
          </Dialog>
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
