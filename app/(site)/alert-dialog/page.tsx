"use client";

import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add alert-dialog`;

const usageCode = `import { AlertDialog } from "@/components/_alert-dialog";

<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Are you sure?"
  description="This action cannot be undone."
  onConfirm={() => handleDelete()}
/>`;

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AlertDialogPage() {
  const [deleteCount, setDeleteCount] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Alert Dialog</h1>
          <Badge variant="primary">6 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
          Use for destructive actions that require confirmation before proceeding.
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

      <ComponentPreview id="alert-dialog-destructive">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                <TrashIcon />
                Delete Account
              </button>
            }
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            confirmText="Delete Account"
            confirmVariant="destructive"
            onConfirm={() => setDeleteCount((c) => c + 1)}
          />
          {deleteCount > 0 && (
            <p className="text-sm text-muted-foreground">
              Account deleted {deleteCount} time{deleteCount > 1 ? "s" : ""}.
            </p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-dialog-default">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Confirm Action
              </button>
            }
            title="Confirm Changes"
            description="Are you sure you want to save these changes? This will update your profile settings."
            confirmText="Save Changes"
            confirmVariant="default"
            onConfirm={() => {}}
          />

          <AlertDialog
            trigger={
              <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Leave Page
              </button>
            }
            title="Unsaved Changes"
            description="You have unsaved changes. Are you sure you want to leave this page?"
            confirmText="Leave"
            confirmVariant="default"
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-dialog-custom-text">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Remove Member
              </button>
            }
            title="Remove team member?"
            description="This person will lose access to all team resources. You can invite them again later."
            cancelText="Keep Member"
            confirmText="Remove"
            confirmVariant="destructive"
            onConfirm={() => {}}
          />

          <AlertDialog
            trigger={
              <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Publish Draft
              </button>
            }
            title="Ready to publish?"
            description="This draft will be published immediately and visible to all users."
            cancelText="Keep Draft"
            confirmText="Publish Now"
            confirmVariant="default"
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-dialog-disabled">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
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

      <ComponentPreview id="alert-dialog-controlled">
        <ControlledAlertDialogDemo />
      </ComponentPreview>

      <ComponentPreview id="alert-dialog-icons">
        <div className="flex flex-wrap items-center gap-4">
          <AlertDialog
            trigger={
              <button type="button" className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                <TrashIcon />
                Delete
              </button>
            }
            title={
              <span className="flex items-center gap-2">
                <WarningIcon />
                Confirm Deletion
              </span>
            }
            description="This will permanently delete the selected items."
            confirmText="Delete"
            confirmVariant="destructive"
            onConfirm={() => {}}
          />

          <AlertDialog
            trigger={
              <button type="button" className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
                <CheckIcon />
                Approve
              </button>
            }
            title={
              <span className="flex items-center gap-2">
                <CheckIcon />
                Approve Request
              </span>
            }
            description="This request will be approved and the user will be notified."
            confirmText="Approve"
            confirmVariant="default"
            onConfirm={() => {}}
          />

          <AlertDialog
            trigger={
              <button type="button" className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                <InfoIcon />
                Learn More
              </button>
            }
            title={
              <span className="flex items-center gap-2">
                <InfoIcon />
                Important Information
              </span>
            }
            description="Please review the terms and conditions before proceeding with this action."
            confirmText="I Understand"
            confirmVariant="default"
            onConfirm={() => {}}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}

function ControlledAlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          trigger={
            <button type="button" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
              Open Controlled Dialog
            </button>
          }
          title="Controlled Dialog"
          description="This dialog's state is managed externally. Try closing it with the button below."
          confirmText="Confirm"
          onConfirm={() => setConfirmed(true)}
        />
        <button type="button" onClick={() => setOpen(true)} className="text-sm text-blue-500 hover:underline">
          Open via external button
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-zinc-500 hover:underline">
          Close via external button
        </button>
      </div>
      {confirmed && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Dialog confirmed! The state is managed by the parent component.
        </p>
      )}

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
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
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
