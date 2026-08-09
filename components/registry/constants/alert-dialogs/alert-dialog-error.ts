import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogError: RegistryEntry = entry({
  id: "alert-dialog-error",
  title: "Error",
  description: "Error notification dialog with X icon.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function XCircleIcon() {
  return (
    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AlertDialogError() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground">
          Retry Upload
        </button>
      }
      icon={<XCircleIcon />}
      title="Upload failed"
      description="Something went wrong while uploading your file. Please try again."
      confirmText="Retry"
      confirmVariant="destructive"
      onConfirm={() => {}}
    />
  );
}`,
});
