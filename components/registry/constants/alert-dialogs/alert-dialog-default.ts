import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogDefault: RegistryEntry = entry({
  id: "alert-dialog-default",
  title: "Default",
  description: "A standard confirmation dialog for general actions.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogDefault() {
  return (
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
  );
}`,
});
