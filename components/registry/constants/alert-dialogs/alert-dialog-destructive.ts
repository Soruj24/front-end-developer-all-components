import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogDestructive: RegistryEntry = entry({
  id: "alert-dialog-destructive",
  title: "Destructive",
  description: "A destructive confirmation dialog for permanent actions.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function AlertDialogDestructive() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
          <TrashIcon />
          Delete Account
        </button>
      }
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      confirmText="Delete Account"
      confirmVariant="destructive"
      onConfirm={() => {}}
    />
  );
}`,
});
