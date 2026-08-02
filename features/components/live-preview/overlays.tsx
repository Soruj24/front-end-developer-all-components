"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  ContextMenu,
  Dialog,
  Drawer,
  Dropdown,
  Modal,
  Popover,
  Tooltip,
  Button,
} from "@/components/ui";

export const overlays: Record<string, () => ReactNode> = {
  modal: () => <ModalDemo />,

  dialog: () => <DialogDemo />,

  drawer: () => <DrawerDemo />,

  popover: () => <PopoverDemo />,

  tooltip: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Tooltip content="Save your work" position="top">
        <Button variant="outline">Hover top</Button>
      </Tooltip>
      <Tooltip content="Deletes permanently" position="bottom">
        <Button variant="destructive">Hover bottom</Button>
      </Tooltip>
      <Tooltip content={<span className="font-mono">⌘K</span>} position="right">
        <Button variant="ghost">Hover right</Button>
      </Tooltip>
    </div>
  ),

  dropdown: () => (
    <Dropdown
      trigger={<Button variant="outline">Options</Button>}
      align="start"
      items={[
        { label: "Edit", shortcut: "⌘E" },
        { label: "Duplicate", shortcut: "⌘D" },
        { label: "Archive", divider: true },
        { label: "Delete", danger: true, shortcut: "⌫" },
      ]}
    />
  ),

  "context-menu": () => (
    <ContextMenu
      trigger={
        <Button variant="outline" className="pointer-events-auto">
          Right-click me
        </Button>
      }
      items={[
        { label: "Copy", shortcut: "⌘C", onClick: () => {} },
        { label: "Paste", shortcut: "⌘V", onClick: () => {} },
        { label: "Inspect", divider: true, onClick: () => {} },
        { label: "Delete", danger: true, onClick: () => {} },
      ]}
    />
  ),
};

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit profile" size="md">
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <p>Update your public profile information.</p>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </div>
      </Modal>
    </>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete account?"
        description="This action cannot be undone. All of your projects will be removed."
        confirmLabel="Delete"
      />
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Notifications" side="right">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>Your component passed review.</p>
          <p>A new release is available.</p>
        </div>
      </Drawer>
    </>
  );
}

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Show popover</Button>}
    >
      <div className="flex flex-col gap-2 p-1">
        <p className="text-sm font-medium text-foreground">Usage stats</p>
        <p className="text-xs text-muted-foreground">1,284 downloads this week.</p>
      </div>
    </Popover>
  );
}
