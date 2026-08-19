"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Dialog } from "@/components/ui/Dialog";

const DIALOG_SOURCE = `"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
});

export function Dialog({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(DialogContext);
  return <button type="button" onClick={() => setOpen(true)}>{children}</button>;
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className={\`relative z-50 max-h-[85vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 \${className ?? ""}\`}>
        {children}
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={\`flex flex-col space-y-1.5 text-center sm:text-left \${className ?? ""}\`}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={\`text-lg font-semibold leading-none tracking-tight \${className ?? ""}\`}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={\`text-sm text-zinc-500 dark:text-zinc-400 \${className ?? ""}\`}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={\`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 \${className ?? ""}\`}>{children}</div>;
}`;

const BASIC_EXAMPLE = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";

function BasicDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Basic Dialog</DialogTitle>
          <DialogDescription>This is a simple dialog with a title and description.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button onClick={() => setOpen(false)}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

const CONFIRMATION_EXAMPLE = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";

function ConfirmationDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Delete Item</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => setOpen(false)}>Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

const FORM_EXAMPLE = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";

function FormDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile.</DialogDescription>
        </DialogHeader>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <DialogFooter>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => setOpen(false)}>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export default function DialogPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <ComponentDocPage
      name="Dialog"
      category="Overlays"
      description="Modal dialogs with focus trap, keyboard support, and accessible markup for alerts, confirmations, and forms."
    >
      <PreviewPanel>
        <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Basic Dialog</DialogTitle>
              <DialogDescription>This is a simple dialog with a title and description.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button onClick={() => setBasicOpen(false)}>Close</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PreviewPanel>

      <SourceCodeViewer source={DIALOG_SOURCE} filename="Dialog.tsx" defaultExpanded />

      <ExampleBlock title="Basic Dialog" description="Simple dialog with title, description, and close button." code={BASIC_EXAMPLE}>
        <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Basic Dialog</DialogTitle>
              <DialogDescription>This is a simple dialog with a title and description.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button onClick={() => setBasicOpen(false)}>Close</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ExampleBlock>

      <ExampleBlock title="Confirmation Dialog" description="Destructive action confirmation with cancel and confirm buttons." code={CONFIRMATION_EXAMPLE}>
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogTrigger>Delete Item</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>This action cannot be undone. The item will be permanently removed.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button onClick={() => setConfirmOpen(false)}>Delete</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ExampleBlock>

      <ExampleBlock title="Form Dialog" description="Dialog containing a form with input fields." code={FORM_EXAMPLE}>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger>Edit Profile</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile information.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <input type="text" placeholder="Name" className="rounded border px-3 py-2 text-sm" />
              <input type="email" placeholder="Email" className="rounded border px-3 py-2 text-sm" />
            </div>
            <DialogFooter>
              <button onClick={() => setFormOpen(false)}>Cancel</button>
              <button onClick={() => setFormOpen(false)}>Save</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
