import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogStandalone: RegistryEntry = entry({
  id: "alert-dialog-standalone",
  title: "Standalone",
  description: "Programmatically controlled dialog without a trigger element.",
  source: `import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogStandalone() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open Dialog
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground"
        >
          Another Trigger
        </button>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Notice"
        description="This dialog is controlled programmatically. It has no built-in trigger element."
        confirmText="Got it"
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}`,
});
