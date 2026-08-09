import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogNested: RegistryEntry = entry({
  id: "alert-dialog-nested",
  title: "Nested Dialogs",
  description: "A dialog that triggers a second confirmation dialog.",
  source: `import { useState } from "react";
import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogNested() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <AlertDialog
        open={step === 1}
        onOpenChange={(open) => setStep(open ? 1 : 0)}
        trigger={
          <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
            Delete Project
          </button>
        }
        title="Are you sure?"
        description="This will mark your project for deletion."
        confirmText="Yes, delete"
        confirmVariant="destructive"
        onConfirm={() => setStep(2)}
      />

      <AlertDialog
        open={step === 2}
        onOpenChange={(open) => setStep(open ? 2 : 0)}
        title="Final confirmation"
        description="This is your last chance. Type the project name to confirm permanent deletion."
        confirmText="Permanently delete"
        confirmVariant="destructive"
        onConfirm={() => setStep(0)}
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
  );
}`,
});
