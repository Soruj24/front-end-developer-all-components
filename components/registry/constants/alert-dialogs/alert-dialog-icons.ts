import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogIcons: RegistryEntry = entry({
  id: "alert-dialog-icons",
  title: "With Icons",
  description: "Alert dialogs with icons in the title.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AlertDialogIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AlertDialog
        trigger={
          <button type="button" className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
            <TrashIcon />
            Delete
          </button>
        }
        title={
          <span className="flex items-center gap-2">
            <WarningIcon />
            Confirm Deletion
          </span>
        }
        description="This will permanently delete the selected items."
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {}}
      />

      <AlertDialog
        trigger={
          <button type="button" className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
            <CheckIcon />
            Approve
          </button>
        }
        title={
          <span className="flex items-center gap-2">
            <CheckIcon />
            Approve Request
          </span>
        }
        description="This request will be approved and the user will be notified."
        confirmText="Approve"
        confirmVariant="default"
        onConfirm={() => {}}
      />

      <AlertDialog
        trigger={
          <button type="button" className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            <InfoIcon />
            Learn More
          </button>
        }
        title={
          <span className="flex items-center gap-2">
            <InfoIcon />
            Important Information
          </span>
        }
        description="Please review the terms and conditions before proceeding with this action."
        confirmText="I Understand"
        confirmVariant="default"
        onConfirm={() => {}}
      />
    </div>
  );
}`,
});
