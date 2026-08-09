import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDialogWarning: RegistryEntry = entry({
  id: "alert-dialog-warning",
  title: "Warning",
  description: "Warning notification dialog with alert icon.",
  source: `import { AlertDialog } from "@/components/_alert-dialog";

function AlertTriangleIcon() {
  return (
    <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

export default function AlertDialogWarning() {
  return (
    <AlertDialog
      trigger={
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground">
          Leave Page
        </button>
      }
      icon={<AlertTriangleIcon />}
      title="Unsaved changes"
      description="You have unsaved changes. Are you sure you want to leave this page?"
      cancelText="Stay"
      confirmText="Leave"
      confirmVariant="destructive"
      onConfirm={() => {}}
    />
  );
}`,
});
