import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogSuccess: RegistryEntry = entry({
  id: "alert-dialog-success",
  title: "Success",
  description: "Success notification dialog with check icon.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AlertDialogSuccess() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Save Changes
        </button>
      }
      icon={<CheckCircleIcon />}
      title="Changes saved!"
      description="Your profile has been updated successfully."
      confirmText="Done"
      onConfirm={() => {}}
    />
  );
}`,
});
