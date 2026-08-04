import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogControlled: RegistryEntry = entry({
  id: "alert-dialog-controlled",
  title: "Controlled",
  description: "A dialog with externally managed open state.",
  source: `import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogControlled() {
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
    </div>
  );
}`,
});
