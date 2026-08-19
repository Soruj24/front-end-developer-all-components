"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { AlertDialog } from "@/components/ui/AlertDialog";

const ALERT_DIALOG_SOURCE = `"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type AlertDialogVariant = "default" | "destructive";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: AlertDialogVariant;
  className?: string;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  variant = "default",
  className,
}: AlertDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50"
        onClick={close}
      />
      <div
        role="alertdialog"
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg border bg-white p-6 shadow-lg dark:bg-zinc-900",
          className
        )}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              close();
            }}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium text-white",
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}`;

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Show Alert
      </button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your data."
        onConfirm={() => {}}
      />
    </>
  );
}

function DestructiveDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Delete Account
      </button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Account"
        description="This will permanently delete your account and all associated data. This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={() => {}}
      />
    </>
  );
}

export default function AlertDialogPage() {
  return (
    <ComponentDocPage
      name="Alert Dialog"
      category="Overlays"
      description="A modal dialog that interrupts the user to confirm a critical action."
    >
      <PreviewPanel filename="AlertDialog.tsx">
        <BasicDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ALERT_DIALOG_SOURCE}
        filename="AlertDialog.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Dialog"
          code={ALERT_DIALOG_SOURCE}
        >
          <BasicDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Destructive Action"
          code={ALERT_DIALOG_SOURCE}
        >
          <DestructiveDemo />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
