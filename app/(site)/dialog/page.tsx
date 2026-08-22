"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { DIALOG_SOURCE } from "./dialog-source";

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
  const [previewOpen, setPreviewOpen] = useState(false);
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
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Basic Dialog</DialogTitle>
              <DialogDescription>This is a simple dialog with a title and description.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button onClick={() => setPreviewOpen(false)}>Close</button>
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
