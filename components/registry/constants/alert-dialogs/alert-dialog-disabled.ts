import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogDisabled: RegistryEntry = entry({
  id: "alert-dialog-disabled",
  title: "Disabled",
  description: "A disabled confirm button in the dialog.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

export default function AlertDialogDisabled() {
  return (
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
  );
}`,
});
