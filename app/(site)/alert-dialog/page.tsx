"use client";

import { useCallback, useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add alert-dialog`;

const usageCode = `import { AlertDialog } from "@/components/_alert-dialog";

<AlertDialog
  trigger={<button>Open</button>}
  title="Are you sure?"
  description="This action cannot be undone."
  onConfirm={() => handleAction()}
/>`;

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 TriggerCard                                 */
/* -------------------------------------------------------------------------- */

interface Trigger {
  id: string;
  label: string;
  desc: string;
  badge: string;
}

function TriggerCard({
  label,
  desc,
  badge,
  onClick,
}: {
  label: string;
  desc: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-medium text-muted-foreground">
        {badge}
      </span>
      <div className="mt-2 text-sm font-medium">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Trigger lists                                */
/* -------------------------------------------------------------------------- */

const destructiveTriggers: Trigger[] = [
  { id: "ad1", label: "Delete Account", desc: "Permanent account removal", badge: "1" },
  { id: "ad2", label: "Delete Repository", desc: "Remove entire repository", badge: "2" },
  { id: "ad3", label: "Remove Member", desc: "Remove from team", badge: "3" },
];

const confirmationTriggers: Trigger[] = [
  { id: "ad4", label: "Save Changes", desc: "Confirm saving edits", badge: "1" },
  { id: "ad5", label: "Leave Page", desc: "Unsaved changes warning", badge: "2" },
  { id: "ad6", label: "Logout", desc: "Sign out confirmation", badge: "3" },
];

const iconTriggers: Trigger[] = [
  { id: "ad7", label: "Success", desc: "With check circle icon", badge: "1" },
  { id: "ad8", label: "Warning", desc: "With alert triangle icon", badge: "2" },
  { id: "ad9", label: "Error", desc: "With X circle icon", badge: "3" },
];

/* -------------------------------------------------------------------------- */
/*                                    Page                                     */
/* -------------------------------------------------------------------------- */

export default function AlertDialogPage() {
  const [deleteCount, setDeleteCount] = useState(0);
  const [activeDestructive, setActiveDestructive] = useState<string | null>(null);
  const [activeConfirmation, setActiveConfirmation] = useState<string | null>(null);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [typeInput, setTypeInput] = useState("");
  const [nestedStep, setNestedStep] = useState(0);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [controlledConfirmed, setControlledConfirmed] = useState(false);
  const [standaloneOpen, setStandaloneOpen] = useState(false);

  const closeDestructive = useCallback(() => setActiveDestructive(null), []);
  const closeConfirmation = useCallback(() => setActiveConfirmation(null), []);
  const closeIcon = useCallback(() => setActiveIcon(null), []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      {/* ------------------------------------------------------------------ */}
      {/*                              Header                                 */}
      {/* ------------------------------------------------------------------ */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Alert Dialog
          </h1>
          <Badge variant="primary">15 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a
          response. Use for destructive actions that require confirmation before proceeding.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*                           Installation                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <CodeBlock
          code={installCommand}
          filename="Terminal"
          label="bash"
          variant="terminal"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                               Usage                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* ================================================================ */}
      {/*                         Destructive                               */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-destructive">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {destructiveTriggers.map((t) => (
              <TriggerCard
                key={t.id}
                label={t.label}
                desc={t.desc}
                badge={t.badge}
                onClick={() => setActiveDestructive(t.id)}
              />
            ))}
          </div>

          <AlertDialog
            open={activeDestructive === "ad1"}
            onOpenChange={(o) => { if (!o) closeDestructive(); }}
            icon={<WarningIcon />}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            confirmText="Delete Account"
            confirmVariant="destructive"
            onConfirm={() => { setDeleteCount((c) => c + 1); closeDestructive(); }}
          />

          <AlertDialog
            open={activeDestructive === "ad2"}
            onOpenChange={(o) => { if (!o) closeDestructive(); }}
            icon={<WarningIcon />}
            title="Delete this repository?"
            description="This will permanently delete the repository, all its issues, pull requests, and forks. This action cannot be undone."
            confirmText="Delete Repository"
            confirmVariant="destructive"
            onConfirm={closeDestructive}
          />

          <AlertDialog
            open={activeDestructive === "ad3"}
            onOpenChange={(o) => { if (!o) closeDestructive(); }}
            icon={<XCircleIcon />}
            title="Remove team member?"
            description="This person will lose access to all team resources. You can invite them again later."
            cancelText="Keep Member"
            confirmText="Remove"
            confirmVariant="destructive"
            onConfirm={closeDestructive}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                        Confirmation                               */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-default">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {confirmationTriggers.map((t) => (
              <TriggerCard
                key={t.id}
                label={t.label}
                desc={t.desc}
                badge={t.badge}
                onClick={() => setActiveConfirmation(t.id)}
              />
            ))}
          </div>

          <AlertDialog
            open={activeConfirmation === "ad4"}
            onOpenChange={(o) => { if (!o) closeConfirmation(); }}
            title="Save changes?"
            description="Are you sure you want to save these changes? This will update your profile settings."
            confirmText="Save Changes"
            onConfirm={closeConfirmation}
          />

          <AlertDialog
            open={activeConfirmation === "ad5"}
            onOpenChange={(o) => { if (!o) closeConfirmation(); }}
            icon={<WarningIcon />}
            title="Unsaved changes"
            description="You have unsaved changes. Are you sure you want to leave this page?"
            cancelText="Stay"
            confirmText="Leave"
            confirmVariant="destructive"
            onConfirm={closeConfirmation}
          />

          <AlertDialog
            open={activeConfirmation === "ad6"}
            onOpenChange={(o) => { if (!o) closeConfirmation(); }}
            title="Sign out"
            description="Are you sure you want to sign out? You will need to log in again to access your account."
            cancelText="Cancel"
            confirmText="Sign Out"
            onConfirm={closeConfirmation}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                         With Icons                                */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-icons">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {iconTriggers.map((t) => (
              <TriggerCard
                key={t.id}
                label={t.label}
                desc={t.desc}
                badge={t.badge}
                onClick={() => setActiveIcon(t.id)}
              />
            ))}
          </div>

          <AlertDialog
            open={activeIcon === "ad7"}
            onOpenChange={(o) => { if (!o) closeIcon(); }}
            icon={<CheckCircleIcon />}
            title="Changes saved!"
            description="Your profile has been updated successfully."
            confirmText="Done"
            onConfirm={closeIcon}
          />

          <AlertDialog
            open={activeIcon === "ad8"}
            onOpenChange={(o) => { if (!o) closeIcon(); }}
            icon={<WarningIcon />}
            title="Warning"
            description="Your storage is almost full. Please upgrade your plan or free up space."
            cancelText="Later"
            confirmText="Upgrade"
            onConfirm={closeIcon}
          />

          <AlertDialog
            open={activeIcon === "ad9"}
            onOpenChange={(o) => { if (!o) closeIcon(); }}
            icon={<XCircleIcon />}
            title="Something went wrong"
            description="We couldn't process your request. Please try again or contact support."
            confirmText="Try Again"
            confirmVariant="destructive"
            onConfirm={closeIcon}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                       Custom Text                                 */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-custom-text">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground">
                Publish Draft
              </button>
            }
            title="Ready to publish?"
            description="This draft will be published immediately and visible to all users."
            cancelText="Keep Draft"
            confirmText="Publish Now"
            onConfirm={() => {}}
          />

          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground">
                Archive Post
              </button>
            }
            title="Archive this post?"
            description="This post will be moved to archives. You can restore it later."
            cancelText="Keep Post"
            confirmText="Archive"
            confirmVariant="destructive"
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                       Disabled State                              */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-disabled">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground">
                Delete Repository
              </button>
            }
            title="Delete this repository?"
            description="This action is disabled because the repository has active deployments."
            confirmText="Delete"
            confirmVariant="destructive"
            disabled
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                        Async / Loading                            */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-async">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Submit Order
              </button>
            }
            title="Submit your order?"
            description="This will process your order immediately. This action cannot be undone."
            confirmText={asyncLoading ? "Submitting..." : "Submit"}
            disabled={asyncLoading}
            onConfirm={() => {
              setAsyncLoading(true);
              setTimeout(() => setAsyncLoading(false), 2000);
            }}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                      Type to Confirm                              */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-type-confirm">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                Delete Workspace
              </button>
            }
            title='Type "DELETE" to confirm'
            description="This will permanently delete your workspace and all its data. This action cannot be undone."
            confirmText="Delete Workspace"
            confirmVariant="destructive"
            disabled={typeInput !== "DELETE"}
            onConfirm={() => setTypeInput("")}
          >
            <div className="mt-2">
              <input
                type="text"
                placeholder='Type "DELETE"'
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </AlertDialog>
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                         Form Dialog                               */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-form">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Invite Member
              </button>
            }
            title="Invite team member"
            description="Send an invitation to join your workspace."
            confirmText="Send Invite"
            onConfirm={() => {}}
          >
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="invite-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name
                </label>
                <input
                  id="invite-name"
                  placeholder="Enter member name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="invite-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input
                  id="invite-email"
                  type="email"
                  placeholder="member@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </AlertDialog>
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                       Nested Dialogs                              */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-nested">
        <div className="flex flex-col gap-4">
          <AlertDialog
            open={nestedStep === 1}
            onOpenChange={(o) => setNestedStep(o ? 1 : 0)}
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                Delete Project
              </button>
            }
            title="Are you sure?"
            description="This will mark your project for deletion."
            confirmText="Yes, delete"
            confirmVariant="destructive"
            onConfirm={() => setNestedStep(2)}
          />

          <AlertDialog
            open={nestedStep === 2}
            onOpenChange={(o) => setNestedStep(o ? 2 : 0)}
            title="Final confirmation"
            description="This is your last chance. This action is irreversible."
            confirmText="Permanently delete"
            confirmVariant="destructive"
            onConfirm={() => setNestedStep(0)}
          >
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter project name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </AlertDialog>
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                         Controlled                                */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-controlled">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <AlertDialog
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              trigger={
                <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Open Controlled Dialog
                </button>
              }
              title="Controlled Dialog"
              description="This dialog's state is managed externally. Try closing it with the button below."
              confirmText="Confirm"
              onConfirm={() => setControlledConfirmed(true)}
            />
            <button
              type="button"
              onClick={() => setControlledOpen(true)}
              className="text-sm text-primary hover:underline"
            >
              Open via external button
            </button>
            <button
              type="button"
              onClick={() => setControlledOpen(false)}
              className="text-sm text-muted-foreground hover:underline"
            >
              Close via external button
            </button>
          </div>
          {controlledConfirmed && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Dialog confirmed! The state is managed by the parent component.
            </p>
          )}
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                       Standalone                                   */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-standalone">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setStandaloneOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Open Dialog
            </button>
            <button
              type="button"
              onClick={() => setStandaloneOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground"
            >
              Another Trigger
            </button>
          </div>

          <AlertDialog
            open={standaloneOpen}
            onOpenChange={setStandaloneOpen}
            icon={<InfoIcon />}
            title="Notice"
            description="This dialog is controlled programmatically. It has no built-in trigger element."
            confirmText="Got it"
            onConfirm={() => setStandaloneOpen(false)}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                        Payment Dialog                             */}
      {/* ================================================================ */}
      <ComponentPreview id="alert-dialog-payment">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Upgrade to Pro
              </button>
            }
            icon={<CreditCardIcon />}
            title="Confirm upgrade"
            description="You will be charged $29.00/month. You can cancel anytime from your billing settings."
            cancelText="Go Back"
            confirmText="Pay $29.00"
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>

      {/* ================================================================ */}
      {/*                         API Reference                             */}
      {/* ================================================================ */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
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
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onOpenChange</td>
                <td className="px-4 py-3 text-muted-foreground">(open: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">cancelText</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"Cancel"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">confirmText</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"Confirm"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">confirmVariant</td>
                <td className="px-4 py-3 text-muted-foreground">"default" | "destructive"</td>
                <td className="px-4 py-3 text-muted-foreground">"default"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">trigger</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onConfirm</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
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
